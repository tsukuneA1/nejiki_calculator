from datetime import date

import pytest

from search_console.main import (
    _build_parser,
    _default_date_range,
    _report_to_dict,
    _request_body,
    _sites_to_dict,
    _validate_report_args,
)


def test_default_date_range() -> None:
    assert _default_date_range(date(2026, 7, 23)) == (
        date(2026, 6, 23),
        date(2026, 7, 20),
    )


def test_sites_to_dict() -> None:
    assert _sites_to_dict(
        {
            "siteEntry": [
                {
                    "siteUrl": "sc-domain:example.com",
                    "permissionLevel": "siteRestrictedUser",
                }
            ]
        }
    ) == {
        "source": "search-console",
        "row_count": 1,
        "sites": [
            {
                "site_url": "sc-domain:example.com",
                "permission_level": "siteRestrictedUser",
            }
        ],
    }


def test_request_body_with_filters() -> None:
    parser = _build_parser(date(2026, 7, 23))
    args = parser.parse_args(
        [
            "report",
            "--site-url",
            "sc-domain:example.com",
            "--dimensions",
            "query,device",
            "--filter",
            "page",
            "contains",
            "/",
            "--limit",
            "100",
        ]
    )
    _validate_report_args(parser, args)

    assert _request_body(args) == {
        "startDate": "2026-06-23",
        "endDate": "2026-07-20",
        "dimensions": ["query", "device"],
        "type": "web",
        "aggregationType": "auto",
        "dataState": "final",
        "rowLimit": 100,
        "startRow": 0,
        "dimensionFilterGroups": [
            {
                "groupType": "and",
                "filters": [
                    {
                        "dimension": "page",
                        "operator": "contains",
                        "expression": "/",
                    }
                ],
            }
        ],
    }


def test_report_to_dict() -> None:
    request = {
        "startDate": "2026-07-01",
        "endDate": "2026-07-20",
        "dimensions": ["date", "device"],
        "type": "web",
        "aggregationType": "auto",
        "dataState": "final",
        "rowLimit": 1000,
        "startRow": 0,
    }

    assert _report_to_dict(
        {
            "rows": [
                {
                    "keys": ["2026-07-20", "MOBILE"],
                    "clicks": 12,
                    "impressions": 345,
                    "ctr": 0.034782608695652174,
                    "position": 8.4,
                }
            ],
            "responseAggregationType": "byProperty",
        },
        site_url="sc-domain:example.com",
        request=request,
    )["rows"] == [
        {
            "date": "2026-07-20",
            "device": "MOBILE",
            "clicks": 12,
            "impressions": 345,
            "ctr": 0.034782608695652174,
            "position": 8.4,
        }
    ]


def test_report_requires_site_url() -> None:
    parser = _build_parser(date(2026, 7, 23))
    args = parser.parse_args(["report"])

    with pytest.raises(SystemExit):
        _validate_report_args(parser, args)
