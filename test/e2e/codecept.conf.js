const config = require('config');

exports.config = {
  tests: './**/*.test.js',
  output: './output',
  timeout: 1000,
  helpers: {
    Puppeteer: {
      url: process.env.FRONTEND_URL || 'https://localhost:3000',
      waitForTimeout: parseInt(config.get('e2e.waitForTimeout')),
      waitForAction: parseInt(config.get('e2e.waitForAction')),
      show: false,
      windowSize: ' 800x1000',
      chrome: {
        ignoreHTTPSErrors: true,
        args: ['--no-sandbox']
      }
    }
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
        options: { mochaFile: './functional-output/result.xml' }
      },
      mochawesome: {
        stdout: './functional-output/console.log',
        options: {
          reportDir: process.env.OUTPUT_DIR || './functional-output',
          reportName: 'index',
          inlineAssets: true,
          charts: true
        }
      }
    }
  },
  name: 'TYA tests'
};
