output "vaultUri" {
  value = "${data.azurerm_key_vault.sscs_key_vault.vault_uri}"
}

output "microserviceName" {
  value = "${var.component}"
}

output "sscs-output" {
  value = "sscs-output"
}

output "appServicePlan" {
  value = "${local.app_service_plan}"
}

