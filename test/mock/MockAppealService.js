const I18nHelper = require('app/core/I18nHelper');
const mockedData = require('test/mock/data/index');
const { EVENTS } = require('app/config');

class MockAppealService {

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
      I18nHelper.setRenderedContentOnEvents(appeal.latestEvents);
      I18nHelper.setHeadingAndRenderedContentOnEvents(appeal.historicalEvents);

      if (appeal.status === EVENTS.HEARING_BOOKED.name) {
        I18nHelper.setHearingOnAppeal(appeal, EVENTS.HEARING_BOOKED.contentKey);
      }

      if (appeal.status === EVENTS.HEARING.name) {
        I18nHelper.setHearingOnAppeal(appeal, EVENTS.HEARING.contentKey);
      }

      setTimeout(() => resolve(appeal), 50);
    });
  }

  static changeEmailAddress(id, subscriptionId, body) {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve({
        appeal_id: 'md200',
        email: 'mickey.mouse@disney.com',
        id: 6,
        mobileNumber: "07533457331"
      }), 50);
    });
  }

  static stopReceivingEmails(id, subscriptionId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve({
        appeal_id: 'md200',
        email: 'mickey.mouse@disney.com',
        id: 6,
        mobileNumber: "07533457331"
      }), 50);
    });
  }
}

module.exports = MockAppealService;
