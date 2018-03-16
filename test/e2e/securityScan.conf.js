const setupConfig = {
  'tests': './functional/**/*.test.js',
  'output': './testResults',
  'timeout': 1000,
  'helpers': {
    'Nightmare': {
      'url': process.env.E2E_FRONTEND_URL || 'http://localhost:3000',
      'waitForTimeout': 10000,
      'show': true,
      'switches': {
        'proxy-server': 'http://127.0.0.1:8090'
      }
    }
  },
  'include': {
    'I': './page-objects/steps.js'
  },
  'bootstrap': false,
  'mocha': {
    'reporterOptions': {
      'reportDir': process.env.E2E_OUTPUT_DIR || './testResults',
      'inlineAssets': true
    }
  },
  'name': 'TYA security scan'
};

exports.config = setupConfig;
