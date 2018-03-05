const path = require('path');
delete require.cache[path.join(__dirname, '../../../app/routes.js')];
delete require.cache[path.join(__dirname, '../../../app.js')];

const appealReceived = require('test/mock/data/appealReceived').appeal;
const dwpRespond = require('test/mock/data/dwpRespond').appeal;
const hearingBooked = require('test/mock/data/hearingBooked').appeal;
const hearing = require('test/mock/data/hearing').appeal;

const HttpStatus = require('http-status-codes');
const proxyquire = require('proxyquire');
const config = require('app/config');
const assert = require('chai').assert;
const request = require('supertest');
const jsdom = require('jsdom');
const nock = require('nock');

proxyquire('app/routes', {
  'app/middleware/surnameValidationCookieCheck': {
    surnameValidationCookieCheck: (res, req, next) => next()
  }
});
const app = require('app.js');

describe('Track your appeal template', () => {

  const assertIsActive = (stage, active, done) => {
    return res => {
      jsdom.env(res.text, (err, window) => {
        let status = window.document.querySelectorAll('.progress-bar ' + stage);
        assert.equal(status.length, 1);
        if(active) {
          assert.include(status[0].className, 'active');
        } else {
          assert.notInclude(status[0].className, 'active');
        }
        done();
      });
    };
  };

  const requestPageAndAssertActive = (url, stage, active, done) => {
    request(app)
      .get(url)
      .expect(200)
      .then(assertIsActive(stage, active, done));
  };

  describe('how the class \'active\' is added to the progress bar when the status is APPEAL_RECEIVED', () => {

    const appealId = 'md002';
    const url = `/trackyourappeal/${appealId}`;

    nock(config.api)
      .persist()
      .get(`/appeals/${appealId}`)
      .reply(HttpStatus.OK, {
        appeal: appealReceived
      });

    it('should add the \'active\' class to appeal received', (done) => {
      requestPageAndAssertActive(url, '.appeal-received', true, done);
    });

    it('should omit the \'active\' class from DWP respond', (done) => {
      requestPageAndAssertActive(url, '.dwp-respond', false, done);
    });

    it('should omit the \'active\' class from hearing booked', (done) => {
      requestPageAndAssertActive(url, '.hearing-booked', false, done);
    });

    it('should omit the \'active\' class from hearing', (done) => {
      requestPageAndAssertActive(url, '.hearing', false, done);
    });

  });

  describe('how the class \'active\' is added to the progress bar when the status is DWP_RESPOND', () => {

    const appealId = 'md005';
    const url = `/trackyourappeal/${appealId}`;

    nock(config.api)
      .persist()
      .get(`/appeals/${appealId}`)
      .reply(HttpStatus.OK, {
        appeal: dwpRespond
      });

    it('should add the \'active\' class to appeal received', (done) => {
      requestPageAndAssertActive(url, '.appeal-received', true, done);
    });

    it('should add the \'active\' class to DWP respond', (done) => {
      requestPageAndAssertActive(url, '.dwp-respond', true, done);
    });

    it('should omit the \'active\' class from hearing booked', (done) => {
      requestPageAndAssertActive(url, '.hearing-booked', false, done);
    });

    it('should omit the \'active\' class from hearing', (done) => {
      requestPageAndAssertActive(url, '.hearing', false, done);
    });

  });

  describe('how the class \'active\' is added to the progress bar when the status is HEARING_BOOKED', () => {

    const appealId = 'md008';
    const url = `/trackyourappeal/${appealId}`;

    nock(config.api)
      .persist()
      .get(`/appeals/${appealId}`)
      .reply(HttpStatus.OK, {
        appeal: hearingBooked
      });

    it('should add the \'active\' class to appeal received', (done) => {
      requestPageAndAssertActive(url, '.appeal-received', true, done);
    });

    it('should add the \'active\' class to DWP respond', (done) => {
      requestPageAndAssertActive(url, '.dwp-respond', true, done);
    });

    it('should add the \'active\' class to hearing booked', (done) => {
      requestPageAndAssertActive(url, '.hearing-booked', true, done);
    });

    it('should omit the \'active\' class from hearing', (done) => {
      requestPageAndAssertActive(url, '.hearing', false, done);
    });

  });

  describe('how the class \'active\' is added to the progress bar when the status is HEARING', () => {

    const appealId = 'md007';
    const url = `/trackyourappeal/${appealId}`;

    nock(config.api)
      .persist()
      .get(`/appeals/${appealId}`)
      .reply(HttpStatus.OK, {
        appeal: hearing
      });

    it('should add the \'active\' class to appeal received', (done) => {
      requestPageAndAssertActive(url, '.appeal-received', true, done);
    });

    it('should add the \'active\' class to DWP respond', (done) => {
      requestPageAndAssertActive(url, '.dwp-respond', true, done);
    });

    it('should add the \'active\' class to hearing booked', (done) => {
      requestPageAndAssertActive(url, '.hearing-booked', true, done);
    });

    it('should add the \'active\' class to hearing', (done) => {
      requestPageAndAssertActive(url, '.hearing', true, done);
    });

  });

});
