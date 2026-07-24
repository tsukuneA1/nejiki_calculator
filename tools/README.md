# Analytics tools

GA4 Data APIとGoogle Search Console APIを読み取り専用で利用するPython CLIです。Application Default Credentialsから、Terraformで作成したサービスアカウントを鍵なしでimpersonateします。

初回のみADCへログインします。

```bash
gcloud auth application-default login
```

## GA4

GA4 Property ID `520940164`のレポートを取得します。

```bash
uv run --project tools/ga4 ga4-report \
  --start 7daysAgo \
  --end yesterday \
  --dimensions date \
  --metrics activeUsers,sessions
```

Property IDは`GA4_PROPERTY_ID`または`--property-id`、サービスアカウントは`GA4_IMPERSONATE_SERVICE_ACCOUNT`または`--impersonate-service-account`で上書きできます。既定のSAは`ga4-data-reader@nejiki-calculator.iam.gserviceaccount.com`です。

## Search Console

アクセス可能なプロパティを確認します。

```bash
uv run --project tools/search-console search-console sites
```

レポートを取得します。

```bash
uv run --project tools/search-console search-console report \
  --site-url sc-domain:nejiki-calculator.com \
  --dimensions date,device
```

サービスアカウントは既定で`search-console-reader@nejiki-calculator.iam.gserviceaccount.com`です。別のSAを使う場合は`GSC_IMPERSONATE_SERVICE_ACCOUNT`または`--impersonate-service-account`で上書きできます。

## チェック

```bash
uv run --project tools/ga4 --group dev ruff check .
uv run --project tools/ga4 --group dev mypy \
  --config-file tools/ga4/pyproject.toml tools/ga4/src
uv run --project tools/ga4 --group dev pytest

uv run --project tools/search-console --group dev ruff check .
uv run --project tools/search-console --group dev mypy \
  --config-file tools/search-console/pyproject.toml tools/search-console/src
uv run --project tools/search-console --group dev pytest
```
