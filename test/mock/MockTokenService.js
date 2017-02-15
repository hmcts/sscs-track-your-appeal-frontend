class MockTokenService {

  static validateToken() {
    const response = {
      body: {
        token: {
          appealId: 'md200',
          subscriptionId: 1,
          decryptedToken: "3|1487025828|147plJ7kQ7"
        }
      }
    };
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(response), 50);
    });
  }
}

module.exports = MockTokenService;
