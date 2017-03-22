const testServer = require('test/testServer');
const {expect,sinon} = require('test/chai-sinon');
const ErrorHandling = require('app/core/ErrorHandling');


describe('ErrorHandling', () => {
  let err, req, res, next;

  before(() => {
    err = {};
    req = null;
    res = {
      status: sinon.spy(),
      json:   sinon.spy(),
      render: sinon.spy()
    },
    next = sinon.spy();
  });

  describe('handle404', () => {
    it('should raise a 404 error', () => {
      ErrorHandling.handle404(res, req, next);

      expect(next).to.have.been.calledWithMatch({status: 404});
    })
  })

  describe('handle500', () => {
    describe('redering pages', () => {
      it('should render a 404 error page', () => {
        err.status = 404;
        ErrorHandling.handle500(err, req, res, next);

        expect(res.status).to.have.been.calledWith(404);
        expect(res.render).to.have.been.calledWith('errors/404.html');
      })

      it('should render a 500 error page', () => {
        err.status = 500;
        ErrorHandling.handle500(err, req, res, next);

        expect(res.status).to.have.been.calledWith(500);
        expect(res.render).to.have.been.calledWith('errors/500.html');
      })
    })

    describe('get status', () => {
      it('should retrieve status', () => {
        err.status = 404;
        ErrorHandling.handle500(err, req, res, next);

        expect(res.status).to.have.been.calledWith(404);
      })

      it('should retrieve statusCode', () => {
        err.statusCode = 404;
        ErrorHandling.handle500(err, req, res, next);

        expect(res.status).to.have.been.calledWith(404);
      })

      it('should retrieve responseCode', () => {
        err.responseCode = 404;
        ErrorHandling.handle500(err, req, res, next);

        expect(res.status).to.have.been.calledWith(404);
      })

      it('should default to 500', () => {
        ErrorHandling.handle500(err, req, res, next);

        expect(res.status).to.have.been.calledWith(500);
      })
    })

    describe('decorate error', () => {
      let node_env,
          tests = [
            'status', 'message', 'rawResponse', 'name', 'stack'
          ];

      before(() => {
        node_env = process.env.NODE_ENV;
        process.env.NODE_ENV = 'development';
      })

      after(() => {
        process.env.NODE_ENV = node_env;
      })

      tests.forEach(function(name) {
        it('should add ' + name, () => {
          err[name] = 'example';
          let match = {};
          match[name] = 'example';
          ErrorHandling.handle500(err, req, res, next);

          expect(res.json).to.have.been.calledWithMatch(match)
        })
      })

      it('should add fields', () => {
        err.fields = ['one', 'two']
        ErrorHandling.handle500(err, req, res, next);

        expect(res.json).to.have.been.calledWithMatch({'fields': ['one', 'two']})
      })

      it('should not add empty fields', () => {
        err.fields = []
        ErrorHandling.handle500(err, req, res, next);

        expect(res.json).not.to.have.been.calledWithMatch({'fields': []})
      })
    })
  })

});
