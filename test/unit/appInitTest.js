const application = require('app');
const {expect} = require('test/chai-sinon');

describe('Application initialisation', () => {

  const app = application();

  after(() => {
    app.srv.close();
  });

  it('should define an express app that emits events', () => {
    expect(app.exp.constructor.name).to.equal('EventEmitter');
  });

  it('should define an express http.Server', () => {
    expect(app.srv.constructor.name).to.equal('Server');
  });

  it('should define a nunjucks environment', () => {
    expect(app.njk.env).to.be.defined;
  });

  it('should define context processors', () => {
    expect(app.njk.ctxProc).to.be.defined;
  });

});
