const I18nHelper = require('app/core/I18nHelper');
const mockedData = require('test/mock/data/index');
const { events } = require('app/config');

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
      I18nHelper.reformatAndSetHearingDetailsOnEvents(appeal.latestEvents);
      I18nHelper.reformatAndSetHearingDetailsOnEvents(appeal.historicalEvents);

      if(appeal.status === events.HEARING_BOOKED.name) {
        appeal.latestHearingBookedEvent = I18nHelper.getEventWithMatchingContentKey(appeal.latestEvents, events.HEARING_BOOKED.contentKey);
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
