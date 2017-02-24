'use strict';
const secret_key = process.env.EMAIL_MAC_SECRET_TEXT || "our-big-secret",
  cryptoJS = require("crypto-js"),
  URLSafeBase64 = require('urlsafe-base64'),
  config = require('../props/postdatatoAPI'),
  request = require('request-json'),
  assert = require('assert'),
  client = request.createClient(config.api_base_url);

class messageAuthenticationCodeHelper extends Helper {
  constructor(config) {
    super(config);
    this.appeal_id = null;
    this.authentication_code = null;
    this.subscription_id = null;
  }


  generateMessageAuthenticationCode() {
    return this.generateSubscriptionID().then((result, reject) => {

      const unixTimeStamp = Math.floor((new Date).getTime() / 1000);
      const subscriptionId = result.id;
      console.log("Subscription id is :" + subscriptionId);

      let hmacEncription = cryptoJS.HmacSHA256(subscriptionId + "|" + unixTimeStamp, secret_key);
      let hashInBase64 = cryptoJS.enc.Base64.stringify(hmacEncription).substring(0, 10);
      let buffer = new Buffer(subscriptionId + "|" + unixTimeStamp + "|" + hashInBase64);

      this.authentication_code = URLSafeBase64.encode(buffer);

      console.log("Authentication Code Is: " + this.authentication_code);
      return this.authentication_code;

    });
  }

  generateSubscriptionID() {
    return new Promise((resolve, reject) => {
      this.createAppeal(config.appeal_post_data)
        .then((result, error) => {
          return this.createEvent(result.id, config.appeal_event_post_data);
        }).then((result, error) => {
        return this.createSubscription(result.id, config.subscriptions_post_data);
      }).then((result, error) => {
        resolve({ id: result.id });
      })
    });
  }

  createAppeal(appealData) {
    return new Promise((resolve, reject) => {

      client.post('/appeals', appealData, (err, res, body) => {
        if (err) {
          return reject({
            log: console.log("Backend API service " + err),
            error: "Backend API service is Not Available:"
          });
        }
        if (res.statusCode != 201) {
          return reject({
            error: "Post Appeal API Creation Failed:",
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
        console.log("Event Created For Appeal received: " + res.statusCode + " and appeal Id is : " + this.appeal_id);
        resolve({ id: appealID });
      });
    });
  }

  createSubscription(appealID, subscriptionsData) {
    return new Promise((resolve, reject) => {
      client.post('/appeals/' + appealID  + '/subscriptions', subscriptionsData, (err, res, body) => {
        if (err) {
          throw new assert.AssertionError({message: "Backend API service failure " + err});
        }
        console.log("Subscription id is :" + body.subscription.id);
        resolve({ id: body.subscription.id });
      });
    });
  }

  getMessageAuthenticationCode() {
    if (this.authentication_code === null || this.authentication_code === undefined) {
      throw new assert.AssertionError({message: "No Message Authentication Code"});
    }
    return this.authentication_code;
  };

}

module.exports = messageAuthenticationCodeHelper;
