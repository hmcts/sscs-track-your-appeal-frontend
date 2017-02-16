const request = require('superagent');
const {TOKEN_ENDPOINT} = require('app/config');

class TokenService {

  static validateToken(macToken) {
    return request('GET', `${TOKEN_ENDPOINT}/${macToken}`);
  }
}

module.exports = TokenService;
