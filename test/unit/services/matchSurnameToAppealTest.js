const { matchSurnameToAppeal } = require('app/services/matchSurnameToAppeal');
const {expect, sinon} = require('test/chai-sinon');
const nock = require('nock');
const { appealsAPI } = require('app/config');
const { fail } = require('assert');
const HttpStatus = require('http-status-codes');
const validateSurname = require('app/assets/locale/en').validateSurname;

describe('matchSurnameToAppeal.js', () => {

  const invalidmactoken = 'invalidToken';
  const invalidSurname = 'invalidSurname';
  const appealId = '1234';
  const errorFields = {
    error: true,
    surname: {
      value: invalidSurname,
      error: true,
      errorMessage: validateSurname.surname.errors.noMatch,
      errorHeading: validateSurname.surname.errors.noMatch
    }
  };
  let req, res, next, api;

  beforeEach(() => {
    req = {
      params: {},
      body: {}
    };
    res = {
      redirect: sinon.stub(),
      locals: {
        appeal: {},
        i18n: {
          validateSurname
        }
      }
    };
    next = sinon.stub();
  });

  afterEach(() => {
    api.isDone();
  });

  describe('get request to api is successful', ()=> {

    it('should call res.redirect', () => {
      req.params.mactoken = 'validToken';
      req.body.surname = 'validSurname';
      api = nock(appealsAPI)
        .get(`/validate/${req.params.mactoken}/${req.body.surname}`)
        .reply(200, { appealId });

      return matchSurnameToAppeal(req, res, next)
        .then(() => {
          expect(res.redirect).to.have.been.calledWith(`/progress/${appealId}/trackyourappeal`);
        });

    });

  });

  describe('get request to api is unsuccessful', ()=> {

    const requestError = errResponse => {
      return nock(appealsAPI)
        .get(`/validate/${invalidmactoken}/${invalidSurname}`)
        .replyWithError(errResponse);
    };

    beforeEach(() => {
      req.params.mactoken = invalidmactoken;
      req.body.surname = invalidSurname;
    });

    it('should set locals and call next when code is 404', () => {
      const error = { statusCode: HttpStatus.BAD_REQUEST, rawResponse: `Invalid surname provided: ${invalidSurname}` };
      api = requestError(error);

      return matchSurnameToAppeal(req, res, next)
        .then(() => {
          fail('Should return an error');
        })
        .catch(() => {
          expect(res.locals.mactoken).to.equal(invalidmactoken);
          expect(res.locals.fields).to.eql(errorFields);
          expect(next).to.have.been.called;
        });

    });

    it('should call next', () => {
      const error = { value: 500, reason: 'server error' }
      api = requestError(error);

      return matchSurnameToAppeal(req, res, next)
        .then(() => {
          fail('Should return an error');
        })
        .catch(() => {
          expect(next).to.have.been.calledWith(error);
        });

    });

  });

});
