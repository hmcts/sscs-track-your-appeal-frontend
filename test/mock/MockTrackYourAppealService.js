const I18nHelper = require('app/core/I18nHelper');
const mockedData = require('test/mock/data/index');

class MockTrackMyAppealService {

  static status(id) {
    return new Promise((resolve, reject) => {
      if (!mockedData[id]) {
        reject({
          error: "Not Found",
          message: 'No mocked json file for appeal id:' + id,
          responseCode: 404
        });
      }
      const appeal = mockedData[id].appeal;
      I18nHelper.setHeadingAndRenderedContentOnEvents(appeal.events);
      setTimeout(() => resolve(appeal), 50);
    });
  }
}

module.exports = MockTrackMyAppealService;
