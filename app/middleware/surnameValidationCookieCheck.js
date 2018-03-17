
const surnameValidationCookieCheck = (req, res, next) => {

  const surnameHasValidated = req.session[req.params.id];

  surnameHasValidated ? next() : res.redirect(`/validate-surname/${req.params.id}`);
};

module.exports = { surnameValidationCookieCheck };
