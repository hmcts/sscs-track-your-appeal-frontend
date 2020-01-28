const config = require('@hmcts/properties-volume').addTo(require('config'));
const setupSecrets = require('app/services/setupSecrets');

// Setup secrets before loading the app
setupSecrets();

const { Logger } = require('@hmcts/nodejs-logging');
const app = require('app.js');
const appInsights = require('app-insights');

appInsights.enable();

const logger = Logger.getLogger('server.js');

const port = config.get('node.port');
app.listen(port);
logger.info(`Server listening on port: ${port}`);
