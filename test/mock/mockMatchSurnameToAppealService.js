const mockedData = require('test/mock/data/index');
const { map, find, includes } = require('lodash');

const matchSurnameToAppeal = (req, res) => {

  const flattenData = map(mockedData, 'appeal');
  const mockedDataSurname = map(flattenData, 'surname');
  const mactoken = req.params.mactoken;
  const surname = req.body.surname;

  if (includes(mockedDataSurname, surname)) {
    const appeal = find(flattenData, { surname });
    const id = appeal.appealNumber;
    res.redirect(`/progress/${id}/trackyourappeal`);
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
    res.render('validate-surname', { mactoken, fields });
  }
};

module.exports = { matchSurnameToAppeal };
