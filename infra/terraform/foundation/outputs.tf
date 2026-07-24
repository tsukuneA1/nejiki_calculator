output "project_id" {
  description = "作成したGoogle CloudプロジェクトID"
  value       = google_project.analytics.project_id
}

output "project_number" {
  description = "作成したGoogle Cloudプロジェクト番号"
  value       = google_project.analytics.number
}

output "ga4_data_reader_service_account_email" {
  description = "GA4プロパティの閲覧者として追加するサービスアカウント"
  value       = google_service_account.ga4_data_reader.email
}

output "search_console_reader_service_account_email" {
  description = "Search Consoleプロパティの制限付きユーザーとして追加するサービスアカウント"
  value       = google_service_account.search_console_reader.email
}
