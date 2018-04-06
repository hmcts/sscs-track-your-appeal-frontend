
const cookieCheck = (req, res, next) => {
  const surnameHasValidated = req.session[req.params.id];
  if (surnameHasValidated) {
    next();
  } else {
    res.redirect(`/validate-surname/${req.params.id}`);
  }
};

module.exports = { cookieCheck };
