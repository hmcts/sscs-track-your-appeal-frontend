'use strict'

const config = require('../props/postdatatoAPI'),
  request = require('superagent'),
  assert = require('assert');

class APIHelper {
  createAppeal(appealData) {
    return request('POST', config.api_base_url + '/appeals')
      .send(appealData)
      .then(res => {
        return {
          appealId: this._getAppealIdFromLocation(res),
        }
      })
      .catch(err => {
        return new assert.AssertionError({message: "Backend API service error " + err});
      });
  }

  createDefaultAppeal() {
    return this.createAppeal(config.appeal_post_data);
  }

  createSubscription(appealId, subscriptionData) {
    return request('POST', config.api_base_url + '/appeals/' + appealId + '/subscriptions')
      .send(subscriptionData)
      .then(res => {
        return {
          appealId: appealId,
          subscriptionId: res.body.subscription.id,
        };
      })
      .catch(err => {
        throw new assert.AssertionError({message: "Backend API service failure on subscription creation" + err});
      });
  }

  createDefaultSubscription(appealId) {
    return this.createSubscription(appealId, config.subscriptions_post_data);
  }

  createEvent(appealId, appealEventData) {
    return request('POST', config.api_base_url + '/appeals/' + appealId + '/events')
      .send(appealEventData)
      .then(res => {
        return {
          appealId: this._getAppealIdFromLocation(res),
          eventId: this._getEventIdFromLocation(res),
        }
      })
      .catch(err => {
        throw new assert.AssertionError({message: "Backend API service failure on event post " + err});
      });
  }

  createAppealReceivedEvent(appealId) {
    return this.createEvent(appealId, config.appeal_event_post_data);
  }

  createDWPRespondEvent(appealId) {
    return this.createEvent(appealId, config.dwp_response_event_post_data);
  }

  createHearingBookedEvent(appealId) {
    return this.createEvent(appealId, config.hearing_booked_event_post_data);
  }

  createHearingEvent(appealId) {
    return this.createEvent(appealId, config.hearing_event_post_data);
  }

  rePromise(promise, callback) {
    return new Promise((resolve, reject) => {
      promise.then((result, error) => {
        callback(result);
        resolve(result);
      });
    });
  }

  _getLocationPart(res, part) {
    return res.headers.location.split("/")[part];
  }

  _getAppealIdFromLocation(res) {
    return this._getLocationPart(res, 2);
  }

  _getEventIdFromLocation(res) {
    return this._getLocationPart(res, 4);
  }

}

module.exports = {
  APIHelper: APIHelper
};
