const {get} = require('lodash');
const request = require('superagent');
const I18nHelper = require('app/core/I18nHelper');
const { APPEALS_ENDPOINT, events } = require('app/config');
const METHODS = require('app/services/methods');

class AppealService {

  static status(id) {
    return new Promise((resolve, reject) => {
      request(METHODS.GET, APPEALS_ENDPOINT + '/' + id).then((result) => {
        let appeal = result.body.appeal;
        I18nHelper.setRenderedContentOnEvents(appeal.latestEvents);
        I18nHelper.setHeadingAndRenderedContentOnEvents(appeal.historicalEvents);
        I18nHelper.reformatAndSetHearingDetailsOnEvents(appeal.latestEvents);
        I18nHelper.reformatAndSetHearingDetailsOnEvents(appeal.historicalEvents);

        if(appeal.status === events.HEARING_BOOKED.name) {
          appeal.latestHearingBookedEvent = I18nHelper.getEventWithMatchingContentKey(appeal.latestEvents, events.HEARING_BOOKED.contentKey);
        }

        resolve(appeal);

      }).catch((error) => {
        // The responseCode is required for our logging.
        error.responseCode = error.status;

        // Extract server side error details.
        let message = get(error, 'response.body.Map.message');
        let exception = get(error, 'response.body.Map.exception');
        let path = get(error, 'response.body.Map.path');
        error.message = `${message} - ${exception} - ${path}`;

        reject(error);
      });
    });
  }

  static changeEmailAddress(id, subscriptionId, body) {
    return request.post(`${APPEALS_ENDPOINT}/${id}/subscriptions/${subscriptionId}`).send(body);
  }

  static stopReceivingEmails(id, subscriptionId) {
    return request.delete(`${APPEALS_ENDPOINT}/${id}/subscriptions/${subscriptionId}`);
  }
}

module.exports = AppealService;
