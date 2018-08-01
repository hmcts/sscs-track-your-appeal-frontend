const { validateToken } = require('app/services/tokenService');
const { expect, sinon } = require('test/chai-sinon');
const apiUrl = require('config').get('api.url');
const appInsights = require('app-insights');
const HttpStatus = require('http-status-codes');
const nock = require('nock');

describe('tokenService.js', () => {
  const req = { params: { mactoken: '123456789' } };
  const res = { locals: { token: {} } };
  const next = sinon.stub();

  describe('validateToken() - HTTP GET /tokens/mactoken 200', () => {
    it('should call next() with no arguments', () => {
      const token = 'qwerty123';

      nock(apiUrl)
        .get(`/tokens/${req.params.mactoken}`)
        .reply(HttpStatus.OK, { token });

      validateToken(req, res, next).then(() => {
        expect(res.locals.token).to.equal(token);
      });
    });
  });

  describe('validateToken() - HTTP GET /tokens/mactoken 400', () => {
    it('should call next() passing an error containing a 400', () => {
      const error = {
        statusCode: HttpStatus.BAD_REQUEST,
        rawResponse: 'Bad request error'
      };

      nock(apiUrl)
        .get(`/tokens/${req.params.mactoken}`)
        .replyWithError(error);

      return validateToken(req, res, next)
        .then(() => {
          error.message = error.rawResponse;
          expect(next).to.have.been.calledWith(error);
        });
    });
  });

  describe('validateToken() - HTTP GET /tokens/mactoken 500', () => {
    beforeEach(() => {
      sinon.spy(appInsights, 'trackException');
    });
    afterEach(() => {
      appInsights.trackException.restore();
    });
    it('should call next() passing an error containing a 500', () => {
      const error = { value: HttpStatus.INTERNAL_SERVER_ERROR, reason: 'server error' };

      nock(apiUrl)
        .get(`/tokens/${req.params.mactoken}`)
        .replyWithError(error);

      return validateToken(req, res, next)
        .then(() => {
          expect(next).to.have.been.calledWith(error);
          expect(appInsights.trackException).to.have.been.calledOnce.calledWith(error);
        });
    });
  });
});
