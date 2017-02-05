const I18nHelper = require('app/core/I18nHelper');
const mockedData = require('test/mock/data/index');
const {CONTENT_KEYS, STATUSES} = require('app/config');

class MockTrackMyAppealService {

  static status(id) {
    return new Promise((resolve, reject) => {
      if (!mockedData[id]) {
        reject({
          error: "Not Found",
          message: `No mocked JSON file for appeal id: ${id} - try these instead: ${Object.keys(mockedData)}`,
          responseCode: 404
        });
      }
      let appeal = mockedData[id].appeal;
      I18nHelper.setHeadingAndRenderedContentOnEvents(appeal.events);

      if (appeal.status === STATUSES.HEARING_BOOKED.name) {
        I18nHelper.setHearingOnAppeal(appeal, CONTENT_KEYS.HEARING_BOOKED);
      }

      if (appeal.status === STATUSES.HEARING.name) {
        I18nHelper.setHearingOnAppeal(appeal, CONTENT_KEYS.HEARING);
      }

      setTimeout(() => resolve(appeal), 50);
    });
  }
}

module.exports = MockTrackMyAppealService;
