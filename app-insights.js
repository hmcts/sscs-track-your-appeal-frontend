const applicationInsights = require('applicationinsights');
const config = require('config');

const enable = () => {
  const iKey = config.get('appInsights.instrumentationKey');
  applicationInsights.setup(iKey)
    .setAutoCollectConsole(true, true)
    .setDistributedTracingMode(applicationInsights.DistributedTracingModes.AI_AND_W3C)
    .setSendLiveMetrics(true);
  applicationInsights
    .defaultClient
    .context
    .tags[applicationInsights.defaultClient.context.keys.cloudRole] = config.appInsights.roleName;
  applicationInsights.start();
};

const trackException = exception => {
  applicationInsights.defaultClient.trackException({ exception });
};

module.exports = {
  enable,
  trackException
};
