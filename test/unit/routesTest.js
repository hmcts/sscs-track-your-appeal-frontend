const application = require('app');
const request = require('supertest');
const {expect} = require('test/chai-sinon');

describe('Node.js application/server', () => {


  describe('the application after initialisation', function () {

    let app;

    beforeEach(function () {
      app = application();
    });

    afterEach(() => {
      app.srv.close();
    });

    describe('making application route requests which result in a HTTP 200', () => {

      it('should respond to /progress/md100/abouthearing route with a HTTP 200:OK', function (done) {
        request(app.exp)
          .get('/progress/md100/abouthearing')
          .expect(200, done);
      });

      it('should respond to /progress/md100/expenses route with a HTTP 200:OK', function (done) {
        request(app.exp)
          .get('/progress/md100/expenses')
          .expect(200, done);
      });

      it('should respond to /progress/md100/hearingdetails route with a HTTP 200:OK', function (done) {
        request(app.exp)
          .get('/progress/md100/hearingdetails')
          .expect(200, done);
      });

      it('should respond to /progress/md100/evidence route with a HTTP 200:OK', function (done) {
        request(app.exp)
          .get('/progress/md100/evidence')
          .expect(200, done);
      });

      it('should respond to /progress/md100/trackyourappeal route with a HTTP 200:OK', function (done) {
        request(app.exp)
          .get('/progress/md100/trackyourappeal')
          .expect(200, done);
      });

      it('should respond to the /status route with a HTTP 200:OK', function (done) {
        request(app.exp)
          .get('/status')
          .expect('Content-Type', /json/)
          .expect(200, done);
      });

    });

    describe('making application route requests which result in a HTTP 404', () => {

      it('should respond to / route with a HTTP 404:Not found', function (done) {
        request(app.exp)
          .get('/')
          .expect(404, done);
      });

      it('should respond to an unknown route with a HTTP 404:Not found', function (done) {
        request(app.exp)
          .get('/foo')
          .expect(404, done);
      });

      it('should respond to an unknown id with a HTTP 404:Not found', function (done) {
        request(app.exp)
          .get('/progress/999/trackyourappeal')
          .expect(404, done)
      });

    });

  });

});
