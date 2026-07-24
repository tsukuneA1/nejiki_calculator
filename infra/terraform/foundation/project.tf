resource "google_project" "analytics" {
  name                = var.project_name
  project_id          = var.project_id
  org_id              = var.organization_id
  billing_account     = var.billing_account_id
  auto_create_network = false
  deletion_policy     = "PREVENT"

  labels = {
    application = "nejiki-calculator"
    managed_by  = "terraform"
  }
}
