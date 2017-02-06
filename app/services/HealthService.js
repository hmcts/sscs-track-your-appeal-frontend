const request = require('superagent');
const {HEALTH_ENDPOINT} = require('app/config');

class HealthService {

  static health() {
    return request('GET', HEALTH_ENDPOINT);
  }
}

module.exports = HealthService;
