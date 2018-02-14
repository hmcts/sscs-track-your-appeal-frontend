const { validateToken } = require('app/services/tokenService');
const { expect, sinon } = require('test/chai-sinon');
const nock = require('nock');
const { tokenAPI } = require('app/config');
const HttpStatus = require('http-status-codes');

describe('tokenService.js', () => {

  let req, res, next, api;

  beforeEach(() => {

    req = {
      params: {
        mactoken: '123456789'
      }
    };

    res = {
      locals: {
        token: {}
      }
    };

    next = sinon.stub();

  });

  afterEach(() => {
    api.isDone();
  });

  describe('validateToken', () => {

    describe('get request to api is successful', () => {

      it('should call next', () => {

        const token = 'qwerty123';

        api = nock(tokenAPI)
          .get(`/${req.params.mactoken}`)
          .reply(200, { token });

        return validateToken(req, res, next)
          .then(() => {
            expect(res.locals.token).to.equal(token);
            expect(next).to.have.been.called;
          });

      });

    });

    describe('get request to api is unsuccessful', () => {

      const requestError = errResponse => {
        return nock(tokenAPI)
          .get(`/${req.params.mactoken}`)
          .replyWithError(errResponse);
      };

      it('should call next with the error when code is not 400', () => {

        const error = { value: 500, reason: 'server error' };

        api = requestError(error);

        return validateToken(req, res, next)
          .then(() => {
            expect(next).to.have.been.calledWith(error);
          });

      });

      it('should call next with the error when code is 400', () => {

        const error = { statusCode: HttpStatus.BAD_REQUEST, rawResponse: 'Bad request error' };

        api = requestError(error);

        return validateToken(req, res, next)
          .then(() => {
            error.message = error.rawResponse;
            expect(next).to.have.been.calledWith(error);
          });

      });

    });

  });


});
