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

  let err, req, res, next, ErrorHandler;

  before(() => {
    err = {};
    req = null;
    res = {
      status: sinon.spy(),
      json: sinon.spy(),
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

  describe('handle404()', () => {

    it('should raise a 404 error', () => {
      ErrorHandler.handle404(res, req, next);
      expect(next).to.have.been.calledWithMatch({status: HttpStatus.NOT_FOUND});
    })

  });

  describe('handleError()', () => {

    it('should render a 404 error page', () => {
      err.status = HttpStatus.NOT_FOUND;
      ErrorHandler.handleError(err, req, res, next);
      expect(res.status).to.have.been.calledWith(HttpStatus.NOT_FOUND);
      expect(res.render).to.have.been.calledWith('errors/404.html');
    });

    it('should render a 500 error page', () => {
      err.status = HttpStatus.INTERNAL_SERVER_ERROR;
      ErrorHandler.handleError(err, req, res, next);
      expect(res.status).to.have.been.calledWith(HttpStatus.INTERNAL_SERVER_ERROR);
      expect(res.render).to.have.been.calledWith('errors/500.html');
    });

    it('should log the error', () => {
      err.status = HttpStatus.INTERNAL_SERVER_ERROR;
      ErrorHandler.handleError(err, req, res, next);
      expect(logger.error).to.have.been.calledWith({ status: HttpStatus.INTERNAL_SERVER_ERROR });
    });

  });

  describe('handleErrorDuringDevelopment()', () => {

    const expectedError = {
      status: HttpStatus.NOT_FOUND,
      message: 'An error message',
      stack: ['a', 'stack', 'trace']
    };

    it('should send a json error message', () => {
      err.status = HttpStatus.NOT_FOUND;
      err.message = 'An error message';
      err.stack = 'a\nstack\ntrace';
      ErrorHandler.handleErrorDuringDevelopment(err, req, res, next);
      expect(res.status).to.have.been.calledWith(HttpStatus.NOT_FOUND);
      expect(res.send).to.have.been.calledWith(expectedError);
      expect(logger.error).to.have.been.calledWith(expectedError);
    });

    it('should log the error', () => {
      err.status = HttpStatus.NOT_FOUND;
      ErrorHandler.handleErrorDuringDevelopment(err, req, res, next);
      expect(logger.error).to.have.been.calledWith(err);
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

    it('should default to 500', () => {
      err.status = undefined;
      err.statusCode = undefined;
      err.responseCode = undefined;
      ErrorHandler.handleError(err, req, res, next);
      expect(res.status).to.have.been.calledWith(HttpStatus.INTERNAL_SERVER_ERROR);
    });

  });

});
