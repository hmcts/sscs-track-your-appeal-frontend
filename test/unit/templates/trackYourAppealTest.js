const testServer = require('test/testServer');
const request = require('supertest');
const assert = require('chai').assert;
const jsdom = require('jsdom');

describe('Track your appeal template', () => {

  let httpServer;

  let assertIsActive = (done, stage, check) => {
    return res => {
      jsdom.env(res.text, (err, window) => {
        let status = window.document.querySelectorAll('.progress-bar > ' + stage + ' > .leg')
        assert.equal(status.length, 1);
        check(status[0]);
        done();
      });
    }
  }

  before((done) => {
    testServer.connect().then((server) => {
      httpServer = server;
      done();
    })
  });

  after(() => {
    httpServer.close();
  });

  describe('is status active', () => {
    it('should show active if status is less than current value', (done) => {
      request(httpServer)
        .get('/progress/md300/trackyourappeal')
        .expect(200)
        .then(
          assertIsActive(
            done, '.dwp-respond',
            status => { assert.include(status.className, 'active') }
          )
        );
    });

    it('should show active if status is equal to current value', (done) => {
      request(httpServer)
        .get('/progress/md300/trackyourappeal')
        .expect(200)
        .then(
          assertIsActive(
            done, '.hearing-booked',
            status => { assert.include(status.className, 'active') }
          )
        );
    });

    it('should show inactive if status is greater than current value', (done) => {
      request(httpServer)
        .get('/progress/md300/trackyourappeal')
        .expect(200)
        .then(
          assertIsActive(
            done, '.hearing-leg',
            status => { assert.notInclude(status.className, 'active') }
          )
        );
    });
  });
});
