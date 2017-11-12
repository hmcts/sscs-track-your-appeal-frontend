const testServer = require('test/testServer');
const request = require('supertest');
const assert  = require('chai').assert;
const HttpStatus = require('http-status-codes');

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

    it('should respond to /progress/md002/abouthearing', (done) => {
      request(httpServer)
        .get('/progress/md002/abouthearing')
        .expect(HttpStatus.OK, done);
    });

    it('should respond to /progress/md002/expenses', (done) => {
      request(httpServer)
        .get('/progress/md002/expenses')
        .expect(HttpStatus.OK, done);
    });

    it('should respond to /progress/md007/hearingdetails', (done) => {
      request(httpServer)
        .get('/progress/md007/hearingdetails')
        .expect(HttpStatus.OK, done);
    });

    it('should respond to /progress/md007/hearingdetails/10', (done) => {
      request(httpServer)
        .get('/progress/md007/hearingdetails/10')
        .expect(HttpStatus.OK, done);
    });

    it('should respond to /progress/md002/evidence', (done) => {
      request(httpServer)
        .get('/progress/md002/evidence')
        .expect(HttpStatus.OK, done);
    });

    it('should respond to /progress/md002/trackyourappeal', (done) => {
      request(httpServer)
        .get('/progress/md002/trackyourappeal')
        .expect(HttpStatus.OK, done);
    });

    it('should respond to /progress/md002/contactus', (done) => {
      request(httpServer)
        .get('/progress/md002/contactus')
        .expect(HttpStatus.OK, done);
    });

    it('should respond to /cookiepolicy', (done) => {
      request(httpServer)
        .get('/cookiepolicy')
        .expect(HttpStatus.OK, done);
    });

    it('should respond to /robots.txt', (done) => {
      request(httpServer)
        .get('/robots.txt')
        .expect('Content-Type', 'text/plain; charset=utf-8')
        .expect('User-agent: *\nDisallow: /')
        .expect(HttpStatus.OK, done);
    });

  });

  describe('/manage-email-notifications/mactoken', () => {

    const url = '/manage-email-notifications/NnwxNDg3MDY1ODI4fDExN3BsSDdrVDc=';

    it('should respond with a HTTP 200 when performing a GET', (done) => {
      request(httpServer)
        .get(url)
        .expect(HttpStatus.OK, done);
    });

    it('should respond with a HTTP 302 when POSTing \'changeEmail\'', (done) => {
      request(httpServer)
        .post(url)
        .send({'type': 'changeEmail'})
        .expect('Location', `${url}/change`)
        .expect(HttpStatus.MOVED_TEMPORARILY, done);
    });

    it('should respond with a HTTP 302 when POSTing \'stopEmail\'', (done) => {
      request(httpServer)
        .post(url)
        .send({'type': 'stopEmail'})
        .expect('Location', `${url}/stop`)
        .expect(HttpStatus.MOVED_TEMPORARILY, done);
    });

    it('should respond with a HTTP 400 when POSTing an \'unknown\' type', (done) => {
      request(httpServer)
        .post(url)
        .send({'type': 'unknown'})
        .expect(HttpStatus.BAD_REQUEST, done);
    });

  });

  describe('/manage-email-notifications/mactoken/stop', () => {

    it('should respond with a HTTP 200 when performing a GET', (done) => {
      request(httpServer)
        .get('/manage-email-notifications/NnwxNDg3MDY1ODI4fDExN3BsSDdrVDc=/stop')
        .expect(HttpStatus.OK, done);
    });

  });

  describe('/manage-email-notifications/mactoken/stopconfirm', () => {

    it('should respond with a HTTP 200 when performing a GET', (done) => {
      request(httpServer)
        .get('/manage-email-notifications/NnwxNDg3MDY1ODI4fDExN3BsSDdrVDc=/stopconfirm')
        .expect(HttpStatus.OK, done);
    });

  });

  describe('/manage-email-notifications/mactoken/change', () => {

    const url = '/manage-email-notifications/NnwxNDg3MDY1ODI4fDExN3BsSDdrVDc=/change';

    it('should respond with a HTTP 200 when performing a GET', (done) => {
      request(httpServer)
        .get(url)
        .expect(HttpStatus.OK, done);
    });

    it('should respond with a HTTP 200 when POSTing both email addresses', (done) => {
      request(httpServer)
        .post(url)
        .send({'email': 'person@example.com', 'confirmEmail': 'person@example.com'})
        .expect(HttpStatus.OK, done);
    });

    it('should respond with a HTTP 400 when POSTing empty strings as email addresses', (done) => {
      request(httpServer)
        .post(url)
        .send({'email': '', 'confirmEmail': ''})
        .expect(HttpStatus.BAD_REQUEST, done);
    });

    it('should respond with a HTTP 400 when POSTing non email addresses', (done) => {
      request(httpServer)
        .post(url)
        .send({'email': 'rubb@ish', 'confirmEmail': 'rubb@ish'})
        .expect(HttpStatus.BAD_REQUEST, done);
    });

    it('should respond with a HTTP 400 when POSTing email address that do not match', (done) => {
      request(httpServer)
        .post(url)
        .send({'email': 'person@example.com', 'confirmEmail': 'person@example.net'})
        .expect(HttpStatus.BAD_REQUEST, done);
    });

  });

  describe('making application route requests which result in a HTTP 404', () => {

    it('should respond to / route with a HTTP 404:Not found', (done) => {
      request(httpServer)
        .get('/')
        .expect(HttpStatus.NOT_FOUND, done);
    });

    it('should respond to an unknown route with a HTTP 404:Not found', (done) => {
      request(httpServer)
        .get('/foo')
        .expect(HttpStatus.NOT_FOUND, done);
    });

    it('should respond to an unknown id with a HTTP 404:Not found', (done) => {
      request(httpServer)
        .get('/progress/999/trackyourappeal')
        .expect(HttpStatus.NOT_FOUND)
        .end((err, resp) => {
          if (err) return done(err);
          assert.include(resp.text, "Sorry, this page could not be found");
          done();
        })
    });

  });

});
