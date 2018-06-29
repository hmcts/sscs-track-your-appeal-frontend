const { expect, sinon } = require('test/chai-sinon');
const { cookieCheck } = require('app/middleware/cookieCheck');

describe('cookieCheck.js', () => {
  const next = sinon.stub();
  const res = { redirect: sinon.stub() };
  let req = null;

  beforeEach(() => {
    req = {
      session: {},
      params: { id: 'appealId' },
      originalUrl: '/abouthearing/appealId'
    };
  });

  it('should call next if cookie is present', () => {
    req.session.appealId = true;
    cookieCheck(req, res, next);
    return expect(next).to.have.been.called;
  });

  it('should redirect to /validate-surname if there is no cookie', () => {
    cookieCheck(req, res, next);
    return expect(res.redirect).to.have.been.calledWith(`/validate-surname/${req.params.id}/abouthearing`);
  });
});
