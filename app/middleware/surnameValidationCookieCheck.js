const surnameValidationCookieCheck = (req, res, next) => {
  const surnameValidated = req.session.validatedSurname;
  if (surnameValidated) {
    next();
  } else {
    const originalUrl = req.originalUrl;
    const id = req.params.id;
    res.redirect(`/validate-surname/${id}?redirect=${originalUrl}`);
  }
};

module.exports = { surnameValidationCookieCheck };
