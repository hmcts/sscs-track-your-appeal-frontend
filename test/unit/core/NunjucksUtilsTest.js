const {expect} = require('test/chai-sinon');
const {dateFormat} = require('app/config');
const moment = require('moment');
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
  const utcDateTimeStr = utc.format(dateFormat.utc);

  // Date & time in local time.
  const local = utc.local();

  // Extract date, month & year.
  const localDate = local.date();
  const localMonth = moment.months()[local.month()];
  const localYear = local.year();

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
