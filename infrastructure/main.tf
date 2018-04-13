provider "vault" {
  address = "https://vault.reform.hmcts.net:6200"
}

data "vault_generic_secret" "cookiesecret" {
  path = "secret/${var.infrastructure_env}/sscs/tyacookiesecret"
}

data "vault_generic_secret" "hpkp_tya_sha_1" {
  path = "secret/${var.infrastructure_env}/sscs/hpkp_tya_sha_1"
}

data "vault_generic_secret" "hpkp_tya_sha_2" {
  path = "secret/${var.infrastructure_env}/sscs/hpkp_tya_sha_2"
}

locals {
  aseName = "${data.terraform_remote_state.core_apps_compute.ase_name[0]}"

  localApiUrl = "http://sscs-tribunals-api-${var.env}.service.${local.aseName}.internal"
  ApiUrl = "${var.env == "preview" ? "http://sscs-tribunals-api-aat.service.core-compute-aat.internal" : local.localApiUrl}"
}

module "tya-frontend" {
  source               = "git@github.com:contino/moj-module-webapp?ref=master"
  product              = "${var.product}-${var.component}"
  location             = "${var.location}"
  env                  = "${var.env}"
  ilbIp                = "${var.ilbIp}"
  is_frontend          = true
  subscription         = "${var.subscription}"
  additional_host_name = "${var.additional_hostname}"
  https_only           = "true"

  app_settings = {
    SSCS_API_URL                 = "${local.ApiUrl}"
    WEBSITE_NODE_DEFAULT_VERSION = "8.9.4"
    NODE_ENV                     = "${var.infrastructure_env}"
    COOKIE_SECRET                = "${data.vault_generic_secret.cookiesecret.data["value"]}"
    HPKP_SHA256                  = "${data.vault_generic_secret.hpkp_tya_sha_1.data["value"]}"
    HPKP_SHA256_BACKUP           = "${data.vault_generic_secret.hpkp_tya_sha_2.data["value"]}"
  }
}


