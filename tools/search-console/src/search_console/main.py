import argparse
import json
import os
import sys
from collections.abc import Sequence
from datetime import date, timedelta
from typing import Any
from urllib.parse import quote

from google.auth import default
from google.auth.exceptions import DefaultCredentialsError, GoogleAuthError
from google.auth.impersonated_credentials import Credentials
from google.auth.transport.requests import AuthorizedSession
from requests import Response
from requests.exceptions import RequestException

SEARCH_CONSOLE_READONLY_SCOPE = (
    "https://www.googleapis.com/auth/webmasters.readonly"
)
CLOUD_PLATFORM_SCOPE = "https://www.googleapis.com/auth/cloud-platform"
SEARCH_CONSOLE_API_BASE = "https://www.googleapis.com/webmasters/v3"
DEFAULT_SERVICE_ACCOUNT = (
    "search-console-reader@nejiki-calculator.iam.gserviceaccount.com"
)

DIMENSIONS = ("country", "date", "device", "hour", "page", "query", "searchAppearance")
FILTER_DIMENSIONS = ("country", "device", "page", "query", "searchAppearance")
FILTER_OPERATORS = (
    "contains",
    "equals",
    "excludingRegex",
    "includingRegex",
    "notContains",
    "notEquals",
)
SEARCH_TYPES = ("discover", "googleNews", "image", "news", "video", "web")
AGGREGATION_TYPES = ("auto", "byPage", "byProperty")
DATA_STATES = ("all", "final", "hourly_all")


def _csv_values(value: str) -> list[str]:
    """カンマ区切りの引数をリスト化する。"""
    values = [item.strip() for item in value.split(",") if item.strip()]
    if not values:
        raise argparse.ArgumentTypeError("1つ以上指定してください")
    return values


def _iso_date(value: str) -> date:
    """ISO 8601形式の日付を検証する。"""
    try:
        return date.fromisoformat(value)
    except ValueError as error:
        raise argparse.ArgumentTypeError(
            "YYYY-MM-DD形式で指定してください"
        ) from error


def _default_date_range(today: date | None = None) -> tuple[date, date]:
    """確定済みデータを優先した直近28日間を返す。"""
    current_date = today or date.today()
    end = current_date - timedelta(days=3)
    return end - timedelta(days=27), end


def _build_parser(today: date | None = None) -> argparse.ArgumentParser:
    """CLI引数を定義する。"""
    default_start, default_end = _default_date_range(today)
    parser = argparse.ArgumentParser(
        prog="search-console",
        description="Google Search Console APIから読み取り専用データを取得する",
    )
    parser.add_argument(
        "--impersonate-service-account",
        default=os.getenv(
            "GSC_IMPERSONATE_SERVICE_ACCOUNT", DEFAULT_SERVICE_ACCOUNT
        ),
        help=(
            "鍵なしで利用するService Account。"
            "GSC_IMPERSONATE_SERVICE_ACCOUNTでも指定可能"
        ),
    )

    subparsers = parser.add_subparsers(dest="command", required=True)
    subparsers.add_parser(
        "sites",
        help="アクセス可能なSearch Consoleプロパティを一覧表示する",
    )

    report_parser = subparsers.add_parser(
        "report",
        help="Search AnalyticsのPerformanceデータを取得する",
    )
    report_parser.add_argument(
        "--site-url",
        default=os.getenv("GSC_SITE_URL"),
        help=(
            "Search Consoleプロパティ。GSC_SITE_URLでも指定可能。"
            "例: sc-domain:example.com"
        ),
    )
    report_parser.add_argument(
        "--start",
        type=_iso_date,
        default=default_start,
        help=f"開始日（YYYY-MM-DD、default: {default_start.isoformat()}）",
    )
    report_parser.add_argument(
        "--end",
        type=_iso_date,
        default=default_end,
        help=f"終了日（YYYY-MM-DD、default: {default_end.isoformat()}）",
    )
    report_parser.add_argument(
        "--dimensions",
        type=_csv_values,
        default=["date"],
        help="カンマ区切りのdimension（default: date）",
    )
    report_parser.add_argument(
        "--type",
        choices=SEARCH_TYPES,
        default="web",
        help="検索タイプ（default: web）",
    )
    report_parser.add_argument(
        "--aggregation-type",
        choices=AGGREGATION_TYPES,
        default="auto",
        help="集約方法（default: auto）",
    )
    report_parser.add_argument(
        "--data-state",
        choices=DATA_STATES,
        default="final",
        help="データ状態（default: final）",
    )
    report_parser.add_argument(
        "--filter",
        action="append",
        nargs=3,
        metavar=("DIMENSION", "OPERATOR", "EXPRESSION"),
        default=[],
        help="dimensionフィルタ。複数回指定可能",
    )
    report_parser.add_argument(
        "--limit",
        type=int,
        default=1000,
        help="最大行数（1〜25000、default: 1000）",
    )
    report_parser.add_argument(
        "--start-row",
        type=int,
        default=0,
        help="取得開始行（0以上、default: 0）",
    )
    return parser


