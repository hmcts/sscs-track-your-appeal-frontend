const supportedBrowsers = require('../crossbrowser/supportedBrowsers.js');

const browser = process.env.SAUCELABS_BROWSER || 'chrome_mac_latest';
const tunnelName = process.env.TUNNEL_IDENTIFIER || '';

const getDesiredCapabilities = () => {
  const desiredCapability = supportedBrowsers[browser];
  desiredCapability.tunnelIdentifier = tunnelName;
  return desiredCapability;
};

const setupConfig = {
  tests: './functional/**/*.test.js',
  output: './output',
  timeout: 20000,
  helpers: {
    WebDriverIO: {
      url: process.env.E2E_FRONTEND_URL || 'http://localhost:3000',
      browser: supportedBrowsers[browser].browserName,
      waitforTimeout: 60000,
      cssSelectorsEnabled: 'true',
      windowSize: '1600x900',
      timeouts: {
        script: 60000,
        'page load': 60000,
        implicit: 20000
      },
      host: 'ondemand.saucelabs.com',
      port: 80,
      user: process.env.SAUCE_USERNAME,
      key: process.env.SAUCE_ACCESS_KEY,
      desiredCapabilities: getDesiredCapabilities()
    },
    SauceLabsReportingHelper: { require: './helpers/SauceLabsReportingHelper.js' },
    include: { I: './page-objects/steps.js' },
    bootstrap: true,
    mocha: {
      reporterOptions: {
        reportDir: process.env.E2E_CROSSBROWSER_OUTPUT_DIR || './output',
        reportName: `${browser}_report`,
        reportTitle: `Crossbrowser results for: ${browser.toUpperCase()}`,
        inlineAssets: true
      }
    },
    name: 'TYA cross-browser tests'
  }
};

exports.config = setupConfig;
