const {get} = require('lodash');
const {appealsAPI} = require('app/config');
const HttpStatus = require('http-status-codes');
const request = require('superagent');
const {Logger} = require('@hmcts/nodejs-logging');
const logger = Logger.getLogger('AppealService.js');

const getAppeal = (req, res, next) => {

  if(!req.params.id) {
    next(new Error(`Unable to make API call to ${appealsAPI}/${req.params.id}`));
    return;
  }

  request.get(`${appealsAPI}/${req.params.id}`)
    .then((result) => {
      const appeal = result.body.appeal;

      appeal.evidenceReceived = false;
      appeal.latestEvents = appeal.latestEvents || [];
      appeal.historicalEvents = appeal.historicalEvents || [];
      res.locals.appeal = appeal;
      logger.info(`GET /appeals/${req.params.id} ${HttpStatus.OK}`);

      next();
    }).catch((error) => {
      if(error.status === HttpStatus.NOT_FOUND) {
        let message, path, exception;
        message = get(error, 'response.body.Map.message');
        path = get(error, 'response.body.Map.path');
        exception = get(error, 'response.body.Map.exception');
        error.message = `${message} ${path} : ${exception}`;
      }
      next(error);
    });
};

const changeEmailAddress = (req, res, next) => {
  const token = res.locals.token;

  const endpoint = `${appealsAPI}/${token.appealId}/subscriptions/${token.subscriptionId}`;

  if(!token || !token.appealId || !token.subscriptionId) {
    next(new Error(`Unable to make API call to POST: ${endpoint}`));
    return;
  }

  const body = { subscription: { email: req.body.email } };

  request.post(endpoint).send(body)
    .then((result) => {
        logger.info(`POST ${endpoint} ${HttpStatus.OK}`);
        next();
      }).catch((error) => {
        next(error);
      });
};

const stopReceivingEmails = (req, res, next) => {
  const token = res.locals.token;

  const endpoint = `${appealsAPI}/${token.appealId}/subscriptions/${token.subscriptionId}`;

  if(!token || !token.appealId || !token.subscriptionId) {
    next(new Error(`Unable to make API call to DELETE: ${endpoint}`));
    return;
  }

  request.delete(endpoint)
    .then((result) => {
      logger.info(`DELETE ${endpoint} ${HttpStatus.OK}`);
      next();
    }).catch((error) => {
      next(error);
    });

};

module.exports = { getAppeal, changeEmailAddress, stopReceivingEmails };
