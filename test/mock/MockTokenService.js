class MockTokenService {

  static validateToken(token) {
    const response = {
      body: {
        token: {
          appealId: 'md200',
          subscriptionId: 1,
          decryptedToken: "3|1487025828|147plJ7kQ7"
        }
      }
    };
    const invalid = {
      statusCode: 400,
    };
    return new Promise((resolve, reject) => {
      if (token == "invalid") {
        setTimeout(() => reject(invalid), 50);
      } else {
        setTimeout(() => resolve(response), 50);
      }
    });
  }
}

module.exports = MockTokenService;
