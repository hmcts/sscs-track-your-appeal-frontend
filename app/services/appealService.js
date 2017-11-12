const {get} = require('lodash');
const {appealsAPI} = require('app/config');
const HttpStatus = require('http-status-codes');
const request = require('superagent');
const logger = require('nodejs-logging').getLogger('AppealService.js');

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

  if(!token || ! token.id || !token.subscriptionId) {
    next(new Error(`Unable to make API call to POST: ${appealsAPI}/${token.id}/subscriptions/${token.subscriptionId}`));
    return;
  }

  request.post(`${appealsAPI}/${id}/subscriptions/${subscriptionId}`).send(body)
    .then((result) => {
        logger.info(`POST ${appealsAPI}/${token.id}/subscriptions/${token.subscriptionId} ${HttpStatus.OK}`);
        next();
      }).catch((error) => {
        next(error);
      });
};

const stopReceivingEmails = (req, res, next) => {
  const token = res.locals.token;

  if(!token || ! token.id || !token.subscriptionId) {
    next(new Error(`Unable to make API call to DELETE: ${appealsAPI}/${token.id}/subscriptions/${token.subscriptionId}`));
    return;
  }

  request.delete(`${appealsAPI}/${token.id}/subscriptions/${token.subscriptionId}`)
    .then((result) => {
      logger.info(`DELETE ${appealsAPI}/${token.id}/subscriptions/${token.subscriptionId} ${HttpStatus.OK}`);
      next();
    }).catch((error) => {
      next(error);
    });

};

module.exports = { getAppeal, changeEmailAddress, stopReceivingEmails };
