exports.config = {
  'tests': './tests/*.js',
  'output': './testResults',
  'timeout': 1000,
  'helpers': {
    'Nightmare': {
      'url': process.env.E2E_FRONTEND_URL || 'http://localhost:3000',
      'waitForTimeout': 10000,
      'show': false
    },
    'messageAuthenticationCodeHelper': {
      'require': './helper/messageAuthenticationCode.js'
    },
    'dataBaseConnectionHelper': {
      'require': './helper/dataBaseConnectionHelper.js'
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
      'inlineAssets': true
    }
  },

  'name': 'SmokeTest'
};
