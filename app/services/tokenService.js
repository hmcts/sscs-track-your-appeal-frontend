const {tokenAPI} = require('app/config');
const request = require('superagent');
const HttpStatus = require('http-status-codes');
const logger = require('nodejs-logging').getLogger('TokenService.js');

const validateToken = (req, res, next) => {

  if(!req.params.mactoken) {
    next(new Error(`Unable to make API call to ${tokenAPI}/${req.params.mactoken}`));
    return;
  }

  request.get(`${tokenAPI}/${req.params.mactoken}`)
    .then((result) => {
      res.locals.token = result.body.token;
      logger.info(`GET /tokens/${req.params.mactoken} ${HttpStatus.OK}`);
      next();
    }).catch((error) => {
    if(error.statusCode === HttpStatus.BAD_REQUEST) {
      // Provide a better error message.
      error.message = error.rawResponse;
    }
    next(error);
  });

};

module.exports = { validateToken };
