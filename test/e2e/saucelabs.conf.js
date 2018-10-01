/* eslint-disable no-process-env */

const config = require('config');
const supportedBrowsers = require('./crossbrowser/supportedBrowsers.js');
const { Logger } = require('@hmcts/nodejs-logging');

const logger = Logger.getLogger('saucelabs.conf.js');
const tunnelName = 'reformtunnel';

const getBrowserConfig = browserGroup => {
  const browserConfig = [];
  for (const candidateBrowser in supportedBrowsers[browserGroup]) {
    if (candidateBrowser) {
      const desiredCapability = supportedBrowsers[browserGroup][candidateBrowser];
      desiredCapability.tunnelIdentifier = tunnelName;
      desiredCapability.tags = ['sscs-tya'];
      browserConfig.push({
        browser: desiredCapability.browserName,
        desiredCapabilities: desiredCapability
      });
    } else {
      logger.error('supportedBrowsers.js is empty or incorrectly defined');
    }
  }
  return browserConfig;
};

const oneThousand = 1000;
const pauseFor = seconds => {
  setTimeout(() => {
    return true;
  }, seconds * oneThousand);
};

const saucelabsconfig = {
  tests: './functional/cookies/cookies.test.js',
  output: config.get('saucelabs.outputDir'),
  helpers: {
    WebDriverIO: {
      url: process.env.TEST_URL || config.get('e2e.frontendUrl'),
      browser: process.env.SAUCE_BROWSER || config.get('saucelabs.browser'),
      waitForTimeout: parseInt(config.get('saucelabs.waitForTimeout')),
      smartWait: parseInt(config.get('saucelabs.smartWait')),
      cssSelectorsEnabled: 'true',
      host: 'ondemand.saucelabs.com',
      port: 80,
      user: process.env.SAUCE_USERNAME || config.get('saucelabs.username'),
      key: process.env.SAUCE_ACCESS_KEY || config.get('saucelabs.key'),
      desiredCapabilities: {}
    },
    JSWait: { require: './helpers/JSWait.js' },
    SauceLabsReportingHelper: { require: './helpers/SauceLabsReportingHelper.js' }
  },
  include: { I: './page-objects/steps.js' },
  bootstrap: true,
  teardownAll: done => {
    // Pause to allow SauceLabs to finish updating before Jenkins queries it for results
    logger.info('Wait for 30 seconds before Jenkins queries SauceLabs results...');
    const thirtySeconds = 30;
    pauseFor(thirtySeconds);
    done();
  },
  mocha: {
    reporterOptions: {
      'codeceptjs-cli-reporter': {
        stdout: '-',
        options: { steps: true }
      },
      mochawesome: {
        stdout: './functional-output/console.log',
        options: {
          reportDir: config.get('saucelabs.outputDir'),
          reportName: 'index',
          inlineAssets: true
        }
      }
    }
  },
  multiple: {
    chrome: { browsers: getBrowserConfig('chrome') },
    firefox: { browsers: getBrowserConfig('firefox') }
  },
  name: 'TYA cross-browser tests'
};

exports.config = saucelabsconfig;
