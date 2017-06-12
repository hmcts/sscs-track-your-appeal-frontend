const health = require('test/mock/data/health');

class MockHealthService {

  static health() {
    return new Promise((resolve) => {
      setTimeout(() => resolve(health), 50);
    });
  }
}

module.exports = MockHealthService;
