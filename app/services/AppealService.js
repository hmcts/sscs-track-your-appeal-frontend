const _ = require('lodash');
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
        let err = {};
        err.responseCode = error.status;
        err.message = error.message;
        err.fields = [];

        // Pull out the server side exception.
        let exception = _.get(error, 'response.body.Map.exception');
        if (exception) {
          err.fields.push({'exception': exception});
        }

        // Pull out the server side message.
        let message = _.get(error, 'response.body.Map.message');
        if (message) {
          err.fields.push({'message': message});
        }

        // Pull out the server side path.
        let path = _.get(error, 'response.body.Map.path');
        if (path) {
          err.fields.push({'path': path})
        }

        reject(err);

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
