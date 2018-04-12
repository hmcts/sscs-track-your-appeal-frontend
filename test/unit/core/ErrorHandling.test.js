const { expect, sinon } = require('test/chai-sinon');
const HttpStatus = require('http-status-codes');
const proxyquire = require('proxyquire');

describe('ErrorHandling.js', () => {
  const logger = { error: sinon.spy() };

  let error = null, req = null, res = null, next = null;
  let ErrorHandling = null, reformattedError = null;

  before(() => {
    req = {};
    res = {
      status: sinon.spy(),
      render: sinon.spy(),
      send: sinon.spy()
    };
    next = sinon.spy();

    ErrorHandling = proxyquire('app/core/ErrorHandling', {
      '@hmcts/nodejs-logging': {
        Logger: {
          getLogger: () => {
            return logger;
          }
        }
      }
    });
  });

  beforeEach(() => {
    error = {
      message: 'An error message',
      stack: '  a  \n  stack  \n  trace  '
    };

    reformattedError = {
      message: 'An error message',
      stackTrace: ['a', 'stack', 'trace']
    };
  });

  describe('handle404()', () => {
    it('should raise a 404 error', () => {
      req.originalUrl = '/path/not/found';
      ErrorHandling.handle404(req, res, next);
      expect(next).to.have.been.calledWithMatch({ message: `Page Not Found - ${req.originalUrl}` });
    });
  });

  describe('handleError()', () => {
    it('should render a 404 error page', () => {
      error.status = HttpStatus.NOT_FOUND;
      reformattedError.responseCode = HttpStatus.NOT_FOUND;
      ErrorHandling.handleError(error, req, res, next);
      expect(res.status).to.have.been.calledWith(HttpStatus.NOT_FOUND);
      expect(res.render).to.have.been.calledWith('errors/404.html');
    });

    it('should render a 500 error page', () => {
      error.status = HttpStatus.INTERNAL_SERVER_ERROR;
      reformattedError.responseCode = HttpStatus.INTERNAL_SERVER_ERROR;
      ErrorHandling.handleError(error, req, res, next);
      expect(res.status).to.have.been.calledWith(HttpStatus.INTERNAL_SERVER_ERROR);
      expect(res.render).to.have.been.calledWith('errors/500.html');
    });
  });

  describe('getStatus()', () => {
    it('should retrieve status', () => {
      error.status = HttpStatus.NOT_FOUND;
      ErrorHandling.handleError(error, req, res, next);
      expect(res.status).to.have.been.calledWith(HttpStatus.NOT_FOUND);
    });

    it('should retrieve statusCode', () => {
      error.statusCode = HttpStatus.NOT_FOUND;
      ErrorHandling.handleError(error, req, res, next);
      expect(res.status).to.have.been.calledWith(HttpStatus.NOT_FOUND);
    });

    it('should retrieve responseCode', () => {
      error.responseCode = HttpStatus.NOT_FOUND;
      ErrorHandling.handleError(error, req, res, next);
      expect(res.status).to.have.been.calledWith(HttpStatus.NOT_FOUND);
    });

    it('should default to 500 when status is undefined', () => {
      ErrorHandling.handleError(error, req, res, next);
      expect(res.status).to.have.been.calledWith(HttpStatus.INTERNAL_SERVER_ERROR);
    });
  });
});
