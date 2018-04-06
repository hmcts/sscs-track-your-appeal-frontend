const HttpStatus = require('http-status-codes');
const { Logger } = require('@hmcts/nodejs-logging');

const logger = Logger.getLogger('ErrorHandling.js');

class ErrorHandling {
  static handle404(req, res, next) {
    const error = new Error(`Page Not Found - ${req.originalUrl}`);
    error.status = HttpStatus.NOT_FOUND;
    next(error);
  }

  static handleError(error, req, res) {
    const status = ErrorHandling.getStatus(error);
    res.status(status);
    res.render(status === HttpStatus.NOT_FOUND ? 'errors/404.html' : 'errors/500.html');
    logger.error(ErrorHandling.reformatError(error));
  }

  static handleErrorDuringDevelopment(error, req, res) {
    const status = ErrorHandling.getStatus(error);
    res.status(status);
    const reformatedError = ErrorHandling.reformatError(error);
    res.send(reformatedError);
    logger.error(reformatedError);
  }

  static getStatus(error) {
    return error.status ||
           error.statusCode ||
           error.responseCode ||
           HttpStatus.INTERNAL_SERVER_ERROR;
  }

  static reformatError(error) {
    const refErr = {
      responseCode: error.status,
      message: error.message
    };

    if (error.stack) {
      refErr.stackTrace = error.stack.split('\n');
      refErr.stackTrace = refErr.stackTrace.map(stackLine => {
        return stackLine.trim();
      });
    }

    return refErr;
  }
}

module.exports = ErrorHandling;
