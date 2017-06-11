const request = require('superagent');
const {tokenAPI} = require('app/config');

class TokenService {

  static validateToken(macToken) {
    return request('GET', `${tokenAPI}/${macToken}`);
  }
}

module.exports = TokenService;
