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

variable "deployment_namespace" {
  type = "string"
}
