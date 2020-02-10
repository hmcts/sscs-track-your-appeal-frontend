const config = require('config');

const chromeArgs = ['--no-sandbox'];

if (process.env.TEST_UR) chromeArgs.push('--proxy-server=proxyout.reform.hmcts.net:8080');

exports.config = {
  tests: './**/*.test.js',
  output: process.cwd() + '/functional-output', // eslint-disable-line prefer-template
  timeout: 3000,
  helpers: {
    Puppeteer: {
      url: process.env.TEST_URL || 'http://localhost:3000',
      waitForTimeout: parseInt(config.get('e2e.waitForTimeout')),
      waitForAction: parseInt(config.get('e2e.waitForAction')),
      smartWait: '5000',
      show: false,
      windowSize: ' 800x1000',
      chrome: {
        ignoreHTTPSErrors: true,
        args: chromeArgs
      }
    },
    MyPuppeteer: { require: './helpers/JSWait.js' }
  },
  include: { I: './page-objects/steps.js' },
  bootstrap: false,
  mocha: {
    reporterOptions: {
      'codeceptjs-cli-reporter': {
        stdout: '-',
        options: { steps: true }
      },
      'mocha-junit-reporter': {
        stdout: '-',
        options: { mochaFile: process.cwd() + '/functional-output/result.xml' } // eslint-disable-line prefer-template
      },
      mochawesome: {
        stdout: '-',
        options: {
          reportDir: process.env.OUTPUT_DIR || './functional-output',
          reportName: 'index',
          inlineAssets: true,
          charts: true
        }
      }
    }
  },
  multiple: {
    parallel: {
      chunks: 2,
      browsers: 'chrome'
    }
  },
  name: 'TYA tests'
};
