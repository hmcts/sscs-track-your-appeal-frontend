const mockedData = require('test/mock/data/index');
const HttpStatus = require('http-status-codes');
const { tya } = require('paths');

const getMockedAppeal = appealNumber => {
  const mockedAppeal = mockedData[appealNumber];

  console.log(mockedAppeal);

  if (!mockedAppeal) {
    console.log('error')
    throw new ReferenceError(`Unknown mocked appeal number '${appealNumber}'`);
  }

  return mockedAppeal.appeal;
};

const matchSurnameToAppeal = (req, res) => {
  console.log('chicken')
  const mockedAppeal = getMockedAppeal(req.params.id);
  const id = req.params.id;
  const originalPage = req.params.originalPage || 'trackyourappeal';
  const surname = req.body.surname;

  console.log('eggs');

  if (mockedAppeal.surname.toLowerCase() === surname.toLowerCase()) {
    console.log('meow')
    req.session[id] = true;
    const pageExists = Object.values(tya).includes(`/${originalPage}`);
    const page = pageExists ? `/${originalPage}` : tya.trackYourAppeal;
    res.redirect(`${page}/${id}`);
  } else {
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
  }
};

module.exports = { matchSurnameToAppeal, getMockedAppeal };
