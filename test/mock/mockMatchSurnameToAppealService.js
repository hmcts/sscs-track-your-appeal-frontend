const mockedData = require('test/mock/data/index');
const { map, includes } = require('lodash');

const matchSurnameToAppeal = (req, res, next) => {

  const flattenData = map(mockedData, 'appeal');
  const mockedDataSurname = map(flattenData, 'surname');
  const id = req.params.id;
  const surname = req.body.surname;
  const originalUrl = req.query.redirect;

  if (includes(mockedDataSurname, surname)) {
    req.session.validatedSurname = true;
    res.redirect(originalUrl);
  } else {
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
    next();
  }
};

module.exports = { matchSurnameToAppeal };
