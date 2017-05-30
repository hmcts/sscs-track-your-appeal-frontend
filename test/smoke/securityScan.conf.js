const setupConfig = {
  'tests': './test/smoke/tests/*.js',
  'output': './testResults',
  'timeout': 1000,
  'helpers': {
    'Nightmare': {
      'url': process.env.E2E_FRONTEND_URL || 'http://localhost:3000',
      'waitForTimeout': 10000,
      'show': true,
      'switches': {
        'proxy-server': 'http://127.0.0.1:8090',
      }
    },

    'messageAuthenticationCodeHelper': {
      'require': './test/smoke/helper/messageAuthenticationCode.js'
    },
    'dataBaseConnectionHelper': {
      'require': './test/smoke/helper/dataBaseConnectionHelper.js'
    }
  },
  'include': {
    'I': './test/smoke/pages/steps.js',
    'Properties': './test/smoke/props/properties.js'
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

exports.config = setupConfig;
