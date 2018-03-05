const { matchSurnameToAppeal } = require('app/services/matchSurnameToAppeal');
const {expect, sinon} = require('test/chai-sinon');
const nock = require('nock');
const apiURL = require('config').get('api.url');
const HttpStatus = require('http-status-codes');
const validateSurname = require('app/assets/locale/en').validateSurname;

describe('matchSurnameToAppeal.js', () => {

  const invalidId = 'invalidId';
  const invalidSurname = 'invalidSurname';
  const appealId = '1234';

  let req, res, next;

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

  describe('matchSurnameToAppeal() - HTTP GET /appeals/id/surname/my-surname 200', ()=> {

    it('should redirect to /trackyourappeal/id', () => {

      req.params.id = 'md002';
      req.body.surname = 'validSurname';

      nock(apiURL)
        .get(`/appeals/${req.params.id}/surname/${req.body.surname}`)
        .reply(HttpStatus.OK, { appealId });

      return matchSurnameToAppeal(req, res, next)
        .then(() => {
          expect(res.redirect).to.have.been.calledWith(`/trackyourappeal/${req.params.id}`);
        });

    });

  });

  describe('matchSurnameToAppeal() - HTTP GET /appeals/id/surname/invalidSurname 400', ()=> {

    it('should set both res.status() and res.render() when the response is a 400', () => {

      const error = { statusCode: HttpStatus.BAD_REQUEST };

      req.params.id = invalidId;
      req.body.surname = invalidSurname;

      nock(apiURL)
        .get(`/appeals/${invalidId}/surname/${invalidSurname}`)
        .replyWithError(error);

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

    it('should call next() passing an error containing a 500', () => {

      const error = { value: HttpStatus.INTERNAL_SERVER_ERROR, reason: 'server error' };

      nock(apiURL)
        .get(`/appeals/${invalidId}/surname/${invalidSurname}`)
        .replyWithError(error);

      return matchSurnameToAppeal(req, res, next)
        .catch(() => {
          expect(next).to.have.been.calledWith(error);
        });

    });

  });

});
