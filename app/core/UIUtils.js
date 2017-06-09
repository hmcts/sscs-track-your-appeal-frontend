'use strict';

const logger = require('nodejs-logging').getLogger('routes.js');

const { events, progressBar } = require('app/config');

class UIUtils {

  static showProgressBar(req, res, next) {
    let appeal = res.locals.appeal;
    if(appeal) {
      let event = events[appeal.status];
      if(event) {
        appeal.showProgressBar = event.index !== progressBar.NONE;
      } else {
        logger.error(`Unable to map the status ${appeal.status} to an event:`);
      }
    } else {
      logger.error(`Undefined appeal`);
    }
    next();
  }

}

module.exports = UIUtils;
