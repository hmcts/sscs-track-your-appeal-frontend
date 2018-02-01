const { matchSurnameToAppeal } = require('app/services/matchSurnameToAppeal');
const {expect, sinon} = require('test/chai-sinon');
const nock = require('nock');
const { appealsAPI } = require('app/config');
const HttpStatus = require('http-status-codes');
const validateSurname = require('app/assets/locale/en').validateSurname;

describe('matchSurnameToAppeal.js', () => {

  const invalidId = 'invalidId';
  const invalidSurname = 'invalidSurname';
  const appealId = '1234';

  let req, res, next, api;

  beforeEach(() => {

    req = {
      session: {},
      params: {},
      query: {},
      body: {}
    };

    res = {
      redirect: sinon.stub(),
      status: sinon.stub(),
      render: sinon.stub(),
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
      req.params.id = 'md002';
      req.body.surname = 'validSurname';
      api = nock(appealsAPI)
        .get(`/validate/${req.params.id}/${req.body.surname}`)
        .reply(200, { appealId });

      return matchSurnameToAppeal(req, res, next)
        .then(() => {
          expect(res.redirect).to.have.been.calledWith(`/progress/${req.params.id}/trackyourappeal`);
        });

    });

  });

  describe('get request to api is unsuccessful', ()=> {

    const requestError = errResponse => {
      return nock(appealsAPI)
        .get(`/validate/${invalidId}/${invalidSurname}`)
        .replyWithError(errResponse);
    };

    beforeEach(() => {
      req.params.id = invalidId;
      req.body.surname = invalidSurname;
    });

    it('should set locals and call next when code is 404', () => {
      const error = { statusCode: HttpStatus.BAD_REQUEST };
      api = requestError(error);

      return matchSurnameToAppeal(req, res, next)
        .then(() => {
          expect(res.status).calledWith(HttpStatus.BAD_REQUEST);
          expect(res.render).calledWith('validate-surname', {
            id: req.params.id,
            fields: {
              error: true,
              surname: {
                value: invalidSurname,
                error: true,
                errorMessage: validateSurname.surname.errors.noMatch,
                errorHeading: validateSurname.surname.errors.noMatch
              }
            }
          });

        });

    });

    it('should call next', () => {
      const error = { value: 500, reason: 'server error' };
      api = requestError(error);

      return matchSurnameToAppeal(req, res, next)
        .catch(() => {
          expect(next).to.have.been.calledWith(error);
        });

    });

  });

});
