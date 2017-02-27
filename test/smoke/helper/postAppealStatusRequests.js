'use strict';
const config = require('../props/postdatatoAPI'),
  request = require('request-json'),
  assert = require('assert'),
  client = request.createClient(config.api_base_url);

class postAppealHelper extends Helper {
  constructor(config) {
    super(config);
    this.appeal_id = null;
  }

  createAppeal(appealData) {
    return new Promise((resolve, reject) => {

      client.post('/appeals', appealData, (err, res) => {
        if (err || res.statusCode != 201) {
          return reject({
            log: console.log("Backend API service " + err + " Status Code is: " + res.statusCode ),
            error: "Backend API service is Not Available or error on Creation of Appeal"
          });
        }
        const header_location = res.headers.location;
        const location_split = header_location.split("/");
        const appealId = location_split[2];

        resolve({ id: appealId });
      });

    });
  }

  createEvent(appealID, appealEventData) {
    return new Promise((resolve, reject) => {
      client.post('/appeals/' + appealID + '/events', appealEventData, (err, res, body) => {
        if (err) {
          throw new assert.AssertionError({message: "Backend API service failure " + err});
        }
        console.log("Event Created For Appeal received: " + res.statusCode + " and appeal Id is : " + appealID);
        resolve(this.appeal_id = appealID);
      });
    });
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
    client.post('/appeals/' + this.appeal_id + '/events', dwp_response_data, function (err, res, body) {
      if (err) {
        throw new assert.AssertionError({message: "Backend API service failure " + err});
      }
      console.log("DWP Response Event Created: " + res.statusCode);
    });
    return this.appeal_id;
  };

  postHearingBookedEvent() {
    this.getAppealId();
    const hearing_booked_data = config.hearing_booked_event_post_data;
    client.post('/appeals/' + this.appeal_id + '/events', hearing_booked_data, function (err, res, body) {
      if (err) {
        throw new assert.AssertionError({message: "Backend API service failure " + err});
      }
      console.log("Hearing Book Received Event Created: " + res.statusCode);
    });
    return this.appeal_id;
  };

  postHearingEvent() {
    this.getAppealId();
    const hearing_data = config.hearing_event_post_data;
    client.post('/appeals/' + this.appeal_id + '/events', hearing_data, function (err, res, body) {
      if (err) {
        throw new assert.AssertionError({message: "Backend API service failure " + err});
      }
      console.log("Hearing Event Created: " + res.statusCode);
    });
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
