const request = require('superagent');
const apiUrl = require('config').get('api.url');
const appInsights = require('app-insights');
const HttpStatus = require('http-status-codes');
const { tya } = require('paths');
const { Logger } = require('@hmcts/nodejs-logging');

const logger = Logger.getLogger('matchSurnameToAppeal.js');

const matchSurnameToAppeal = (req, res, next) => {
  const id = req.params.id;
  const originalPage = req.params.originalPage;
  const surname = req.body.surname;

  return request.get(`${apiUrl}/appeals/${id}/surname/${surname}`)
    .then(result => {
      req.session[id] = true;
      const pageExists = Object.values(tya).includes(`/${originalPage}`);
      const page = pageExists ? `/${originalPage}` : tya.trackYourAppeal;
      if (surname !== null && typeof surname !== 'undefined') {
        const caseId = result.body.caseId;
        const surnameRedacted = surname.substr(0, 1);
        logger.info(`POST /appeals/${id}/surname/${surnameRedacted}[REDACTED] ${HttpStatus.OK} for caseId ${caseId}`);
      }
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
