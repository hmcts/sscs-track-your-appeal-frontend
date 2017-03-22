'use strict'
const locale = require('app/assets/locale/en');

class ErrorHandling {

  static handle404(req, res, next) {
    let err = new Error('Not found');
    err.status = 404;
    next(err);
  }

  static handle500(err, req, res, next) {
    const status = ErrorHandling._getStatus(err);

    res.status(status);

    if (process.env.NODE_ENV == 'development') {
      res.json(ErrorHandling._decorateError(status, err));
    } else if(status == 404) {
      res.render('errors/404.html', {i18n: locale});
    } else {
      res.render('errors/500.html', {i18n: locale});
    }
  }

  static _decorateError(status, err) {
    let error = {};

    ['status', 'message', 'rawResponse', 'name', 'stack'].forEach(name => {
      if (err[name]) {
        error[name] = err[name];
      }
    })

    if(err.fields && err.fields.length) {
      error.fields = err.fields;
    }

    return error;
  }

  static _getStatus(err) {
    return err.status || err.statusCode || err.responseCode || 500;
  }
}

module.exports = ErrorHandling
