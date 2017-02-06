const TrackYourAppealService = require('app/services/TrackYourAppealService');
const HealthService = require('app/services/HealthService');
const MockTrackYourAppealService = require('test/mock/MockTrackYourAppealService');
const MockHealthService = require('test/mock/MockHealthService');
const {MOCK_DATA} = require('app/config');

let singleton = Symbol();
let singletonEnforcer = Symbol();

const services = {
  appeals: 'appeals',
  health: 'health'
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
        return MOCK_DATA ? MockTrackYourAppealService : TrackYourAppealService;
      case services.health:
        return MOCK_DATA ? MockHealthService : HealthService;
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
