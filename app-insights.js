const applicationInsights = require('applicationinsights');
const config = require('config');

const appInsights = () => {
  applicationInsights.setup(config.get('appInsights.instrumentationKey'))
    .setAutoCollectConsole(true, true)
    .start();
};

module.exports = appInsights;
