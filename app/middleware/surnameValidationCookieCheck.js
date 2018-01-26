const surnameValidationCookieCheck = (req, res, next) => {
  const surnameValidated =  req.cookies.surnameValidated;
  // const surnameValidated =  req.signedCookies.surnameValidated;
  if (surnameValidated) {
    next();
  } else {
    const originalUrl = req.originalUrl;
    const id = req.params.id;
    res.redirect(`/validate-surname/${id}?redirect=${originalUrl}`);
  }
};

module.exports = { surnameValidationCookieCheck };
