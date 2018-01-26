const surnameValidationCookieCheck = (req, res, next) => {
  // const surnameValidated =  req.signedCookies.surnameValidated;
  const surnameValidated =  req.cookies.surnameValidated;
  console.log(req.cookies);
  console.log(req.signedCookies);
  console.log('here1');
  console.log(surnameValidated);
  if (surnameValidated) {
    console.log('here2');
    next();
  } else {
    console.log('here3');
    const originalUrl = req.originalUrl;
    const id = req.params.id;
    res.redirect(`/validate-surname/${id}?redirect=${originalUrl}`);
  }
};

module.exports = { surnameValidationCookieCheck };
