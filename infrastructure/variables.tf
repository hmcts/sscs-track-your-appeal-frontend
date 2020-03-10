variable "product" {
  type    = "string"
}

variable "component" {
  type   = "string"
}

variable "location" {
  type    = "string"
  default = "UK South"
}

variable "env" {
  type = "string"
}

variable "infrastructure_env" {
  default     = "dev"
  description = "Infrastructure environment to point to"
}

variable "subscription" {
  type = "string"
}

variable "ilbIp"{}

variable "common_tags" {
  type = "map"
}

variable "raw_product" {
  default = "sscs" // jenkins-library overrides product for PRs and adds e.g. pr-118-cmc
}

variable "appinsights_instrumentation_key" {
  description = "Instrumentation key of the App Insights instance this webapp should use. Module will create own App Insights resource if this is not provided"
  default     = ""
}
