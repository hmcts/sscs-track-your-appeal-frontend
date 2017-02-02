const request = require('superagent');
const Config = require('app/config');

class HealthService {

  static health() {
    return request('GET', Config.HEALTH_ENDPOINT);
  }
}

module.exports = HealthService;
