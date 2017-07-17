const testServer = require('test/testServer');
const request = require('supertest');
const assert  = require('chai').assert;

describe('routes.js', () => {

  let httpServer;

  before((done) => {
    testServer.connect().then((server) => {
      httpServer = server;
      done();
    })
  });

  after(() => {
    httpServer.close();
  });

  describe('making application route requests which result in a HTTP 200', () => {

    it('should respond to /progress/md002/abouthearing', function (done) {
      request(httpServer)
        .get('/progress/md002/abouthearing')
        .expect(200, done);
    });

    it('should respond to /progress/md002/expenses', function (done) {
      request(httpServer)
        .get('/progress/md002/expenses')
        .expect(200, done);
    });

    it('should respond to /progress/md007/hearingdetails', function (done) {
      request(httpServer)
        .get('/progress/md007/hearingdetails')
        .expect(200, done);
    });

    it('should respond to /progress/md007/hearingdetails/10', function (done) {
      request(httpServer)
        .get('/progress/md007/hearingdetails/10')
        .expect(200, done);
    });

    it('should respond to /progress/md002/evidence', function (done) {
      request(httpServer)
        .get('/progress/md002/evidence')
        .expect(200, done);
    });

    it('should respond to /progress/md002/trackyourappeal', function (done) {
      request(httpServer)
        .get('/progress/md002/trackyourappeal')
        .expect(200, done);
    });

    it('should respond to /progress/md002/contactus', function (done) {
      request(httpServer)
        .get('/progress/md002/contactus')
        .expect(200, done);
    });

    it('should respond to /cookiepolicy', function (done) {
      request(httpServer)
        .get('/cookiepolicy')
        .expect(200, done);
    });

    it('should respond to /robots.txt', function (done) {
      request(httpServer)
        .get('/robots.txt')
        .expect('Content-Type', 'text/plain; charset=utf-8')
        .expect('User-agent: *\nDisallow: /')
        .expect(200, done);
    });

  });

  describe('making email notifications route requests which result in a HTTP 200', () => {

    it('should respond to the /manage-email-notifications/:mactoken route', function (done) {
      request(httpServer)
        .get('/manage-email-notifications/NnwxNDg3MDY1ODI4fDExN3BsSDdrVDc=')
        .expect(200, done);
    });

    it('should respond to the /manage-email-notifications route when posting "changeEmailAddress" ', function (done) {
      request(httpServer)
        .post('/manage-email-notifications/NnwxNDg3MDY1ODI4fDExN3BsSDdrVDc=')
        .send({'emailNotify': 'changeEmailAddress'})
        .expect(200, done);
    });

    it('should respond to the /manage-email-notifications route when posting "stopEmails" ', function (done) {
      request(httpServer)
        .post('/manage-email-notifications/NnwxNDg3MDY1ODI4fDExN3BsSDdrVDc=')
        .send({'emailNotify': 'stopEmails'})
        .expect(200, done);
    });

    it('should respond to the /manage-email-notifications/token/stop route', function (done) {
      request(httpServer)
        .post('/manage-email-notifications/NnwxNDg3MDY1ODI4fDExN3BsSDdrVDc=/stop')
        .expect(200, done);
    });

    it('should respond to the /manage-email-notifications/token/change route', function (done) {
      request(httpServer)
        .post('/manage-email-notifications/NnwxNDg3MDY1ODI4fDExN3BsSDdrVDc=/change')
        .send({'email': 'person@example.com', 'email2': 'person@example.com'})
        .expect(200, done);
    });
  });

  describe('making email notifications route requests which result in an HTTP 400', () => {
    [
      {path: '/manage-email-notifications/invalid', method: 'get'},
      {path: '/manage-email-notifications/invalid', method: 'post', data: {
        'emailNotify': 'changeEmailAddress'
      }},
      {path: '/manage-email-notifications/invalid/stop', method: 'post'},
      {path: '/manage-email-notifications/invalid/change', method: 'post', data: {
        'email': 'person@example.com', 'email2': 'person@example.com'
      }},
    ].forEach((value) => {
      it('should respond to the ' + value.path + ' route when given an invalid token', function (done) {
        let call = request(httpServer)[value.method](value.path)
        if (value.data) {
          call = call.send(value.data);
        }
        call.expect(400, done);
      });
    });

    it('should respond to the /manage-email-notifications/token/change route when both emails are empty', (done) => {
      request(httpServer)
      .post('/manage-email-notifications/NnwxNDg3MDY1ODI4fDExN3BsSDdrVDc=/change')
      .send({'email': '', 'email2': ''})
      .expect(400, done);
    });


    it('should respond to the /manage-email-notifications-change route when given mismatched emails', (done) => {
      request(httpServer)
        .post('/manage-email-notifications/NnwxNDg3MDY1ODI4fDExN3BsSDdrVDc=/change')
        .send({'email': 'person@example.com', 'email2': 'other@example.com'})
        .expect(400, done);
    });

  });

  describe('making application route requests which result in a HTTP 404', () => {

    it('should respond to / route with a HTTP 404:Not found', function (done) {
      request(httpServer)
        .get('/')
        .expect(404, done);
    });

    it('should respond to an unknown route with a HTTP 404:Not found', function (done) {
      request(httpServer)
        .get('/foo')
        .expect(404, done);
    });

    it('should respond to an unknown id with a HTTP 404:Not found', function (done) {
      request(httpServer)
        .get('/progress/999/trackyourappeal')
        .expect(404)
        .end((err, resp) => {
          if (err) return done(err);
          assert.include(resp.text, "Sorry, this page could not be found");
          done();
        })
    });

  });

});
