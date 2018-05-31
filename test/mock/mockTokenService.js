const validateToken = (req, res, next) => {
  if (req.params.mactoken === 'NnwxNDg3MDY1ODI4fDExN3BsSDdrVDc=') {
    res.locals.token = {
      appealId: 'md005',
      benefitType: 'pip',
      subscriptionId: 1,
      decryptedToken: '3|1487025828|147plJ7kQ7'
    };
    next();
  } else {
    next({ status: 400 });
  }
};

module.exports = { validateToken };