def _validate_report_args(
    parser: argparse.ArgumentParser, args: argparse.Namespace
) -> None:
    """Report実行前に引数を検証する。"""
    if not args.site_url:
        parser.error("reportには--site-urlまたはGSC_SITE_URLを指定してください")
    if args.start > args.end:
        parser.error("--startは--end以前の日付を指定してください")
    if not 1 <= args.limit <= 25_000:
        parser.error("--limitは1〜25000で指定してください")
    if args.start_row < 0:
        parser.error("--start-rowは0以上で指定してください")

    invalid_dimensions = sorted(set(args.dimensions) - set(DIMENSIONS))
    if invalid_dimensions:
        parser.error(f"未対応のdimensionです: {','.join(invalid_dimensions)}")

    for dimension, operator, _ in args.filter:
        if dimension not in FILTER_DIMENSIONS:
            parser.error(f"filterで未対応のdimensionです: {dimension}")
        if operator not in FILTER_OPERATORS:
            parser.error(f"filterで未対応のoperatorです: {operator}")

    if args.data_state == "hourly_all" and "hour" not in args.dimensions:
        parser.error("--data-state hourly_allにはdimension hourが必要です")
    if "hour" in args.dimensions and args.data_state != "hourly_all":
        parser.error("dimension hourには--data-state hourly_allが必要です")

    filter_dimensions = {dimension for dimension, _, _ in args.filter}
    if args.aggregation_type == "byProperty" and (
        {"page", "searchAppearance"} & (set(args.dimensions) | filter_dimensions)
    ):
        parser.error(
            "byPropertyではpageまたはsearchAppearanceを"
            "dimension/filterに指定できません"
        )


def _create_session(service_account: str | None) -> AuthorizedSession:
    """ADCまたはSA impersonationで認証セッションを作る。"""
    if not service_account:
        credentials, _ = default(scopes=[SEARCH_CONSOLE_READONLY_SCOPE])
        return AuthorizedSession(credentials)

    source_credentials, _ = default(scopes=[CLOUD_PLATFORM_SCOPE])
    credentials = Credentials(
        source_credentials=source_credentials,
        target_principal=service_account,
        target_scopes=[SEARCH_CONSOLE_READONLY_SCOPE],
    )
    return AuthorizedSession(credentials)


def _request_body(args: argparse.Namespace) -> dict[str, Any]:
    """CLI引数からSearch Analyticsリクエストを生成する。"""
    body: dict[str, Any] = {
        "startDate": args.start.isoformat(),
        "endDate": args.end.isoformat(),
        "dimensions": args.dimensions,
        "type": args.type,
        "aggregationType": args.aggregation_type,
        "dataState": args.data_state,
        "rowLimit": args.limit,
        "startRow": args.start_row,
    }
    if args.filter:
        body["dimensionFilterGroups"] = [
            {
                "groupType": "and",
                "filters": [
                    {
                        "dimension": dimension,
                        "operator": operator,
                        "expression": expression,
                    }
                    for dimension, operator, expression in args.filter
                ],
            }
        ]
    return body


