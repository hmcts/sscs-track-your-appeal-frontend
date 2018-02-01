const testServer = require('test/testServer');
const request = require('supertest');
const assert = require('chai').assert;
const jsdom = require('jsdom');

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
    }
  };

  const requestPageAndAssertActive = (url, stage, active, done) => {
    request(httpServer)
      .get(url)
      .expect(200)
      .then(assertIsActive(stage, active, done))
  };

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

  describe("how the class 'active' is added to the progress bar when the status is APPEAL_RECEIVED", () => {

    const url = '/progress/md002/trackyourappeal';

    it("should add the 'active' class to appeal received", (done) => {
      requestPageAndAssertActive(url, '.appeal-received', true, done);
    });

    it("should omit the 'active' class from DWP respond", (done) => {
      requestPageAndAssertActive(url, '.dwp-respond', false, done);
    });

    it("should omit the 'active' class from hearing booked", (done) => {
      requestPageAndAssertActive(url, '.hearing-booked', false, done);
    });

    it("should omit the 'active' class from hearing", (done) => {
      requestPageAndAssertActive(url, '.hearing', false, done);
    });

  });

  describe("how the class 'active' is added to the progress bar when the status is DWP_RESPOND", () => {

    const url = '/progress/md005/trackyourappeal';

    it("should add the 'active' class to appeal received", (done) => {
      requestPageAndAssertActive(url, '.appeal-received', true, done);
    });

    it("should add the 'active' class to DWP respond", (done) => {
      requestPageAndAssertActive(url, '.dwp-respond', true, done);
    });

    it("should omit the 'active' class from hearing booked", (done) => {
      requestPageAndAssertActive(url, '.hearing-booked', false, done);
    });

    it("should omit the 'active' class from hearing", (done) => {
      requestPageAndAssertActive(url, '.hearing', false, done);
    });

  });

  describe("how the class 'active' is added to the progress bar when the status is HEARING_BOOKED", () => {

    const url = '/progress/md008/trackyourappeal';

    it("should add the 'active' class to appeal received", (done) => {
      requestPageAndAssertActive(url, '.appeal-received', true, done);
    });

    it("should add the 'active' class to DWP respond", (done) => {
      requestPageAndAssertActive(url, '.dwp-respond', true, done);
    });

    it("should add the 'active' class to hearing booked", (done) => {
      requestPageAndAssertActive(url, '.hearing-booked', true, done);
    });

    it("should omit the 'active' class from hearing", (done) => {
      requestPageAndAssertActive(url, '.hearing', false, done);
    });

  });

  describe("how the class 'active' is added to the progress bar when the status is HEARING", () => {

    const url = '/progress/md007/trackyourappeal';

    it("should add the 'active' class to appeal received", (done) => {
      requestPageAndAssertActive(url, '.appeal-received', true, done);
    });

    it("should add the 'active' class to DWP respond", (done) => {
      requestPageAndAssertActive(url, '.dwp-respond', true, done);
    });

    it("should add the 'active' class to hearing booked", (done) => {
      requestPageAndAssertActive(url, '.hearing-booked', true, done);
    });

    it("should add the 'active' class to hearing", (done) => {
      requestPageAndAssertActive(url, '.hearing', true, done);
    });

  });

});
