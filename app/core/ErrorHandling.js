const HttpStatus = require('http-status-codes');
const logger = require('nodejs-logging').getLogger('ErrorHandler.js');

class ErrorHandler {

  static handle404(req, res, next) {
    const err = new Error(HttpStatus.getStatusText(HttpStatus.NOT_FOUND));
    err.status = HttpStatus.NOT_FOUND;
    next(err);
  }

  static handleError(err, req, res, next) {
    const status = ErrorHandler.getStatus(err);
    res.status(status);
    res.render(status === HttpStatus.NOT_FOUND ? 'errors/404.html' : 'errors/500.html');
    logger.error(err);
  }

  static handleErrorDuringDevelopment(err, req, res, next) {
    const status = ErrorHandler.getStatus(err);
    res.status(status);
    const error = {
      message: err.message,
      status: status,
      stack: err.stack.split('\n')
    };
    res.send(error);
    logger.error(error);
  }

  static getStatus(err) {
    return err.status || err.statusCode || err.responseCode || HttpStatus.INTERNAL_SERVER_ERROR;
  }
}

module.exports = ErrorHandler;
