'use strict';
const config = require('../props/postdatatoAPI'),
  request = require('superagent'),
  assert = require('assert');

class postAppealHelper extends Helper {
  constructor(config) {
    super(config);
    this.appeal_id = null;
  }

  createAppeal(appealData) {
    return request('POST', config.api_base_url + '/appeals')
      .send(appealData)
      .then(res => {
          const header_location = res.headers.location;
          const location_split = header_location.split("/");
          const appealId = location_split[2];
          return {id: appealId};
        }, err => {
          throw new assert.AssertionError({message: "Backend API service error " + err});
        }
      );
  }

  createEvent(appealID, appealEventData) {
    return request('POST', config.api_base_url + '/appeals/' + appealID + '/events')
      .send(appealEventData)
      .then(res => {
          console.log("Event Created For Appeal received: " + res.statusCode + " and appeal Id is : " + appealID);
          return this.appeal_id = appealID;
        }, err => {
          throw new assert.AssertionError({message: "Backend API service failure on appeal received event post " + err});
        }
      );
  }

  postAppealReceivedEvent() {
    return new Promise((resolve, reject) => {
      this.createAppeal(config.appeal_post_data)
        .then((result, error) => {
          return this.createEvent(result.id, config.appeal_event_post_data);
        }).then((result, error) => {
        resolve(this.appeal_id );

    });
  });
  };

  postDWPResponseEvent() {
    this.getAppealId();
    const dwp_response_data = config.dwp_response_event_post_data;

    return request('POST', config.api_base_url + '/appeals/' + this.appeal_id + '/events')
      .send(dwp_response_data)
      .then(res => {
        console.log("DWP Response Event Created: " + res.statusCode);
          return this.appeal_id ;
        }, err => {
          throw new assert.AssertionError({message: "Backend API service failure on DWP response event post " + err});
        }
      );
    };

  postHearingBookedEvent() {
    this.getAppealId();
    const hearing_booked_data = config.hearing_booked_event_post_data;

    return request('POST', config.api_base_url + '/appeals/' + this.appeal_id + '/events')
      .send(hearing_booked_data)
      .then(res => {
        console.log("Hearing Book Received Event Created: " + res.statusCode);
          return this.appeal_id ;
        }, err => {
          throw new assert.AssertionError({message: "Backend API service failure on Hearing Booked event post " + err});
        }
      );
  };

  postHearingEvent() {
    this.getAppealId();
    const hearing_data = config.hearing_event_post_data;

    return request('POST', config.api_base_url + '/appeals/' + this.appeal_id + '/events')
      .send(hearing_data)
      .then(res => {
          console.log("Hearing Event Created: " + res.statusCode);
          return this.appeal_id ;
        }, err => {
          throw new assert.AssertionError({message: "Backend API service failure on appeal received Hearing event post " + err});
        }
      );
     return this.appeal_id;
  };

  getAppealId() {
    if (this.appeal_id === null || this.appeal_id === undefined) {
      throw new assert.AssertionError({message: "No appeal ID"});
    }
    return this.appeal_id;
  };
}
module.exports = postAppealHelper;
