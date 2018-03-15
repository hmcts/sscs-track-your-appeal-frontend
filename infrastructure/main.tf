provider "vault" {
  address = "https://vault.reform.hmcts.net:6200"
}

data "vault_generic_secret" "cookiesecret" {
  path = "secret/${var.infrastructure_env}/sscs/tyacookiesecret"
}

module "tract-your-appeal-frontend" {
  source       = "git@github.com:contino/moj-module-webapp?ref=master"
  product      = "${var.product}-frontend"
  location     = "${var.location}"
  env          = "${var.env}"
  ilbIp        = "${var.ilbIp}"
  is_frontend  = true
  subscription = "${var.subscription}"


  app_settings = {
    SSCS_API_URL                 = "http://sscs-tribunals-api-${var.env}.service.${data.terraform_remote_state.core_apps_compute.ase_name[0]}.internal"
    WEBSITE_NODE_DEFAULT_VERSION = "8.9.4"
    NODE_ENV                     = "${var.node_environment}"
    COOKIE_SECRET                = "${data.vault_generic_secret.cookiesecret.data["value"]}"
  }
}


