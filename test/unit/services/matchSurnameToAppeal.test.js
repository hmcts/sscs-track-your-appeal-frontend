const { matchSurnameToAppeal } = require('app/services/matchSurnameToAppeal');
const { expect, sinon } = require('test/chai-sinon');
const nock = require('nock');
const apiURL = require('config').get('api.url');
const appInsights = require('app-insights');
const HttpStatus = require('http-status-codes');
const validateSurname = require('app/assets/locale/en').validateSurname;

describe('matchSurnameToAppeal.js', () => {
  const invalidId = 'invalidId';
  const invalidSurname = 'invalidSurname';
  const appealId = '1234';
  const originalPage = 'abouthearing';

  let req = null, res = null, next = sinon.stub();

  beforeEach(() => {
    req = {};
    res = {};
    next = sinon.stub();

    req.session = {};
    req.params = {};
    req.query = {};
    req.body = {};

    res.redirect = sinon.stub();
    res.status = sinon.stub();
    res.render = sinon.stub();
    res.locals = {};
    res.locals.appeal = {};
    res.locals.i18n = { validateSurname };
  });

  describe('matchSurnameToAppeal() - HTTP GET /appeals/id/surname/my-surname 200', () => {
    it('should redirect to /trackyourappeal/id', () => {
      req.params.id = 'md002';
      req.body.surname = 'validSurname';

      nock(apiURL)
        .get(`/appeals/${req.params.id}/surname/${req.body.surname}`)
        .reply(HttpStatus.OK, { appealId });

      return matchSurnameToAppeal(req, res, next)
        .then(() => {
          expect(res.redirect).to.have.been.calledWith(`/trackyourappeal/${req.params.id}`);
          expect(req.session).to.have.property(req.params.id).that.equals(true);
        });
    });
  });

  describe('matchSurnameToAppeal() - HTTP GET /appeals/id/surname/invalidSurname 404', () => {
    it('should set both res.status() and res.render() when the response is a 404', () => {
      const error = { status: HttpStatus.NOT_FOUND };

      req.params.id = invalidId;
      req.params.originalPage = originalPage;
      req.body.surname = invalidSurname;

      nock(apiURL)
        .get(`/appeals/${invalidId}/surname/${invalidSurname}`)
        .replyWithError(error);

      return matchSurnameToAppeal(req, res, next)
        .then(() => {
          expect(res.status).calledWith(HttpStatus.NOT_FOUND);
          expect(res.render).calledWith('validate-surname', {
            id: req.params.id,
            originalPage: req.params.originalPage,
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
          expect(req.session).to.not.have.property(req.params.id);
        });
    });
  });

  describe('matchSurnameToAppeal() - HTTP GET 500', () => {
    beforeEach(() => {
      sinon.spy(appInsights, 'trackException');
    });
    afterEach(() => {
      appInsights.trackException.restore();
    });
    it('should call next() passing an error containing a 500', () => {
      const error = { value: HttpStatus.INTERNAL_SERVER_ERROR, reason: 'server error' };

      nock(apiURL)
        .get(`/appeals/${req.params.id}/surname/${req.body.surname}`)
        .replyWithError(error);

      return matchSurnameToAppeal(req, res, next)
        .then(() => {
          expect(next).to.have.been.calledWith(error);
          expect(appInsights.trackException).to.have.been.calledOnce.calledWith(error);
          expect(req.session).to.not.have.property(req.params.id);
        });
    });
  });
});
