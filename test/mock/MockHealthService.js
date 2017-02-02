const health = require('test/mock/data/health');

class HealthService {

  static health() {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(health), 50);
    });
  }
}

module.exports = HealthService;
