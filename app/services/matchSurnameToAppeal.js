const request = require('superagent');
const apiUrl = require('config').get('api.url');
const appInsights = require('app-insights');
const HttpStatus = require('http-status-codes');
const { tya } = require('paths');

const matchSurnameToAppeal = (req, res, next) => {
  const id = req.params.id;
  const originalPage = req.params.originalPage;
  const surname = req.body.surname;

  return request.get(`${apiUrl}/appeals/${id}/surname/${surname}`)
    .then(() => {
      req.session[id] = true;
      const pageExists = Object.values(tya).includes(`/${originalPage}`);
      const page = pageExists ? `/${originalPage}` : tya.trackYourAppeal;
      res.redirect(`${page}/${id}`);
    })
    .catch(error => {
      if (error.status === HttpStatus.NOT_FOUND) {
        res.status(HttpStatus.NOT_FOUND);
        res.render('validate-surname', {
          id,
          originalPage,
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
        appInsights.trackException(error);
        next(error);
      }
    });
};

module.exports = { matchSurnameToAppeal };
