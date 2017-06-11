const {get} = require('lodash');
const {appealsAPI} = require('app/config');
const request = require('superagent');
const Appeal = require('app/core/Appeal');

class AppealService {

  static getAppeal(req, res, next) {
    if (req.params.id) {
      request('GET', appealsAPI + '/' + req.params.id)
        .then((result) => {
          const appeal = new Appeal(result.body.appeal);
          appeal.decorate();
          res.locals.appeal = appeal;
          next();
        }).catch((error) => {
          error.responseCode = error.status;
          error.message =
            `${get(error, 'response.body.Map.message')}
             ${get(error, 'response.body.Map.exception')} 
             ${get(error, 'response.body.Map.path')}`;
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
