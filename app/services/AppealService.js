const {get} = require('lodash');
const {appealsAPI} = require('app/config');
const HttpStatus = require('http-status-codes');
const request = require('superagent');
const Appeal = require('app/core/Appeal');
const logger = require('nodejs-logging').getLogger('AppealService.js');

class AppealService {

  static getAppeal(req, res, next) {
    if (req.params.id) {
      request.get(`${appealsAPI}/${req.params.id}`)
        .then((result) => {
          const appeal = new Appeal(result.body.appeal);
          appeal.decorate();
          res.locals.appeal = appeal;
          logger.info(`GET /appeals/${req.params.id} 200`);
          next();
        }).catch((error) => {
          error.responseCode = error.status;
          if(error.status === HttpStatus.NOT_FOUND) {
            let message, path, exception;
            message = get(error, 'response.body.Map.message');
            path = get(error, 'response.body.Map.path');
            exception = get(error, 'response.body.Map.exception');
            error.message = `${message} ${path} : ${exception}`;
          }
          next(error);
        });
    } else {
      next();
    }
  }

  static changeEmailAddress(id, subscriptionId, body) {
    return request.post(`${appealsAPI}/${id}/subscriptions/${subscriptionId}`).send(body);
  }

  static stopReceivingEmails(id, subscriptionId) {
    return request.delete(`${appealsAPI}/${id}/subscriptions/${subscriptionId}`);
  }
}

module.exports = AppealService;
