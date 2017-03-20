'use strict';
const secret_key = process.env.EMAIL_MAC_SECRET_TEXT || "our-big-secret",
  cryptoJS = require("crypto-js"),
  URLSafeBase64 = require('urlsafe-base64'),
  config = require('../props/postdatatoAPI'),
  request = require('superagent'),
  assert = require('assert'),
  apiHelper = require('./apiHelper');


class messageAuthenticationCodeHelper extends Helper {
  constructor(config) {
    super(config);
    this.appeal_id = null;
    this.authentication_code = null;
    this.apiHelper = new apiHelper.APIHelper();
  }

  getMACToken() {
    return this.generateSubscriptionID()
      .then(result => {
        const unixTimeStamp = Math.floor((new Date).getTime() / 1000);
        const subscriptionId = result.subscriptionId;

        let hmacEncription = cryptoJS.HmacSHA256(subscriptionId + "|" + unixTimeStamp, secret_key);
        let hashInBase64 = cryptoJS.enc.Base64.stringify(hmacEncription).substring(0, 10);
        let buffer = new Buffer(subscriptionId + "|" + unixTimeStamp + "|" + hashInBase64);

        this.authentication_code = URLSafeBase64.encode(buffer);

        return this.authentication_code;
      })
    .catch(err => {
      throw new assert.AssertionError({message: "FAIL"});
    });
  }

  generateSubscriptionID() {
    return this.apiHelper.createDefaultAppeal()
      .then(result => {
        return this.apiHelper.createAppealReceivedEvent(result.appealId);
      })
      .then(result => {
        return this.apiHelper.createDefaultSubscription(result.appealId);
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
