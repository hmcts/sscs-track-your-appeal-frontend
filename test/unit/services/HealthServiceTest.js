const {expect} = require('test/chai-sinon');
const mockery = require('mockery');
const data = require('test/mock/data/health');

describe('HealthService.js', () => {

  let HealthService;

  before(() => {

    // Mockout superagent so we don't make an API call.
    mockery.registerMock('superagent', () => Promise.resolve(data));

    // Enable mockery
    mockery.enable({
      useCleanCache: true,
      warnOnReplace: false,
      warnOnUnregistered: false
    });

    // Require the class under test.
    HealthService = require('app/services/HealthService');
  });

  after(() => {
    mockery.disable();
    mockery.deregisterAll();
    HealthService = undefined;
  });

  it('should make a API call to the /health endpoint', (done)=> {
    HealthService.health().then(function(result) {
      expect(result).to.eql(data);
      done();
    });
  });

});
