const TrackYourAppealService = require('app/services/TrackYourAppealService');
const MockTrackYourAppealService = require('test/mock/MockTrackYourAppealService');
const Config = require('app/config');
const APPEALS = 'appeals';

class ServiceLoader {

  static load(serviceName) {
    const mockData = Config.MOCK_DATA;
    switch (serviceName) {
      case APPEALS:
        return mockData ? MockTrackYourAppealService : TrackYourAppealService;
      default:
        throw new Error('Unknown service: ' + serviceName);
    }
  }

  static get APPEALS() {
    return APPEALS;
  }
}

module.exports = ServiceLoader;
