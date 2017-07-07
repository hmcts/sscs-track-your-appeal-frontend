const {expect, sinon} = require('test/chai-sinon');
const HttpStatus = require('http-status-codes');
const mockery = require('mockery');

describe('ErrorHandler.js', () => {

  const logger = {
    error: sinon.spy()
  };

  const mockLogger = class Logger {
    static getLogger(name) {
      return logger;
    }
  };

  let err, req, res, next, ErrorHandler, reformattedError;

  before(() => {

    req = {};
    res = {
      status: sinon.spy(),
      render: sinon.spy(),
      send: sinon.spy()
    };
    next = sinon.spy();

    mockery.registerMock('nodejs-logging', mockLogger);
    mockery.enable({
      useCleanCache: true,
      warnOnReplace: false,
      warnOnUnregistered: false
    });

    // Require the class under test.
    ErrorHandler = require('app/core/ErrorHandling');

  });

  after(() => {
    mockery.disable();
    mockery.deregisterAll();
  });

  beforeEach(()=> {

    err = {
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
      ErrorHandler.handle404(req, res, next);
      expect(next).to.have.been.calledWithMatch({ message: `Page Not Found - ${req.originalUrl}`});
    })

  });

  describe('handleError()', () => {

    it('should render a 404 error page and log it', () => {
      err.status = reformattedError.responseCode = HttpStatus.NOT_FOUND;
      ErrorHandler.handleError(err, req, res, next);
      expect(res.status).to.have.been.calledWith(HttpStatus.NOT_FOUND);
      expect(res.render).to.have.been.calledWith('errors/404.html');
      expect(logger.error).to.have.been.calledWith(reformattedError);
    });

    it('should render a 500 error page and log it', () => {
      err.status = reformattedError.responseCode = HttpStatus.INTERNAL_SERVER_ERROR;
      ErrorHandler.handleError(err, req, res, next);
      expect(res.status).to.have.been.calledWith(HttpStatus.INTERNAL_SERVER_ERROR);
      expect(res.render).to.have.been.calledWith('errors/500.html');
      expect(logger.error).to.have.been.calledWith(reformattedError);
    });

  });

  describe('handleErrorDuringDevelopment()', () => {

    it('should send a json error message', () => {
      err.status = reformattedError.responseCode = HttpStatus.NOT_FOUND;
      ErrorHandler.handleErrorDuringDevelopment(err, req, res, next);
      expect(res.status).to.have.been.calledWith(HttpStatus.NOT_FOUND);
      expect(res.send).to.have.been.calledWith(reformattedError);
      expect(logger.error).to.have.been.calledWith(reformattedError);
    });

  });

  describe('getStatus()', () => {

    it('should retrieve status', () => {
      err.status = HttpStatus.NOT_FOUND;
      ErrorHandler.handleError(err, req, res, next);
      expect(res.status).to.have.been.calledWith(HttpStatus.NOT_FOUND);
    });

    it('should retrieve statusCode', () => {
      err.statusCode = HttpStatus.NOT_FOUND;
      ErrorHandler.handleError(err, req, res, next);
      expect(res.status).to.have.been.calledWith(HttpStatus.NOT_FOUND);
    });

    it('should retrieve responseCode', () => {
      err.responseCode = HttpStatus.NOT_FOUND;
      ErrorHandler.handleError(err, req, res, next);
      expect(res.status).to.have.been.calledWith(HttpStatus.NOT_FOUND);
    });

    it('should default to 500 when status is undefined', () => {
      ErrorHandler.handleError(err, req, res, next);
      expect(res.status).to.have.been.calledWith(HttpStatus.INTERNAL_SERVER_ERROR);
    });

  });

});
