module "tract-your-appeal-frontend" {
  source   = "git@github.com:contino/moj-module-webapp?ref=0.0.78"
  product  = "${var.product}-frontend"
  location = "${var.location}"
  env      = "${var.env}"
  asename  = "${data.terraform_remote_state.core_apps_compute.ase_name[0]}"

  app_settings = {
    SSCS_API_URL       = "http://sscs-tribunals-api-${var.env}.service.${data.terraform_remote_state.core_apps_compute.ase_name[0]}.internal"
  }
}


