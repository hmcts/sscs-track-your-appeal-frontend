const { getAppeal, changeEmailAddress, stopReceivingEmails } = require('app/services/appealService');
const { expect, sinon } = require('test/chai-sinon');
const { appeal } = require('test/mock/data/appealReceived');
const HttpStatus = require('http-status-codes');
const apiURL = require('config').get('api.url');
const nock = require('nock');

describe('appealService.js', () => {

  const invalidId = 'invalidId';
  let req, res, next;

  beforeEach(() => {

    req = {
      params: {},
      body: {
        email: 'myemail@email.com'
      }
    };

    res = {
      locals: {
        appeal: {},
        token: {
          appealId: 'md002',
          subscriptionId: 'qwerty123'
        }
      }
    };

    next = sinon.stub();

  });

  describe('getAppeal() - HTTP GET /appeals/id 200', () => {

    it('should call next() with no arguments', () => {

      req.params.id = appeal.appealNumber;

      nock(apiURL)
        .get(`/appeals/${req.params.id}`)
        .reply(HttpStatus.OK, { appeal });

      return getAppeal(req, res, next)
        .then(() => {
          appeal.evidenceReceived = false;
          appeal.historicalEvents = [];
          expect(res.locals.appeal).to.eql(appeal);
          expect(next).to.have.been.called;
        });

    });

  });

  describe('getAppeal() - HTTP GET /appeals/invalidId 404', ()=> {

    it('should call next() passing an error containing a 404', () => {

      const error = { status: HttpStatus.NOT_FOUND };

      req.params.id = appeal.appealNumber;

      nock(apiURL)
        .get(`/appeals/${invalidId}`)
        .replyWithError(error);

      return getAppeal(req, res, next)
        .catch(() => {
          expect(next).to.have.been.calledWith(error);
        });

    });

  });

  describe('getAppeal() - HTTP GET /appeals/invalidId 500', ()=> {

    it('should call next() passing an error containing a 500', () => {

      const error = { value: HttpStatus.INTERNAL_SERVER_ERROR, reason: 'server error' };

      req.params.id = appeal.appealNumber;

      nock(apiURL)
        .get(`/appeals/${invalidId}`)
        .replyWithError(error);

      return getAppeal(req, res, next)
        .catch(() => {
          expect(next).to.have.been.calledWith(error);
        });

    });

  });

  describe('changeEmailAddress() - HTTP POST /appeals/appealId/subscriptions/subscriptionId 200', () => {

    it('should call next() passing zero arguments', () => {

      nock(apiURL)
        .post(`/appeals/${res.locals.token.appealId}/subscriptions/${res.locals.token.subscriptionId}`, {
          subscription: { email: req.body.email }
        })
        .reply(HttpStatus.OK);

      return changeEmailAddress(req, res, next)
        .then(() => {
          expect(next).to.have.been.called;
        });

    });

  });

  describe('changeEmailAddress() - HTTP POST /appeals/appealId/subscriptions/subscriptionId 500', () => {

    const error = { value: HttpStatus.INTERNAL_SERVER_ERROR, reason: 'server error' };

    it('should call next() with the error', () => {

      nock(apiURL)
        .post(`/appeals/${res.locals.token.appealId}/subscriptions/${res.locals.token.subscriptionId}`, {
          subscription: { email: req.body.email }
        })
        .replyWithError(error);

      return changeEmailAddress(req, res, next)
        .catch(() => {
          expect(next).to.have.been.calledWith(error);
        });

    });

  });

  describe('stopReceivingEmails() - HTTP DELETE /appeals/appealId/subscriptions/subscriptionId 200', () => {

    it('should call next() passing zero arguments', () => {

      nock(apiURL)
        .delete(`/appeals/${res.locals.token.appealId}/subscriptions/${res.locals.token.subscriptionId}`)
        .reply(HttpStatus.OK);

      return stopReceivingEmails(req, res, next)
        .then(() => {
          expect(next).to.have.been.called;
        });

    });

  });

  describe('stopReceivingEmails() - HTTP DELETE /appeals/appealId/subscriptions/subscriptionId 500', () => {

    it('should call next() passing an error containing a 500', () => {

      const error = { value: HttpStatus.INTERNAL_SERVER_ERROR, reason: 'server error' };

      nock(apiURL)
        .delete(`/appeals/${res.locals.token.appealId}/subscriptions/${res.locals.token.subscriptionId}`)
        .replyWithError(error);

      return stopReceivingEmails(req, res, next)
        .catch(() => {
          expect(next).to.have.been.calledWith(error);
        });

    });

  });

});
