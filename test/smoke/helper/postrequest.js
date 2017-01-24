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
        console.log(res.statusCode);
        const header_location = res.headers.location;
        const location_split = header_location.split("/");
        appeal_id = location_split[2];
        client.post('/appeals/' + appeal_id + '/events', appeal_event_data, (err, res, body)=> {
          console.log(res.statusCode);
          resolve(appeal_id);
        });
      });
    });
  };

  postDWPResponseEvent() {
    const dwp_response_data = config.dwp_response_event_post_data;
    client.post('/appeals/' + appeal_id + '/events', dwp_response_data, function (err, res, body) {
      return console.log(res.statusCode);
    });
  };

  postHearingBookedEvent() {
    const hearing_booked_data = config.hearing_booked_event_post_data;
    client.post('/appeals/' + appeal_id + '/events', hearing_booked_data, function (err, res, body) {
      return console.log(res.statusCode);
    });
  };

  postHearingEvent() {
    const hearing_data = config.hearing_event_post_data;
    client.post('/appeals/' + appeal_id + '/events', hearing_data, function (err, res, body) {
      return console.log(res.statusCode);
    });
  };
}
module.exports = postAppealHelper;
