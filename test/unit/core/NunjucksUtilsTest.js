const {expect} = require('test/chai-sinon');
const {timeZone} = require('app/config');
const moment = require('moment-timezone');
const testServer = require('test/testServer');
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

  // Date & time in UTC.
  const utc = moment.utc();
  const utcDateTimeStr = utc.format();

  // Date & time based on our time zone (e.g. Europe/London)
  const local = moment.tz(utcDateTimeStr, timeZone);

  // Extract date, month & year.
  let localDate = local.date();
  const localMonth = moment.months()[local.month()];
  const localYear = local.year();

  // Format date
  if(localDate < 10) {
    localDate = `0${localDate}`;
  }

  // Format hours.
  let localHours = local.hours();
  if(localHours < 10) {
    localHours = `0${localHours}`;
  }

  // Format minutes.
  let localMinutes = local.minutes();
  if(localMinutes < 10) {
    localMinutes = `0${localMinutes}`;
  }

  describe('renderString()', () => {

    it('should render a Hello SSCS string', () => {
      let helloSSCS = NunjucksUtils.renderString('Hello {{ name }}', { name: 'SSCS' });
      expect(helloSSCS).equal('Hello SSCS');
    });

    describe('filters', () => {

      it('should take a date defined in UTC and covert it to a local date', () => {
        let localDateTimeStr = NunjucksUtils.renderString('{{date|formatDate}}', { date: utcDateTimeStr });
        expect(localDateTimeStr).to.equal(`${localDate} ${localMonth} ${localYear}`);
      });

      it('should take a time defined in UTC and covert it to local time', () => {
        let localDateTimeStr = NunjucksUtils.renderString('{{time|formatTime}}', { time: utcDateTimeStr });
        expect(localDateTimeStr).to.equal(`${localHours}:${localMinutes}`);
      });

      it('should convert a JavaScript object into a JSON string', () => {
        const credentials = {
          username: 'harrypotter',
          password: '123'
        };
        let stringifiedObj = NunjucksUtils.renderString('{{obj|json}}', {obj: credentials});
        expect(stringifiedObj).to.eq('{\n  &quot;username&quot;: &quot;harrypotter&quot;,\n  &quot;password&quot;: &quot;123&quot;\n}');
      });

    });

    describe('UTC to BST', () => {

      it('should take a date time string defined in UTC and covert it to a local date', () => {
        expect(NunjucksUtils.renderString('{{date|formatDate}}', { date: '2017-07-24T23:00:00.000Z' })).to.eq('25 July 2017');
      });

      it('should take a date time string defined in UTC and covert it to a local time', () => {
        expect(NunjucksUtils.renderString('{{date|formatTime}}', { date: '2017-07-17T12:15:00.000Z' })).to.eq('13:15');
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
