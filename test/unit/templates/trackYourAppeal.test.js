const path = require('path');
delete require.cache[path.join(__dirname, '../../../app/routes.js')];
delete require.cache[path.join(__dirname, '../../../app.js')];

const proxyquire = require('proxyquire');
const assert = require('chai').assert;
const request = require('supertest');
const jsdom = require('jsdom');

proxyquire('app/routes', {
  'app/middleware/surnameValidationCookieCheck': {
    surnameValidationCookieCheck: function(res, req, next) {
      // Continue to the next piece of middleware and
      // bypass the surname validation check.
      next();
    }
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
      .then(assertIsActive(stage, active, done))
  };

  describe('how the class \'active\' is added to the progress bar when the status is APPEAL_RECEIVED', () => {

    const url = '/trackyourappeal/md002';

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

    const url = '/trackyourappeal/md005';

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

    const url = '/trackyourappeal/md008';

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

    const url = '/trackyourappeal/md007';

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
