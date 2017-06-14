class MockTokenService {

  static validateToken(req, res, next) {
    if (req.params.mactoken !== "invalid") {
      res.locals.token = {
        body: {
          token: {
            appealId: 'md200',
            subscriptionId: 1,
            decryptedToken: "3|1487025828|147plJ7kQ7"
          }
        }
      };
      next();
    } else {
      next({status: 400});
    }
  }
}

module.exports = MockTokenService;
