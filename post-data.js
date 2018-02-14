'use strict';

const {Logger} = require('@hmcts/nodejs-logging');
const logger = Logger.getLogger('post-data.js');
const apiHelper = require('test/smoke/helpers/apiHelper');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin
});
const api = new apiHelper.APIHelper();

function step(text) {
  return (res) => {
    logger.info(text);
    return new Promise((resolve) => {
      rl.question(text, () => { resolve(res); });
    });
  }
}

function evidence(n) {
  return (res) => {
    return api.createEvidenceReceivedEvent(res.appealId, n);
  }
}

let appeal = api.createDefaultAppeal()
  .then(res => {
    logger.info("Appeal created " + res.appealId);
    return api.createAppealReceivedEvent(res.appealId);
  })
  .then(res => {
    return api.createSubscription(res.appealId, {
      "subscription": {
        "email": "firstname.lastname@email.net"
      }
    });
  })
  .then(step("Add first evidence"))
  .then(evidence(1))
  .then(step("Add DWP response"))
  .then(res => {
    return api.createDWPRespondEvent(res.appealId);
  })
  .then(step("Add second evidence"))
  .then(evidence(2))
  .then(step("Add hearing booked"))
  .then(res => {
    return api.createHearingBookedEvent(res.appealId);
  })
  .then(step("Add third evidence"))
  .then(evidence(3))
  .then(step("Add hearing"))
  .then(res => {
    return api.createHearingEvent(res.appealId);
  })
  .then(() => {
    return process.exit(0);
  })
  .catch(err => {
    logger.info("ERR: " + JSON.stringify(err));
  });
