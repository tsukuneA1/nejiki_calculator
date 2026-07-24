resource "google_service_account" "ga4_data_reader" {
  project      = google_project.analytics.project_id
  account_id   = "ga4-data-reader"
  display_name = "GA4 Data API Reader"
  description  = "GA4 Data APIからレポートを読み取る鍵なしサービスアカウント"

  deletion_policy = "PREVENT"

  depends_on = [google_project_service.required]
}

resource "google_service_account" "search_console_reader" {
  project      = google_project.analytics.project_id
  account_id   = "search-console-reader"
  display_name = "Search Console API Reader"
  description  = "Search Console APIからレポートを読み取る鍵なしサービスアカウント"

  deletion_policy = "PREVENT"

  depends_on = [google_project_service.required]
}

resource "google_service_account_iam_member" "ga4_data_reader_token_creator" {
  for_each = var.ga4_data_reader_impersonators

  service_account_id = google_service_account.ga4_data_reader.name
  role               = "roles/iam.serviceAccountTokenCreator"
  member             = each.value
}

resource "google_service_account_iam_member" "search_console_reader_token_creator" {
  for_each = var.search_console_reader_impersonators == null ? var.ga4_data_reader_impersonators : var.search_console_reader_impersonators

  service_account_id = google_service_account.search_console_reader.name
  role               = "roles/iam.serviceAccountTokenCreator"
  member             = each.value
}
