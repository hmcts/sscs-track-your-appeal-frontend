const request = require('superagent');
const Config = require('app/config');
const mockedData = require('test/mock/trackyourappeal.json');
const TIMEOUT = 50;

class TrackMyAppealService {

  static status(id) {
    return request('GET', Config.TRACK_YOUR_APPEAL_ENDPOINT + '/' + id);
  }

  static mockStatus() {
    return new Promise((resolve, reject) => {
      let data = {
        body: mockedData
      };
      setTimeout(() => resolve(data), TIMEOUT);
    });
  }
}

module.exports = TrackMyAppealService;
