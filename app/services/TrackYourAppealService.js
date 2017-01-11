const request = require('superagent');
const Config = require('app/config');
const I18nHelper = require('app/core/I18nHelper');

class TrackMyAppealService {

  static status(id) {
    return new Promise((resolve, reject) => {
      request('GET', Config.TRACK_YOUR_APPEAL_ENDPOINT + '/' + id).then((result) => {
        I18nHelper.setHeadingAndRenderedContentOnEvents(result.body.appeal.events);
        resolve(result.body.appeal);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  static mockStatus() {
    let mockedData = require('test/mock/trackyourappeal.json');
    return new Promise((resolve) => {
      I18nHelper.setHeadingAndRenderedContentOnEvents(mockedData.appeal.events);
      setTimeout(() => resolve(mockedData.appeal), 50);
    });
  }
}

module.exports = TrackMyAppealService;
