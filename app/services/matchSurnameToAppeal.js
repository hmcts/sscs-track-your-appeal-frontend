const request = require('superagent');
const { appealsAPI } = require('app/config');
const HttpStatus = require('http-status-codes');

const matchSurnameToAppeal = (req, res, next) => {

  const id = req.params.id;
  const surname = req.body.surname;

  return request.get(`${appealsAPI}/validate/${id}/${surname}`)
    .then(() => {
      req.session.surnameHasValidated = true;
      res.redirect(`/progress/${id}/trackyourappeal`);
    })
    .catch(error => {
      req.session.surnameHasValidated = false;
      if (error.statusCode === HttpStatus.BAD_REQUEST) {
        res.status(HttpStatus.BAD_REQUEST);
        res.render('validate-surname', {
          id,
          fields: {
            error: true,
            surname: {
              value: surname,
              error: true,
              errorMessage: res.locals.i18n.validateSurname.surname.errors.noMatch,
              errorHeading: res.locals.i18n.validateSurname.surname.errors.noMatch
            }
          }
        });
      } else {
        next(error);
      }
    });

};

module.exports = { matchSurnameToAppeal };
