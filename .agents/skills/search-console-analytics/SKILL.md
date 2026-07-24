---
name: search-console-analytics
description: Read and analyze nejiki-calculator Google Search Console Performance data through the read-only tools/search-console CLI. Use when Codex needs organic search clicks, impressions, CTR, average position, queries, pages, countries, devices, search appearances, search types, period comparisons, SEO trends, or search-traffic anomaly investigation for nejiki-calculator.com.
---

# Search Console Analytics

Query Search Console with the repository CLI. Keep access read-only and return evidence-backed findings.

## Configuration

Run from the repository root:

```bash
UV_CACHE_DIR=/tmp/uv-cache \
uv run --project tools/search-console search-console [command] [arguments]
```

The CLI defaults to Service Account `search-console-reader@nejiki-calculator.iam.gserviceaccount.com`. Use property `sc-domain:nejiki-calculator.com`.

Use Application Default Credentials as the source credential. Never create, print, or commit a Service Account key or access token.

List accessible properties when diagnosing access:

```bash
UV_CACHE_DIR=/tmp/uv-cache \
uv run --project tools/search-console search-console sites
```

## Workflow

1. Translate the question into a date range, dimensions, search type, aggregation, and filters.
2. Default an unspecified recent period to the CLI default: 28 days ending three days ago with finalized data.
3. Start with `date` only to establish the property-level trend.
4. Run the narrowest query that answers the question. Start ranked results with at most 100 rows.
5. For comparisons, run identical queries over non-overlapping periods of equal length.
6. Parse stdout as JSON and treat stderr as diagnostics.
7. Report important values, exact date ranges, search type, dimensions, and limitations. Separate observed facts from interpretations.

Do not modify application code merely to answer an analytics question.

## Query patterns

Daily trend:

```bash
report --site-url sc-domain:nejiki-calculator.com --dimensions date
```

Top queries:

```bash
report --site-url sc-domain:nejiki-calculator.com \
  --dimensions query --limit 100
```

Top pages:

```bash
report --site-url sc-domain:nejiki-calculator.com \
  --dimensions page --limit 100
```

Device breakdown:

```bash
report --site-url sc-domain:nejiki-calculator.com \
  --dimensions device --limit 10
```

Queries for one page:

```bash
report \
  --site-url sc-domain:nejiki-calculator.com \
  --dimensions query \
  --filter page equals 'https://nejiki-calculator.com/poke-search' \
  --limit 100
```

Discover search appearances before filtering:

```bash
report --site-url sc-domain:nejiki-calculator.com \
  --dimensions searchAppearance --limit 100
```

Use repeated filters as an AND condition. Query `web`, `image`, `video`, `news`, `discover`, or `googleNews` separately and identify the source.

## Calculation and interpretation rules

- Sum clicks and impressions across daily rows for period totals.
- Calculate period CTR as total clicks divided by total impressions. Never average row CTRs.
- Calculate combined position weighted by impressions. Never average row positions without weighting.
- Treat position as average topmost result position per impression, not a fixed keyword rank.
- Do not infer causation from search changes alone.
- Interpret dates in Pacific Time, not JST.
- Treat omitted dates as missing rows. Do not silently invent zeroes.
- State when low counts make percentage changes, CTR, or position unstable.
- Query/page breakdowns may omit anonymized or low-volume rows and sum below property totals.
- The API ranks non-date rows by clicks. Sort locally for impressions, CTR, or position questions.
- Do not equate Search Console clicks with GA4 organic sessions.
- Return compact tables or bullets instead of raw JSON unless requested.

## Failures

- `403` or property not found: run `sites` and use the exact returned `site_url`.
- `iam.serviceAccounts.getAccessToken` denied: confirm the active ADC identity has Token Creator on the configured SA.
- Missing ADC: ask the user to run `gcloud auth application-default login`.
- Empty rows: verify date range, search type, property, and collection availability.
- Quota exceeded: narrow the date range or dimensions and avoid duplicate requests.
- Invalid dimension/filter/aggregation: simplify using CLI-supported values instead of guessing.
