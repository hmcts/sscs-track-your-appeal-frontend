'use strict';
const secret_key = process.env.EMAIL_MAC_SECRET_TEXT || "our-big-secret",
  cryptoJS = require("crypto-js"),
  URLSafeBase64 = require('urlsafe-base64'),
  request = require('superagent'),
  assert = require('assert'),
  pg = require('pg'),
  dbProperties = require('../props/properties').dataBaseFields;


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
      let pgClient = new pg.Client(dbProperties.connectionString);
      let appealData = [];
      pgClient.connect();
      let query = pgClient.query("Select id from subscriptions where appeal_case_id=$1", [dbProperties.lapsedRevisedAppealCaseId]);
      query.on('row', (row) => {
        appealData.push(row);
      });
      query.on("end", (result) => {
        if(result.rowCount===0 || result.rowCount===null ) {
          pgClient.end();
          reject("No matching record found for appeal case id");
        }
        else{
          pgClient.end();
          resolve(appealData[0].appeal_number);
        }
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
