const application = require('app');
const request = require('supertest');
const {expect} = require('util/chai-sinon');

describe('Node.js application/server', () => {


  describe('the application after initialisation', function () {

    let app;

    beforeEach(function () {
      app = application();
    });

    afterEach(() => {
      app.srv.close();
    });

    // describe('making application route requests which result in a HTTP 200', () => {
    //
    //   it('should respond to /progress/:id/abouthearing route with a HTTP 200:OK', function (done) {
    //     request(app.exp)
    //       .get('/progress/tt48i5/abouthearing')
    //       .expect(200, done);
    //   });
    //
    //   it('should respond to /progress/:id/expenses route with a HTTP 200:OK', function (done) {
    //     request(app.exp)
    //       .get('/progress/tt48i5/expenses')
    //       .expect(200, done);
    //   });
    //
    //   it('should respond to /progress/:id/hearingdetails route with a HTTP 200:OK', function (done) {
    //     request(app.exp)
    //       .get('/progress/tt48i5/hearingdetails')
    //       .expect(200, done);
    //   });
    //
    //   it('should respond to /progress/:id/evidence route with a HTTP 200:OK', function (done) {
    //     request(app.exp)
    //       .get('/progress/tt48i5/evidence')
    //       .expect(200, done);
    //   });
    //
    //   it('should respond to /progress/:id/trackyourappeal route with a HTTP 200:OK', function (done) {
    //     request(app.exp)
    //       .get('/progress/tt48i5/trackyourappeal')
    //       .expect(200, done);
    //   });
    //
    // });

    describe('making application route requests which redirect with a HTTP 302', () => {

      it('should redirect to /trackyourappeal when a request is made to root', function (done) {
        request(app.exp)
          .get('/')
          .expect(302)
          .expect('Location', '/malformedurl')
          .end(done)
      });

    });

    describe('making application route requests which result in a HTTP 404', () => {

      it('should respond to an unknown route with a HTTP 404:Not found', function (done) {
        request(app.exp)
          .get('/foo')
          .expect(404, done);
      });

    });

  });

});
