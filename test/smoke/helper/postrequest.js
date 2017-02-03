'use strict';
let appeal_id;
const config = require('../props/postdatatoAPI'),
  request = require('request-json'),
  client = request.createClient(config.api_base_url);

class postAppealHelper extends Helper {

  postAppealReceivedEvent() {
    return new Promise((resolve, reject) => {
      const appeal_data = config.appeal_post_data;
      const appeal_event_data = config.appeal_event_post_data;

      client.post('/appeals', appeal_data, (err, res, body) => {

        if (err) {
         /* console.log("Backend API service " + err);
          return process.exit(1);*/
          return reject({
            log: console.log("Backend API service " + err),
            error: "Backend API service is Not Available:"
          });
          }

        if (res.statusCode != 201) {
          return reject({
            error: "Post Appeal API Creation Failed:",
            exitCode: process.exit(1)
          });
        }

        const header_location = res.headers.location;
        const location_split = header_location.split("/");
        appeal_id = location_split[2];
        client.post('/appeals/' + appeal_id + '/events', appeal_event_data, (err, res, body)=> {
          if (err) {
            console.log("Backend API service " + err);
            return process.exit(1);
          }
          console.log("Event Created For Appeal received: " + res.statusCode + " and appeal Id is : " + appeal_id);
          resolve(appeal_id);
        });
      });
    });
  };

  postDWPResponseEvent() {
    const dwp_response_data = config.dwp_response_event_post_data;
    client.post('/appeals/' + appeal_id + '/events', dwp_response_data, function (err, res, body) {
      if (err) {
        console.log("Backend API service " + err);
        return process.exit(1);
      }
      return console.log("DWP Response Event Created: " + res.statusCode);
    });
  };

  postHearingBookedEvent() {
    const hearing_booked_data = config.hearing_booked_event_post_data;
    client.post('/appeals/' + appeal_id + '/events', hearing_booked_data, function (err, res, body) {
      if (err) {
        console.log("Backend API service " + err);
        return process.exit(1);
      }
      return console.log("Hearing Book Received Event Created: " + res.statusCode);
    });
  };

  postHearingEvent() {
    const hearing_data = config.hearing_event_post_data;
    client.post('/appeals/' + appeal_id + '/events', hearing_data, function (err, res, body) {
      if (err) {
        console.log("Backend API service " + err);
        return process.exit(1);
      }
      return console.log("Hearing Event Created: " + res.statusCode);
    });
  };
}
module.exports = postAppealHelper;
