'use strict';
const secret_key = process.env.EMAIL_MAC_SECRET_TEXT || "our-big-secret",
  cryptoJS = require("crypto-js"),
  URLSafeBase64 = require('urlsafe-base64'),
  request = require('superagent'),
  assert = require('assert'),
  pg = require('pg'),
  props = require('../props/properties');


class messageAuthenticationCodeHelper extends Helper {
  constructor(config) {
    super(config);
    this.appeal_id = null;
    this.authentication_code = null;
  }

  getMACToken() {
    return this.getSubscriptionID()
      .then(result => {
        const unixTimeStamp = Math.floor((new Date).getTime() / 1000);
        const subscriptionId = result;
        let hmacEncription = cryptoJS.HmacSHA256(subscriptionId + "|" + unixTimeStamp, secret_key);
        let hashInBase64 = cryptoJS.enc.Base64.stringify(hmacEncription).substring(0, 10);
        let buffer = new Buffer(subscriptionId + "|" + unixTimeStamp + "|" + hashInBase64);

        this.authentication_code = URLSafeBase64.encode(buffer);
        console.log(this.authentication_code);
        return this.authentication_code;
      });
  }

  getSubscriptionID() {
    return new Promise((resolve, reject) => {

      let pgClient = new pg.Client(props.data_fields.connectionString);
      let appealData = [];
      pgClient.connect();
      let query = pgClient.query("Select id from subscriptions where appeal_case_id=$1", [props.data_fields.subscription_appeal_case_id]);

      query.on('row', (row) => {
        appealData.push(row);
      });

      query.on("end", (result) => {
        pgClient.end();
        resolve(appealData[0].id);
      });

    })
  }

  getMessageAuthenticationCode() {
    if (this.authentication_code === null || this.authentication_code === undefined) {
      throw new assert.AssertionError({message: "No Message Authentication Code"});
    }
    return this.authentication_code;
  };

}

module.exports = messageAuthenticationCodeHelper;
