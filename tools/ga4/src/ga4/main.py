import argparse
import json
import os
import sys
from collections.abc import Sequence
from typing import Any

from google.analytics.data_v1beta import BetaAnalyticsDataClient
from google.analytics.data_v1beta.types import (
    DateRange,
    Dimension,
    Metric,
    RunReportRequest,
    RunReportResponse,
)
from google.api_core.exceptions import GoogleAPICallError
from google.auth import default
from google.auth.exceptions import DefaultCredentialsError
from google.auth.impersonated_credentials import Credentials

ANALYTICS_READONLY_SCOPE = "https://www.googleapis.com/auth/analytics.readonly"
DEFAULT_SERVICE_ACCOUNT = (
    "ga4-data-reader@nejiki-calculator.iam.gserviceaccount.com"
)
DEFAULT_PROPERTY_ID = "520940164"


def _csv_values(value: str) -> list[str]:
    """カンマ区切りの引数をリスト化する。"""
    values = [item.strip() for item in value.split(",") if item.strip()]
    if not values:
        raise argparse.ArgumentTypeError("1つ以上指定してください")
    return values


def _build_parser() -> argparse.ArgumentParser:
    """CLI引数を定義する。"""
    parser = argparse.ArgumentParser(
        prog="ga4-report",
        description="Google Analytics Data APIから読み取り専用レポートを取得する",
    )
    parser.add_argument(
        "--property-id",
        default=os.getenv("GA4_PROPERTY_ID", DEFAULT_PROPERTY_ID),
        help="GA4の数値Property ID。GA4_PROPERTY_IDでも指定可能",
    )
    parser.add_argument(
        "--impersonate-service-account",
        default=os.getenv(
            "GA4_IMPERSONATE_SERVICE_ACCOUNT", DEFAULT_SERVICE_ACCOUNT
        ),
        help=(
            "鍵なしで利用するService Account。"
            "GA4_IMPERSONATE_SERVICE_ACCOUNTでも指定可能"
        ),
    )
    parser.add_argument(
        "--start",
        default="7daysAgo",
        help="開始日（YYYY-MM-DD、NdaysAgoなど。default: 7daysAgo）",
    )
    parser.add_argument(
        "--end",
        default="yesterday",
        help="終了日（YYYY-MM-DD、today、yesterdayなど。default: yesterday）",
    )
    parser.add_argument(
        "--dimensions",
        type=_csv_values,
        default=["date"],
        help="カンマ区切りのdimension（default: date）",
    )
    parser.add_argument(
        "--metrics",
        type=_csv_values,
        default=["activeUsers", "sessions"],
        help="カンマ区切りのmetric（default: activeUsers,sessions）",
    )
    parser.add_argument(
        "--limit",
        type=int,
        default=1000,
        help="最大行数（1〜10000、default: 1000）",
    )
    return parser


def _validate_args(
    parser: argparse.ArgumentParser, args: argparse.Namespace
) -> None:
    """実行前に必須値と取得上限を検証する。"""
    if not args.property_id:
        parser.error("--property-idまたはGA4_PROPERTY_IDを指定してください")
    if not args.property_id.isdigit():
        parser.error("--property-idは数値で指定してください")
    if not 1 <= args.limit <= 10_000:
        parser.error("--limitは1〜10000で指定してください")


def _request_from_args(args: argparse.Namespace) -> RunReportRequest:
    """CLI引数からData APIリクエストを生成する。"""
    return RunReportRequest(
        property=f"properties/{args.property_id}",
        date_ranges=[DateRange(start_date=args.start, end_date=args.end)],
        dimensions=[Dimension(name=name) for name in args.dimensions],
        metrics=[Metric(name=name) for name in args.metrics],
        limit=args.limit,
    )


def _create_client(service_account: str | None) -> BetaAnalyticsDataClient:
    """ADCまたはSA impersonationでData APIクライアントを作る。"""
    if not service_account:
        return BetaAnalyticsDataClient()

    source_credentials, _ = default()
    credentials = Credentials(
        source_credentials=source_credentials,
        target_principal=service_account,
        target_scopes=[ANALYTICS_READONLY_SCOPE],
    )
    return BetaAnalyticsDataClient(credentials=credentials)


def _response_to_dict(
    response: RunReportResponse,
    *,
    property_id: str,
    start: str,
    end: str,
) -> dict[str, Any]:
    """Data APIレスポンスをJSON向けの辞書へ変換する。"""
    dimension_headers = [header.name for header in response.dimension_headers]
    metric_headers = [header.name for header in response.metric_headers]
    rows = []

    for response_row in response.rows:
        row = {
            header: value.value
            for header, value in zip(
                dimension_headers,
                response_row.dimension_values,
                strict=True,
            )
        }
        row.update(
            {
                header: value.value
                for header, value in zip(
                    metric_headers,
                    response_row.metric_values,
                    strict=True,
                )
            }
        )
        rows.append(row)

    return {
        "source": "ga4",
        "property_id": property_id,
        "date_range": {"start": start, "end": end},
        "dimensions": dimension_headers,
        "metrics": metric_headers,
        "row_count": response.row_count,
        "rows": rows,
    }


def run(argv: Sequence[str] | None = None) -> int:
    """GA4レポートを取得して標準出力へJSONを出力する。"""
    parser = _build_parser()
    args = parser.parse_args(argv)
    _validate_args(parser, args)

    try:
        client = _create_client(args.impersonate_service_account)
        response = client.run_report(_request_from_args(args))
    except DefaultCredentialsError as error:
        print(f"認証情報を取得できません: {error}", file=sys.stderr)
        return 2
    except GoogleAPICallError as error:
        print(f"GA4 Data APIの呼び出しに失敗しました: {error}", file=sys.stderr)
        return 3

    result = _response_to_dict(
        response,
        property_id=args.property_id,
        start=args.start,
        end=args.end,
    )
    print(json.dumps(result, ensure_ascii=False, indent=2))
    return 0


def main() -> None:
    """コンソールスクリプトのエントリーポイント。"""
    raise SystemExit(run())
