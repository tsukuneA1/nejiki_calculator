# Analytics foundation

金ネジキ計算機のGA4 Data APIとSearch Console APIを鍵なしで読み取るためのGoogle Cloud基盤です。

Terraformが次を管理します。

- Google CloudプロジェクトとBilling Accountの関連付け
- GA4 Data API、Search Console API、IAM関連APIの有効化
- GA4読取用サービスアカウント
- Search Console読取用サービスアカウント
- ローカル利用者から各サービスアカウントへのimpersonation権限

サービスアカウントキーは作成しません。

## 適用

```bash
cd infra/terraform/foundation
cp terraform.tfvars.example terraform.tfvars
terraform init
terraform plan
terraform apply
```

`terraform.tfvars`には実際のProject ID、Organization ID、Billing Account ID、impersonationを許可するIAMメンバーを設定します。このファイルとTerraform stateはGit管理されません。

プロジェクトを作成する実行主体には、Organization上のProject CreatorとBilling Account上のBilling Account Userが必要です。

## apply後の手動設定

Terraformのoutputに表示されたメールアドレスを次のプロパティへ追加します。

1. GA4の「管理」→「プロパティのアクセス管理」で、`ga4_data_reader_service_account_email`を閲覧者として追加
2. Search Consoleの「設定」→「ユーザーと権限」で、`search_console_reader_service_account_email`を制限付きユーザーとして追加

GA4/GSCのプロパティ権限はGoogle Cloud IAMとは別管理のため、このTerraformには含まれません。

## ローカルからの利用

Application Default Credentialsでログインした利用者が、対象サービスアカウントをimpersonateしてAPIを呼び出します。

```bash
gcloud auth application-default login
gcloud auth application-default print-access-token \
  --impersonate-service-account=ga4-data-reader@PROJECT_ID.iam.gserviceaccount.com
```