def _sites_to_dict(payload: dict[str, Any]) -> dict[str, Any]:
    """Sites APIレスポンスをJSON向けの辞書へ変換する。"""
    sites = [
        {
            "site_url": entry["siteUrl"],
            "permission_level": entry["permissionLevel"],
        }
        for entry in payload.get("siteEntry", [])
    ]
    return {
        "source": "search-console",
        "row_count": len(sites),
        "sites": sites,
    }


def _report_to_dict(
    payload: dict[str, Any],
    *,
    site_url: str,
    request: dict[str, Any],
) -> dict[str, Any]:
    """Search AnalyticsレスポンスをJSON向けの辞書へ変換する。"""
    dimensions = request["dimensions"]
    rows = []
    for response_row in payload.get("rows", []):
        keys = response_row.get("keys", [])
        if len(keys) != len(dimensions):
            raise ValueError("APIレスポンスのdimension数がリクエストと一致しません")
        row = dict(zip(dimensions, keys, strict=True))
        row.update(
            {
                "clicks": response_row["clicks"],
                "impressions": response_row["impressions"],
                "ctr": response_row["ctr"],
                "position": response_row["position"],
            }
        )
        rows.append(row)

    return {
        "source": "search-console",
        "site_url": site_url,
        "date_range": {
            "start": request["startDate"],
            "end": request["endDate"],
        },
        "dimensions": dimensions,
        "search_type": request["type"],
        "data_state": request["dataState"],
        "aggregation_type": payload.get(
            "responseAggregationType", request["aggregationType"]
        ),
        "start_row": request["startRow"],
        "row_limit": request["rowLimit"],
        "row_count": len(rows),
        "rows": rows,
    }


def _error_message(response: Response) -> str:
    """APIエラーレスポンスから表示用メッセージを取り出す。"""
    try:
        payload = response.json()
        return str(payload.get("error", {}).get("message") or response.text)
    except ValueError:
        return response.text


def _execute(args: argparse.Namespace) -> dict[str, Any]:
    """指定されたサブコマンドを実行する。"""
    session = _create_session(args.impersonate_service_account)
    if args.command == "sites":
        response = session.get(f"{SEARCH_CONSOLE_API_BASE}/sites", timeout=30)
        response.raise_for_status()
        return _sites_to_dict(response.json())

    request = _request_body(args)
    encoded_site_url = quote(args.site_url, safe="")
    response = session.post(
        (
            f"{SEARCH_CONSOLE_API_BASE}/sites/"
            f"{encoded_site_url}/searchAnalytics/query"
        ),
        json=request,
        timeout=30,
    )
    response.raise_for_status()
    return _report_to_dict(
        response.json(),
        site_url=args.site_url,
        request=request,
    )


def run(argv: Sequence[str] | None = None) -> int:
    """Search Consoleデータを取得して標準出力へJSONを出力する。"""
    parser = _build_parser()
    args = parser.parse_args(argv)
    if args.command == "report":
        _validate_report_args(parser, args)

    try:
        result = _execute(args)
    except DefaultCredentialsError as error:
        print(f"認証情報を取得できません: {error}", file=sys.stderr)
        return 2
    except GoogleAuthError as error:
        print(f"Google認証に失敗しました: {error}", file=sys.stderr)
        return 2
    except RequestException as error:
        if error.response is not None:
            message = _error_message(error.response)
            print(
                f"Search Console APIの呼び出しに失敗しました"
                f"（HTTP {error.response.status_code}）: {message}",
                file=sys.stderr,
            )
        else:
            print(
                f"Search Console APIへの接続に失敗しました: {error}",
                file=sys.stderr,
            )
        return 3
    except (KeyError, TypeError, ValueError) as error:
        print(f"Search Console APIの応答を解釈できません: {error}", file=sys.stderr)
        return 4

    print(json.dumps(result, ensure_ascii=False, indent=2))
    return 0


def main() -> None:
    """コンソールスクリプトのエントリーポイント。"""
    raise SystemExit(run())
