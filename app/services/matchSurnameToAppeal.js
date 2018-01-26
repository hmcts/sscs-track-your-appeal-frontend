const request = require('superagent');
const { appealsAPI } = require('app/config');
const HttpStatus = require('http-status-codes');

const matchSurnameToAppeal = (req, res, next) => {

  const id = req.params.id;
  const surname = req.body.surname;
  const originalUrl = req.query.redirect;

  return request.get(`${appealsAPI}/validate/${id}/${surname}`)
    .then(result => {
      res.cookie('surnameValidated', true, {
        httpOnly: true,
        maxAge: 90000,
        // secure: true,
        signed: true
      });
      res.redirect(originalUrl);
    })
    .catch(error => {
      if (error.statusCode === HttpStatus.BAD_REQUEST && error.rawResponse === `Invalid surname provided: ${surname}`) {
        const fields = {
          error: true,
          surname: {
            value: surname,
            error: true,
            errorMessage: res.locals.i18n.validateSurname.surname.errors.noMatch,
            errorHeading: res.locals.i18n.validateSurname.surname.errors.noMatch
          }
        };
        res.locals.id = id;
        res.locals.fields = fields;
        res.locals.originalUrl = originalUrl;
        next();
      } else {
        next(error);
      }
    });

};

module.exports = { matchSurnameToAppeal };
