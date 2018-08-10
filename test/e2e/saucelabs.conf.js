/* eslint-disable no-process-env */

const supportedBrowsers = require('../crossbrowser/supportedBrowsers.js');

const browser = requiredValue(process.env.SAUCELABS_BROWSER, 'SAUCELABS_BROWSER'); // eslint-disable-line no-use-before-define

const tunnelName = 'reformtunnel';

function getDesiredCapabilities() {
  const desiredCapability = supportedBrowsers[browser];
  desiredCapability.tunnelIdentifier = tunnelName;
  desiredCapability.extendedDebugging = true;
  desiredCapability.tags = ['sscs-tya'];
  desiredCapability.proxy.httpProxy = 'http://proxyout.reform.hmcts.net:8080';
  desiredCapability.proxy.httpsProxy = 'https://proxyout.reform.hmcts.net:8080';
  return desiredCapability;
}

function requiredValue(envVariableValue, variableName) {
  if (envVariableValue && envVariableValue.trim().length > 0) {
    return envVariableValue.trim();
  }
  throw new Error(`${variableName} is a required environment variable, but wasn't set`);
}

const getChunks = (chunks, numberOfTestsFiles, tests) => {
  const testChunks = [];
  for (let i = 0; i < chunks; i++) {
    const arr = [];
    arr.push(...tests.slice(i * numberOfTestsFiles, (i + 1) * numberOfTestsFiles));
    testChunks.push(arr);
  }
  return testChunks;
};

const saucelabsconfig = {
  tests: './functional/**/*.test.js',
  output: './output',
  timeout: 20000,
  helpers: {
    WebDriverIO: {
      url: process.env.TEST_URL || 'http://localhost:3000',
      browser: supportedBrowsers[browser].browserName,
      excludeSwitches: ['ignore-certificate-errors'],
      waitforTimeout: 60000,
      smartWait: 30000,
      host: 'ondemand.saucelabs.com',
      port: 80,
      user: process.env.SAUCE_USERNAME,
      key: process.env.SAUCE_ACCESS_KEY,
      desiredCapabilities: getDesiredCapabilities()
    },
    JSWait: { require: './helpers/JSWait.js' },
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
      chunks: files => {
        const testPages = files.filter(file => file.includes('page')); // eslint-disable-line
        const testLinks = files.filter(file => file.includes('links')); // eslint-disable-line
        const tests = [...testPages, ...testLinks];
        return getChunks('2', '9', tests);
      },
      browsers: supportedBrowsers[browser].browserName
    }
  },
  name: 'TYA cross-browser tests'
};

exports.config = saucelabsconfig;
