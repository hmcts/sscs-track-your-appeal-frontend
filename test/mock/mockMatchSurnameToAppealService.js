const mockedData = require('test/mock/data/index');
const HttpStatus = require('http-status-codes');

const getMockedAppeal = appealNumber => {
  const mockedAppeal = mockedData[appealNumber];

  if (!mockedAppeal) {
    throw new ReferenceError(`Unknown mocked appeal number '${appealNumber}'`);
  }

  return mockedAppeal.appeal;
};

const matchSurnameToAppeal = (req, res) => {
  const mockedAppeal = getMockedAppeal(req.params.id);
  const id = req.params.id;
  const surname = req.body.surname;

  if (mockedAppeal.surname.toLowerCase() === surname.toLowerCase()) {
    req.session[id] = true;
    res.redirect(`/trackyourappeal/${id}`);
  } else {
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
  }
};

module.exports = { matchSurnameToAppeal, getMockedAppeal };
