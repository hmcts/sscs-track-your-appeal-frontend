const HttpStatus = require('http-status-codes');
const logger = require('nodejs-logging').getLogger('ErrorHandler.js');

class ErrorHandler {

  static handle404(req, res, next) {
    const err = new Error(`Page Not Found - ${req.originalUrl}`);
    err.status = HttpStatus.NOT_FOUND;
    next(err);
  }

  static handleError(err, req, res, next) {
    const status = ErrorHandler.getStatus(err);
    res.status(status);
    res.render(status === HttpStatus.NOT_FOUND ? 'errors/404.html' : 'errors/500.html');
    logger.error(ErrorHandler.reformatError(err));
  }

  static handleErrorDuringDevelopment(err, req, res, next) {
    const status = ErrorHandler.getStatus(err);
    res.status(status);
    err = ErrorHandler.reformatError(err);
    res.send(err);
    logger.error(err);
  }

  static getStatus(err) {
    return err.status || err.statusCode || err.responseCode || HttpStatus.INTERNAL_SERVER_ERROR;
  }

  static reformatError(err) {
    const error = {
      responseCode: err.status,
      message: err.message
    };

    if(err.stack) {
      error.stackTrace = err.stack.split('\n');
      error.stackTrace = error.stackTrace.map((stackLine) => {
        return stackLine.trim()
      });
    }

    return error;
  }
}

module.exports = ErrorHandler;
