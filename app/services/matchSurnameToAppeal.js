const request = require('superagent');
const { appealsAPI } = require('app/config');
const HttpStatus = require('http-status-codes');

const matchSurnameToAppeal = (req, res, next) => {

  const mactoken = req.params.mactoken;
  const surname = req.body.surname;

  return request.get(`${appealsAPI}/validate/${mactoken}/${surname}`)
    .then(result => {
      const appealId = result.body.appealId;
      res.redirect(`/progress/${appealId}/trackyourappeal`);
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
        res.locals.mactoken = mactoken;
        res.locals.fields = fields;
        next();
      } else {
        next(error);
      }
    });

};

module.exports = { matchSurnameToAppeal };
