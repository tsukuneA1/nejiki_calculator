variable "project_id" {
  description = "作成するGoogle Cloudプロジェクトの一意なID"
  type        = string

  validation {
    condition     = can(regex("^[a-z][a-z0-9-]{4,28}[a-z0-9]$", var.project_id))
    error_message = "project_idは6〜30文字の小文字・数字・ハイフンで指定してください。"
  }
}

variable "project_name" {
  description = "Google Cloudコンソールに表示するプロジェクト名"
  type        = string
  default     = "nejiki-calculator"
}

variable "organization_id" {
  description = "プロジェクトを作成するGoogle Cloud Organizationの数値ID"
  type        = string
}

variable "billing_account_id" {
  description = "プロジェクトへ関連付けるBilling Account ID"
  type        = string
}

variable "region" {
  description = "Google providerのデフォルトリージョン"
  type        = string
  default     = "asia-northeast1"
}

variable "ga4_data_reader_impersonators" {
  description = "GA4 Data API Reader SAを鍵なしで利用できるIAMメンバー"
  type        = set(string)
  default     = []
}

variable "search_console_reader_impersonators" {
  description = "Search Console Reader SAを鍵なしで利用できるIAMメンバー。nullの場合はGA4と同じメンバー"
  type        = set(string)
  default     = null
  nullable    = true
}
