const validateToken = (req, res, next) => {
  if (req.params.mactoken === 'NnwxNDg3MDY1ODI4fDExN3BsSDdrVDc=') {
    res.locals.token = {
      body: {
        token: {
          appealId: 'md005',
          subscriptionId: 1,
          decryptedToken: '3|1487025828|147plJ7kQ7'
        }
      }
    };
    next();
  }
};

module.exports = { validateToken };
