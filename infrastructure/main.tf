data "azurerm_key_vault" "sscs_key_vault" {
  name                = "${local.vaultName}"
  resource_group_name = "${local.vaultName}"
}

locals {
  vaultName           = "${var.raw_product}-${var.env}"
}
