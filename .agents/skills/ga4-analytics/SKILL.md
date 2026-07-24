---
name: ga4-analytics
description: Read and analyze nejiki-calculator Google Analytics 4 data through the read-only tools/ga4 CLI. Use when Codex needs traffic, users, sessions, page views, acquisition channels, landing pages, events, key events, period comparisons, trends, or anomaly investigation for nejiki-calculator.com.
---

# GA4 Analytics

Query aggregated GA4 data with the repository CLI. Keep access read-only and return evidence-backed findings.

## Configuration

Run from the repository root:

```bash
UV_CACHE_DIR=/tmp/uv-cache \
uv run --project tools/ga4 ga4-report [arguments]
```

The CLI defaults to:

- Property ID: `520940164`
- Service Account: `ga4-data-reader@nejiki-calculator.iam.gserviceaccount.com`

Use Application Default Credentials as the source credential. Never create, print, or commit a Service Account key or access token.

## Workflow

1. Translate the question into a date range, dimensions, and metrics.
2. Default an unspecified recent period to `28daysAgo` through `yesterday`.
3. Run the narrowest query that answers the question. Start ranked results with at most 100 rows.
4. For comparisons, run one query per non-overlapping period with identical dimensions and metrics.
5. Parse stdout as JSON. Treat stderr as diagnostics. Sort `date` rows ascending before time-series analysis.
6. Report the exact date ranges, metrics, important values, and limitations. Separate observed facts from interpretations.

Do not modify application code merely to answer an analytics question.

## Query patterns

Traffic trend:

```bash
--start 28daysAgo --end yesterday \
--dimensions date \
--metrics activeUsers,sessions,screenPageViews
```

Acquisition channels:

```bash
--start 28daysAgo --end yesterday \
--dimensions sessionDefaultChannelGroup \
--metrics sessions,activeUsers,engagedSessions \
--limit 50
```

Landing pages:

```bash
--start 28daysAgo --end yesterday \
--dimensions landingPagePlusQueryString \
--metrics sessions,activeUsers,engagedSessions \
--limit 100
```

Content:

```bash
--start 28daysAgo --end yesterday \
--dimensions pagePath \
--metrics screenPageViews,activeUsers,eventCount \
--limit 100
```

Events:

```bash
--start 28daysAgo --end yesterday \
--dimensions eventName \
--metrics eventCount,keyEvents \
--limit 100
```

Use exact GA4 Data API names supplied by the user for other fields. If the API rejects a dimension and metric combination, simplify the query instead of guessing values.

## Interpretation rules

- Do not sum daily `activeUsers` and call the result unique users for the full period.
- Do not infer causation from traffic changes alone.
- Prefer `yesterday` over incomplete current-day data.
- Treat omitted dates as missing rows. Identify any zero-filling as a presentation choice.
- State when low counts make percentage changes unstable.
- Preserve distinctions among users, sessions, engaged sessions, views, events, and key events.
- Compare like-for-like date ranges and queries.
- Return compact tables or bullets instead of raw JSON unless requested.

## Failures

- GA4 `PERMISSION_DENIED`: confirm the SA is a Viewer on Property `520940164`.
- `iam.serviceAccounts.getAccessToken` denied: confirm the active ADC identity has Token Creator on the configured SA and allow for IAM propagation.
- Missing ADC: ask the user to run `gcloud auth application-default login`.
- Invalid or incompatible fields: reduce to a supported dimension/metric combination and report rejected fields.
