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

variable "additional_hostname" {
  default = "track-appeal.sandbox.platform.hmcts.net"
}

variable "common_tags" {
  type = "map"
}
variable "raw_product" {
  default = "sscs" // jenkins-library overrides product for PRs and adds e.g. pr-118-cmc
}
