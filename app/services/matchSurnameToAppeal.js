const request = require('superagent');
const api = require('config').get('api.url');
const HttpStatus = require('http-status-codes');

const matchSurnameToAppeal = (req, res, next) => {

  const id = req.params.id;
  const surname = req.body.surname;

  return request.get(`${api}/appeals/${id}/surname/${surname}`)
    .then(() => {
      req.session[id] = true;
      res.redirect(`/trackyourappeal/${id}`);
    })
    .catch(error => {
      if (error.statusCode === HttpStatus.NOT_FOUND) {
        res.status(HttpStatus.NOT_FOUND);
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
