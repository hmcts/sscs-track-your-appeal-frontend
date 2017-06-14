const request = require('superagent');
const {tokenAPI} = require('app/config');
const logger = require('nodejs-logging').getLogger('TokenService.js');

class TokenService {

  static validateToken(req, res, next) {
    if (req.params.mactoken) {
      request.get(`${tokenAPI}/${req.params.mactoken}`)
        .then((result) => {
          res.locals.token = result.body.token;
          logger.info(`GET /tokens/${req.params.mactoken} 200`);
          next();
      }).catch((error) => {
        next(error);
      });
    } else {
      next();
    }
  }
}

module.exports = TokenService;
