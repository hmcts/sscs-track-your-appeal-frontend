const testServer = require('test/testServer');
const {expect} = require('test/chai-sinon');
const NunjucksUtils = require('app/core/NunjucksUtils');

describe('NunjucksUtils.js', () => {

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

  describe('renderString()', () => {

    it('should render a Hello SSCS string', () => {
      let helloSSCS = NunjucksUtils.renderString('Hello {{ name }}', { name: 'SSCS' });
      expect(helloSSCS).equal('Hello SSCS');
    });

    describe('filters', () => {

      const DATE_AND_TIME = '1972-01-25T12:17:37.497Z';

      it('should format a date and render it', () => {
        let date = NunjucksUtils.renderString('Date: {{date|formatDate}}', { date: DATE_AND_TIME });
        expect(date).equal('Date: 25 January 1972');
      });

      it('should format time and render it', () => {
        let time = NunjucksUtils.renderString('Time: {{time|formatTime}}', { time: DATE_AND_TIME });
        expect(time).equal('Time: 12:17');
      });

    });

    describe('throwing an error', () => {

      let nunJucksEnv;

      before(() => {
        nunJucksEnv = NunjucksUtils.env;
        NunjucksUtils.env = undefined;
      });

      after(() => {
        NunjucksUtils.env = nunJucksEnv;
      });

      it('should throw an error', () => {
        expect(() => NunjucksUtils.renderString('Hello {{ username }}', { name: 'SSCS' })).to.throw(Error, 'The nunjucksEnv has not been set!');
      });

    });

  });

});
