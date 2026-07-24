locals {
  required_services = toset([
    "analyticsdata.googleapis.com",
    "cloudresourcemanager.googleapis.com",
    "iam.googleapis.com",
    "iamcredentials.googleapis.com",
    "searchconsole.googleapis.com",
    "serviceusage.googleapis.com",
  ])
}

resource "google_project_service" "required" {
  for_each = local.required_services

  project            = google_project.analytics.project_id
  service            = each.value
  disable_on_destroy = false
}
