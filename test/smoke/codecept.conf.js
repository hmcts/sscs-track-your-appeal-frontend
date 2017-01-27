exports.config = {
  'tests': './tests/trackAppealPage_test.js',
  'timeout': 1000,
  'output': './testResults',

  'helpers': {
    'Nightmare': {
      'url': process.env.E2E_FRONTEND_URL || 'http://localhost:3000',
      'show': false
    },
    'postAppealHelper': {
      'require': './helper/postrequest.js'
    }
  },
  'include': {
    'I': './pages/steps.js',
    'Properties': './props/properties.js'
  },
  'bootstrap': false,
  'mocha': {
    'reporterOptions': {
      'reportDir': process.env.E2E_OUTPUT_DIR || './testResults',
      'reportName': 'mochawesome',
      'inlineAssets': true
    }
  },
  'name': 'SmokeTest'
};
