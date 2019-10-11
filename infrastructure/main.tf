data "azurerm_key_vault" "sscs_key_vault" {
  name                = "${local.vaultName}"
  resource_group_name = "${local.vaultName}"
}

data "azurerm_key_vault_secret" "cookiesecret" {
  name      = "tyacookiesecret"
  vault_uri = "${data.azurerm_key_vault.sscs_key_vault.vault_uri}"
}

data "azurerm_key_vault_secret" "hpkp-tya-sha-1" {
  name      = "hpkp-tya-sha-1"
  vault_uri = "${data.azurerm_key_vault.sscs_key_vault.vault_uri}"
}

data "azurerm_key_vault_secret" "hpkp-tya-sha-2" {
  name      = "hpkp-tya-sha-2"
  vault_uri = "${data.azurerm_key_vault.sscs_key_vault.vault_uri}"
}

locals {
  aseName             = "${data.terraform_remote_state.core_apps_compute.ase_name[0]}"
  vaultName           = "${var.raw_product}-${var.env}"

  ApiUrl      = "http://sscs-tribunals-api-${var.env}.service.${local.aseName}.internal"

  shared_app_service_plan     = "${var.product}-${var.env}"
  non_shared_app_service_plan = "${var.product}-${var.component}-${var.env}"
  app_service_plan            = "${(var.env == "saat" || var.env == "sandbox") ?  local.shared_app_service_plan : local.non_shared_app_service_plan}"

}

module "tya-frontend" {
  source               = "git@github.com:hmcts/cnp-module-webapp?ref=master"
  product              = "${var.product}-${var.component}"
  location             = "${var.location}"
  env                  = "${var.env}"
  ilbIp                = "${var.ilbIp}"
  is_frontend          = 1
  subscription         = "${var.subscription}"
  additional_host_name = "${var.additional_hostname}"
  https_only           = "true"
  common_tags          = "${var.common_tags}"
  asp_rg               = "${local.app_service_plan}"
  asp_name             = "${local.app_service_plan}"

  appinsights_instrumentation_key = "${var.appinsights_instrumentation_key}"

  app_settings = {
    SSCS_API_URL                 = "${local.ApiUrl}"
    WEBSITE_NODE_DEFAULT_VERSION = "8.9.4"
    NODE_ENV                     = "${var.infrastructure_env}"
    COOKIE_SECRET                = "${data.azurerm_key_vault_secret.cookiesecret.value}"
    HPKP_SHA256                  = "${data.azurerm_key_vault_secret.hpkp-tya-sha-1.value}"
    HPKP_SHA256_BACKUP           = "${data.azurerm_key_vault_secret.hpkp-tya-sha-2.value}"
  }
}
