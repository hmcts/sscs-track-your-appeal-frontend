const request = require('superagent');
const {healthAPI} = require('app/config');

class HealthService {

  static health() {
    return request('GET', healthAPI);
  }
}

module.exports = HealthService;
