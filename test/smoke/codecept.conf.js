exports.config = {
  'tests': './scenarios/**/*.js',
  'output': './testResults',
  'timeout': 1000,
  'helpers': {
    'Nightmare': {
      'url': process.env.E2E_FRONTEND_URL || 'http://localhost:3000',
      'waitForTimeout': 10000,
      'show': false
    },
    'messageAuthenticationCodeHelper': {
      'require': './helpers/MessageAuthenticationCode.js'
    },
    'dataBaseConnectionHelper': {
      'require': './helpers/DataBaseConnectionHelper.js'
    }
  },
  'include': {
    'I': './pages/steps.js',
    'Properties': './props/properties.js'
  },
  'bootstrap': true,
  'mocha': {
    'reporterOptions': {
      'reportDir': process.env.E2E_OUTPUT_DIR || './testResults',
      'inlineAssets': true
    }
  },

  'name': 'SmokeTest'
};
