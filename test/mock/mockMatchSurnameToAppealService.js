const matchSurnameToAppeal = (req, res) => {

  console.log('meow');
  const mactoken = req.params.mactoken;
  const surname = req.body.surname;
  const appealSurname = 'meow';

  if (surname === appealSurname) {
    const id = 'md001';
    res.redirect(`/progress/${id}/trackyourappeal`);
  } else {
    const fields = {
      error: true,
      surname: {
        error: true,
        errorMessage: res.locals.i18n.validateSurname.surname.errors.noMatch,
        errorHeading: res.locals.i18n.validateSurname.surname.errors.noMatch
      }
    };
    res.render('validate-surname', { mactoken, fields });
  }
};

module.exports = { matchSurnameToAppeal };
