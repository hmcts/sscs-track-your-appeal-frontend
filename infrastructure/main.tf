module "tract-your-appeal-frontend" {
  source   = "git@github.com:contino/moj-module-webapp?ref=master"
  product  = "${var.product}-frontend"
  location = "${var.location}"
  env      = "${var.env}"
  ilbIp    = "${var.ilbIp}"

  app_settings = {
    SSCS_API_URL       = "http://sscs-tribunals-api-${var.env}.service.${data.terraform_remote_state.core_apps_compute.ase_name[0]}.internal"
  }
}


