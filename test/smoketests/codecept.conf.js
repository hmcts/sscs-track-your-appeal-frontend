exports.config = {
  'tests': './tests/trackAppealPage_test.js',
  'timeout': 1000,
  'output': './testResults',
  'helpers': {
    'Nightmare': {
      'url': process.env.E2E_FRONTEND_URL||'http://www.sscs.sandbox.reform.ukc.hmcts.net/prototype-6',
      'show': false
      }
    },
  'include': {
    'I': './steps_file.js',
    'IAmAtTrackAppeal': './pages/trackAppeal.js',
    'Properties': './Config/properties.js'
    },
  'bootstrap': false,
  'mocha': {
    'reporterOptions': {
      'reportDir': process.env.E2E_OUTPUT_DIR||'./testResults',
      'reportName' : 'mochawesome',
      'inlineAssets': true
      }
    },
    'name': 'SmokeTest'
  };
