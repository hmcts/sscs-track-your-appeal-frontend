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

  let monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Date & time in UTC.
  const nowUTC = moment.utc();
  const utcDateTimeStr = nowUTC.format(dateFormat.utc);

  // Date & time in local time.
  nowUTC.local();
  const date = nowUTC.date();
  const month = monthNames[nowUTC.month()];
  const year = nowUTC.year();
  const localHours = nowUTC.hours();
  let localMinutes = nowUTC.minutes();
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
        let localDate = NunjucksUtils.renderString('{{date|formatDate}}', { date: utcDateTimeStr });
        expect(localDate).to.equal(`${date} ${month} ${year}`);
      });

      it('should take a time defined in UTC and covert it to local time', () => {
        let localTime = NunjucksUtils.renderString('{{time|formatTime}}', { time: utcDateTimeStr });
        expect(localTime).to.equal(`${localHours}:${localMinutes}`);
      });

      it('should convert a JavaScript object into a JSON string', () => {
        const obj = {
          username: 'harrypotter',
          password: '123'
        };
        let stringifiedObj = NunjucksUtils.renderString('{{obj|json}}', {obj: obj});
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
