'use strict';
const config = require('../props/postdatatoAPI'),
  request = require('superagent'),
  assert = require('assert'),
  apiHelper = require('./apiHelper');

class postAppealHelper extends Helper {
  constructor(config) {
    super(config);
    this.appeal_id = null;
    this.apiHelper = new apiHelper.APIHelper();
  }

  createAppeal(appealData) {
    return this.apiHelper.rePromise(
      this.apiHelper.createAppeal(appealData),
      res => { this.appeal_id = res.appealId; }
    );
  }

  createEvent(appealId, appealEventData) {
    return this.apiHelper.createEvent(appealId, appealEventData);
  }

  postAppealReceivedEvent() {
    return this.createAppeal(config.appeal_post_data)
      .then(result => {
        return this.apiHelper.createAppealReceivedEvent(result.appealId);
      });
  };

  postAppealSubscription() {
    return this.apiHelper.createDefaultSubscription(this.appeal_id);
  }

  postDWPResponseEvent() {
    this.getAppealId();
    return this.apiHelper.createDWPRespondEvent(this.appeal_id);
  };

  postHearingBookedEvent() {
    this.getAppealId();
    return this.apiHelper.createHearingBookedEvent(this.appeal_id);
  };

  postHearingEvent() {
    this.getAppealId();
    return this.apiHelper.createHearingEvent(this.appeal_id);
  };

  getAppealId() {
    if (this.appeal_id === null || this.appeal_id === undefined) {
      throw new assert.AssertionError({message: "No appeal ID"});
    }
    return this.appeal_id;
  };
}
module.exports = postAppealHelper;
