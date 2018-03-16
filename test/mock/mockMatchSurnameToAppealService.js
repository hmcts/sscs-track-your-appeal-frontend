const mockedData = require('test/mock/data/index');
const HttpStatus = require('http-status-codes');

const matchSurnameToAppeal = (req, res) => {

  const mockedAppeal = mockedData[req.params.id].appeal;
  const id = req.params.id;
  const surname = req.body.surname;
  const surnameHasValidated = mockedAppeal.surname.toLowerCase() === surname.toLowerCase();

  if (surnameHasValidated) {
    req.session.surnameHasValidated = true;
    res.redirect(`/trackyourappeal/${id}`);
  } else {
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
  }
};

module.exports = { matchSurnameToAppeal };
