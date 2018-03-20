const { expect, sinon } = require('test/chai-sinon');
const { surnameValidationCookieCheck } = require('app/middleware/surnameValidationCookieCheck');

describe('surnameValidationCookieCheck.js', () => {

  const next = sinon.stub();
  const res = {
    redirect: sinon.stub()
  };
  let req;

  beforeEach(() => {
    req = {
      session: {},
      params: {
        id: 'appealId'
      }
    };
  });

  it('should call next if cookie is present', () => {
    req.session.appealId = true;
    surnameValidationCookieCheck(req, res, next);
    expect(next).to.have.been.called;
  });

  it('should redirect to /validate-surname if there is no cookie', () => {
    surnameValidationCookieCheck(req, res, next);
    expect(res.redirect).to.have.been.calledWith(`/validate-surname/${req.params.id}`);
  });

});
