
const cookieCheck = (req, res, next) => {
  const surnameHasValidated = req.session[req.params.id];
  if (surnameHasValidated) {
    next();
  } else {
    const originalPage = req.originalUrl.split('/')[1];
    res.redirect(`/validate-surname/${req.params.id}/${originalPage}`);
  }
};

module.exports = { cookieCheck };
