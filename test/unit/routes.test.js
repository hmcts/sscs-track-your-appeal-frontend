const HttpStatus = require('http-status-codes');
const app = require('app');
const request = require('supertest');
const nock = require('nock');
const config = require('app/config');

describe('routes.js', () => {


  before(()=> {

    // Mock GET /tokens/macToken
    nock(config.api)
      .persist()
      .get('/tokens/NnwxNDg3MDY1ODI4fDExN3BsSDdrVDc=')
      .reply(HttpStatus.OK, {
        token: {
          appealId: 'md005',
          subscriptionId: 1,
          decryptedToken: '3|1487025828|147plJ7kQ7'
        }
      });

    // Mock POST /appeals/id/subscriptions/id
    nock(config.api)
      .post('/appeals/md005/subscriptions/1', {
        subscription: {
          email: 'person@example.com'
        }
      })
      .reply(HttpStatus.OK);

    // Mock DELETE /appeals/id/subscriptions/id
    nock(config.api)
      .delete('/appeals/md005/subscriptions/1')
      .reply(HttpStatus.OK);

  });

  describe('making application route requests which result in a HTTP 302', () => {

    let url;

    it('should respond to /abouthearing/md002', (done) => {
      url = '/abouthearing/md002';
      request(app)
        .get(url)
        .expect('Location', '/validate-surname/md002')
        .expect(HttpStatus.MOVED_TEMPORARILY, done);
    });

    it('should respond to /expenses/md002', (done) => {
      url = '/expenses/md002';
      request(app)
        .get(url)
        .expect('Location', '/validate-surname/md002')
        .expect(HttpStatus.MOVED_TEMPORARILY, done);
    });

    it('should respond to /hearingdetails/md007', (done) => {
      url = '/hearingdetails/md007';
      request(app)
        .get(url)
        .expect('Location', '/validate-surname/md007')
        .expect(HttpStatus.MOVED_TEMPORARILY, done);
    });

    it('should respond to /hearingdetails/md007/10', (done) => {
      url = '/hearingdetails/md007/10';
      request(app)
        .get(url)
        .expect('Location', '/validate-surname/md007')
        .expect(HttpStatus.MOVED_TEMPORARILY, done);
    });

    it('should respond to /evidence/md002', (done) => {
      url = '/evidence/md002';
      request(app)
        .get(url)
        .expect('Location', '/validate-surname/md002')
        .expect(HttpStatus.MOVED_TEMPORARILY, done);
    });

    it('should respond to /trackyourappeal/md002', (done) => {
      url = '/trackyourappeal/md002';
      request(app)
        .get(url)
        .expect('Location', '/validate-surname/md002')
        .expect(HttpStatus.MOVED_TEMPORARILY, done);
    });

    it('should respond to /contactus/md002', (done) => {
      url = '/contactus/md002';
      request(app)
        .get(url)
        .expect('Location', '/validate-surname/md002')
        .expect(HttpStatus.MOVED_TEMPORARILY, done);
    });

    it('should respond to /cookiepolicy', (done) => {
      request(app)
        .get('/cookiepolicy')
        .expect(HttpStatus.OK, done);
    });

    it('should respond to /robots.txt', (done) => {
      request(app)
        .get('/robots.txt')
        .expect('Content-Type', 'text/plain; charset=utf-8')
        .expect('User-agent: *\nDisallow: /')
        .expect(HttpStatus.OK, done);
    });

  });

  describe('/manage-email-notifications/mactoken', () => {

    const url = '/manage-email-notifications/NnwxNDg3MDY1ODI4fDExN3BsSDdrVDc=';

    it('should respond with a HTTP 200 when performing a GET', (done) => {
      request(app)
        .get(url)
        .expect(HttpStatus.OK, done);
    });

    it('should respond with a HTTP 302 when POSTing \'changeEmail\'', (done) => {
      request(app)
        .post(url)
        .send({'type': 'changeEmail'})
        .expect('Location', `${url}/change`)
        .expect(HttpStatus.MOVED_TEMPORARILY, done);
    });

    it('should respond with a HTTP 302 when POSTing \'stopEmail\'', (done) => {
      request(app)
        .post(url)
        .send({'type': 'stopEmail'})
        .expect('Location', `${url}/stop`)
        .expect(HttpStatus.MOVED_TEMPORARILY, done);
    });

    it('should respond with a HTTP 400 when POSTing an \'unknown\' type', (done) => {
      request(app)
        .post(url)
        .send({'type': 'unknown'})
        .expect(HttpStatus.BAD_REQUEST, done);
    });

  });

  describe('/manage-email-notifications/mactoken/stop', () => {

    it('should respond with a HTTP 200 when performing a GET', (done) => {
      request(app)
        .get('/manage-email-notifications/NnwxNDg3MDY1ODI4fDExN3BsSDdrVDc=/stop')
        .expect(HttpStatus.OK, done);
    });

  });

  describe('/manage-email-notifications/mactoken/stopconfirm', () => {

    it('should respond with a HTTP 200 when performing a GET', (done) => {
      request(app)
        .get('/manage-email-notifications/NnwxNDg3MDY1ODI4fDExN3BsSDdrVDc=/stopconfirm')
        .expect(HttpStatus.OK, done);
    });

  });

  describe('/manage-email-notifications/mactoken/change', () => {

    const url = '/manage-email-notifications/NnwxNDg3MDY1ODI4fDExN3BsSDdrVDc=/change';

    it('should respond with a HTTP 200 when performing a GET', (done) => {
      request(app)
        .get(url)
        .expect(HttpStatus.OK, done);
    });

    it('should respond with a HTTP 200 when POSTing both email addresses', (done) => {
      request(app)
        .post(url)
        .send({'email': 'person@example.com', 'confirmEmail': 'person@example.com'})
        .expect(HttpStatus.OK, done);
    });

    it('should respond with a HTTP 400 when POSTing empty strings as email addresses', (done) => {
      request(app)
        .post(url)
        .send({'email': '', 'confirmEmail': ''})
        .expect(HttpStatus.BAD_REQUEST, done);
    });

    it('should respond with a HTTP 400 when POSTing non email addresses', (done) => {
      request(app)
        .post(url)
        .send({'email': 'rubb@ish', 'confirmEmail': 'rubb@ish'})
        .expect(HttpStatus.BAD_REQUEST, done);
    });

    it('should respond with a HTTP 400 when POSTing email address that do not match', (done) => {
      request(app)
        .post(url)
        .send({'email': 'person@example.com', 'confirmEmail': 'person@example.net'})
        .expect(HttpStatus.BAD_REQUEST, done);
    });

  });

  describe('making application route requests which result in a HTTP 404', () => {

    it('should respond to / route with a HTTP 404:Not found', (done) => {
      request(app)
        .get('/')
        .expect(HttpStatus.NOT_FOUND, done);
    });

    it('should respond to an unknown route with a HTTP 404:Not found', (done) => {
      request(app)
        .get('/foo')
        .expect(HttpStatus.NOT_FOUND, done);
    });

    it('should respond to an unknown id with a HTTP 404:Not found', (done) => {
      request(app)
        .get('/trackyourappeal/999')
        .expect(HttpStatus.MOVED_TEMPORARILY, done);
    });

  });

});
