// Real services
const AppealService = require('app/services/AppealService');
const HealthService = require('app/services/HealthService');
const TokenService = require('app/services/TokenService');

// Mocked services
const MockAppealService = require('test/mock/MockAppealService');
const MockHealthService = require('test/mock/MockHealthService');
const MockTokenService = require('test/mock/MockTokenService');

const {MOCK_DATA} = require('app/config');

let singleton = Symbol();
let singletonEnforcer = Symbol();

const services = {
  appeals: 'appeals',
  health: 'health',
  token: 'token'
};

class ServiceLoader {

  constructor(enforcer) {
    if (enforcer != singletonEnforcer) {
      throw new Error('Cannot construct ServiceLoader singleton, use the static instance() function');
    }
  }

  //----------------------------------------------------
  // Public functions
  //----------------------------------------------------

  load(serviceName) {
    switch (serviceName) {
      case services.appeals:
        return MOCK_DATA ? MockAppealService : AppealService;
      case services.health:
        return MOCK_DATA ? MockHealthService : HealthService;
      case services.token:
        return MOCK_DATA ? MockTokenService : TokenService;
      default:
        throw new Error('Unknown service: ' + serviceName);
    }
  }

  static get appeals() {
    return services.appeals;
  }

  static get health() {
    return services.health;
  }

  static get token() {
    return services.token;
  }

  //----------------------------------------------------
  // Public static functions
  //----------------------------------------------------

  static instance(name) {
    if (!this[singleton]) {
      this[singleton] = new ServiceLoader(singletonEnforcer);
    }
    return this[singleton];
  }
}

module.exports = ServiceLoader;
