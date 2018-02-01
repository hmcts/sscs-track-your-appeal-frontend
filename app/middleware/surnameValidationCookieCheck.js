const surnameValidationCookieCheck = (req, res, next) => {
  req.session.surnameHasValidated ? next() : res.redirect(`/validate-surname/${req.params.id}`);
};

module.exports = { surnameValidationCookieCheck };
