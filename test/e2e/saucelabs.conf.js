const supportedBrowsers = require('../crossbrowser/supportedBrowsers.js');
const browser = 'chrome_mac_previous';

const tunnelName = 'sscs-test';

function getDesiredCapabilities() {
  const desiredCapability = supportedBrowsers[browser];
  desiredCapability.tunnelIdentifier = tunnelName;
  desiredCapability.extendedDebugging = true;
  return desiredCapability;
}

const saucelabsconfig = {
  tests: './functional/**/*.test.js',
  output: './output',
  timeout: 20000,
  helpers: {
    WebDriverIO: {
      url: process.env.TEST_URL || 'http://localhost:3000',
      browser: supportedBrowsers[browser].browserName,
      excludeSwitches:["ignore-certificate-errors"],
      waitforTimeout: 60000,
      smartWait: 30000,
      host: 'ondemand.saucelabs.com',
      port: 80,
      user: process.env.SAUCE_USERNAME,
      key: process.env.SAUCE_ACCESS_KEY,
      desiredCapabilities: getDesiredCapabilities()
    },
    JSWait: { 'require': './helpers/JSWait.js' },
    SauceLabsReportingHelper: { require: './helpers/SauceLabsReportingHelper.js' }
    },
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
    multiple: {
        parallel: {
          chunks: 2,
          browsers: supportedBrowsers[browser].browserName
        }
     },
    name: 'TYA cross-browser tests'
  };

exports.config = saucelabsconfig;
