const healthCheck = require('@hmcts/nodejs-healthcheck');
const config = require('config');

const apiUrl = config.get('api.url');
const health = { checks: { tya: healthCheck.web(`${apiUrl}/health`) } };

module.exports = healthCheck.configure(health);
