const nock = require('nock');
const HttpStatus = require('http-status-codes');
const { getAppeal, changeEmailAddress, stopReceivingEmails } = require('app/services/appealService');
const { expect, sinon } = require('test/chai-sinon');
const { appealsAPI } = require('app/config');
const { appeal } = require('test/mock/data/appealReceived');

describe('appealService.js', () => {

  const invalidId = 'invalidId';
  let req, res, next, api;

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

  afterEach(() => {
    api.isDone();
    res.locals.appeal = {};
  });

  describe('getAppeal', () => {

    describe('get request to api is successful', () => {

      it('should call next', () => {

        req.params.id = appeal.appealNumber;

        api = nock(appealsAPI)
          .get(`/${req.params.id}`)
          .reply(200, { appeal });

        return getAppeal(req, res, next)
          .then(() => {
            appeal.evidenceReceived = false;
            appeal.historicalEvents = [];
            expect(res.locals.appeal).to.eql(appeal);
            expect(next).to.have.been.called;
          });

      });

    });

    describe('get request to api is unsuccessful', () => {

      const requestError = errResponse => {
        return nock(appealsAPI)
          .get(`/${invalidId}`)
          .replyWithError(errResponse);
      };

      it('should call next with the error from api when code is not 404', () => {

        const error = { value: 500, reason: 'server error' };
        api = requestError(error);
        req.params.id = appeal.appealNumber;

        return getAppeal(req, res, next)
          .catch(() => {
            expect(next).to.have.been.calledWith(error);
          });

      });

      it('should next with the error when code is 404', () => {

        const error = { status: HttpStatus.NOT_FOUND };
        api = requestError(error);
        req.params.id = appeal.appealNumber;

        return getAppeal(req, res, next)
          .catch(() => {
            expect(next).to.have.been.calledWith(error);
          });

      });

    });

  });

  describe('changeEmailAddress', () => {

    describe('post request to api is successful', () => {

      it('should call next', () => {

        api = nock(appealsAPI)
          .post(`/${res.locals.token.appealId}/subscriptions/${res.locals.token.subscriptionId}`, {
            subscription: { email: req.body.email }
          })
          .reply(200);

        return changeEmailAddress(req, res, next)
          .then(() => {
            expect(next).to.have.been.called;
          });

      });

    });

    describe('post request to api is unsuccessful', () => {

      it('should call next with the error', () => {

        const error = { value: 500, reason: 'server error' };

        api = nock(appealsAPI)
          .post(`/${res.locals.token.appealId}/subscriptions/${res.locals.token.subscriptionId}`, {
            subscription: { email: req.body.email }
          })
          .replyWithError(error);

        return changeEmailAddress(req, res, next)
          .catch(() => {
            expect(next).to.have.been.calledWith(error);
          });

      });

    });

  });

  describe('stopReceivingEmails', () => {

    describe('delete request to api is successful', () => {

      it('should call next', () => {

        api = nock(appealsAPI)
          .delete(`/${res.locals.token.appealId}/subscriptions/${res.locals.token.subscriptionId}`)
          .reply(200);

        return stopReceivingEmails(req, res, next)
          .then(() => {
            expect(next).to.have.been.called;
          });

      });

    });

    describe('post request to api is unsuccessful', () => {

      it('should call next with the error', () => {

        const error = { value: 500, reason: 'server error' };

        api = nock(appealsAPI)
          .delete(`/${res.locals.token.appealId}/subscriptions/${res.locals.token.subscriptionId}`)
          .replyWithError(error);

        return stopReceivingEmails(req, res, next)
          .catch(() => {
            expect(next).to.have.been.calledWith(error);
          });

      });

    });

  });

});
