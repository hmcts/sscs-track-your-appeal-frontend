const apiUrl = require('config').get('api.url');
const request = require('superagent');
const appInsights = require('app-insights');
const HttpStatus = require('http-status-codes');
const { Logger } = require('@hmcts/nodejs-logging');

const logger = Logger.getLogger('TokenService.js');

const validateToken = (req, res, next) => {
  if (!req.params.mactoken) {
    next(new Error(`Unable to make API call to ${apiUrl}/tokens/${req.params.mactoken}`));
    return;
  }

  return request.get(`${apiUrl}/tokens/${req.params.mactoken}`)
    .then(result => {
      res.locals.token = result.body.token;
      logger.info(`GET /tokens/${req.params.mactoken} ${HttpStatus.OK}`);
      next();
    })
    .catch(error => {
      if (error.statusCode === HttpStatus.BAD_REQUEST) {
        // Provide a better error message.
        error.message = error.rawResponse;
      }
      appInsights.trackException(error);
      next(error);
    });
};

module.exports = { validateToken };
