from google.analytics.data_v1beta.types import (
    DimensionHeader,
    DimensionValue,
    MetricHeader,
    MetricValue,
    Row,
    RunReportResponse,
)

from ga4.main import _response_to_dict


def test_response_to_dict() -> None:
    response = RunReportResponse(
        dimension_headers=[DimensionHeader(name="date")],
        metric_headers=[
            MetricHeader(name="activeUsers"),
            MetricHeader(name="sessions"),
        ],
        rows=[
            Row(
                dimension_values=[DimensionValue(value="20260722")],
                metric_values=[
                    MetricValue(value="12"),
                    MetricValue(value="15"),
                ],
            )
        ],
        row_count=1,
    )

    assert _response_to_dict(
        response,
        property_id="123456789",
        start="7daysAgo",
        end="yesterday",
    ) == {
        "source": "ga4",
        "property_id": "123456789",
        "date_range": {"start": "7daysAgo", "end": "yesterday"},
        "dimensions": ["date"],
        "metrics": ["activeUsers", "sessions"],
        "row_count": 1,
        "rows": [
            {
                "date": "20260722",
                "activeUsers": "12",
                "sessions": "15",
            }
        ],
    }
