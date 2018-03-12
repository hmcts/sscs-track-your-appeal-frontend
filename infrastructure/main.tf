module "tract-your-appeal-frontend" {
  source       = "git@github.com:contino/moj-module-webapp?ref=master"
  product      = "${var.product}-frontend"
  location     = "${var.location}"
  env          = "${var.env}"
  ilbIp        = "${var.ilbIp}"
  is_frontend  = true
  subscription = "${var.subscription}"


  app_settings = {
    SSCS_API_URL       = "http://sscs-tribunals-api-${var.env}.service.${data.terraform_remote_state.core_apps_compute.ase_name[0]}.internal"
    WEBSITE_NODE_DEFAULT_VERSION = "8.10.0"
  }
}


