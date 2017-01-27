const {expect, sinon} = require('test/chai-sinon');
const {VALUES} = require('app/core/log/logKeys');
const LEVELS = require('log4js').levels;

describe('Logging within the Node.js application', () => {

  describe('The Logger singleton class', () => {

    let Logger, loggerInstance1, loggerInstance2;

    describe('Creating multiple instances of Logger', function () {

      beforeEach(() => {
        loggerInstance1 = require('app/core/log/Logger').getLogger();
        loggerInstance2 = require('app/core/log/Logger').getLogger();
      });

      afterEach(() => {
        loggerInstance1 = undefined;
        loggerInstance2 = undefined;
      });

      it('should only create a single instance', () => {
        expect(loggerInstance1).to.deep.equal(loggerInstance2);
      });

    });

    describe('Instantiating Logger with the new keyword', function () {

      it('should throw an Error', function () {
        let Logger = require('app/core/log/Logger');
        expect(() => {
          new Logger();
        }).to.throw(Error, 'Cannot construct Logger singleton, use the static getLogger() function');
      });

    });

  });

  describe('Adding default field settings to an empty log entry object', () => {

    let logger, logEntry, logged;

    beforeEach(() => {
      logger = require('app/core/log/Logger').getLogger();
      logEntry = {};
      logged = logger.info(logEntry); // Any log level will do.
    });

    afterEach(() => {
      logger = undefined;
    });

    it('should set the level field', function () {
      expect(logged.level).to.eql(LEVELS.INFO.toString());
    });

    it('should set the message field', function () {
      expect(logged.message).to.eql(VALUES.EMPTY_STRING);
    });

    it('should set the responseCode field', function () {
      expect(logged.responseCode).to.eql(VALUES.EMPTY_STRING);
    });

    it('should set the rootRequestId field', function () {
      expect(logged.rootRequestId).to.eql(VALUES.EMPTY_STRING);
    });

    it('should set the requestId field', function () {
      expect(logged.requestId).to.eql(VALUES.EMPTY_STRING);
    });

    it('should set the originRequestId field', function () {
      expect(logged.originRequestId).to.eql(VALUES.EMPTY_STRING);
    });

    it('should set the fields field', function () {
      expect(logged.fields).to.eql([]);
    });

    it('should set the type field', function () {
      expect(logged.type).to.eql(VALUES.NODEJS);
    });

    it('should set the microservice field', function () {
      expect(logged.microservice).to.eql(VALUES.TRACK_YOUR_APPEAL);
    });

    it('should set the team field', function () {
      expect(logged.team).to.eql(VALUES.SSCS);
    });

    it('should set the hostname field', function () {
      expect(logged.hostname).to.be.defined;
    });

    it('should set the timestamp field', function () {
      expect(logged.timestamp).to.be.defined;
    });
  });

  describe('Adding user defined fields to a log entry object', function () {

    let logger, logEntry, logged;

    beforeEach(() => {
      logger = require('app/core/log/Logger').getLogger();
      logEntry = {
        message: 'this is some information',
        responseCode: 404,
        rootRequestId: 'ac-23-4a-b8-4f',
        requestId: 'bc-63-4a-b8-4g',
        originRequestId: 'cc-93-4a-b8-4i',
        environment: 'production',
        hostname: 'myhostname',
        fields: [
          {key:'a', value: 1},
          {key:'b', value: 'foo'},
          {key:'c', value: [1,2,3]}
        ]
      };
      logged = logger.info(logEntry); // Any log level will do.
    });

    afterEach(() => {
      logger = undefined;
    });

    it('should set the level field', function () {
      expect(logged.level).to.eql(LEVELS.INFO.toString());
    });

    it('should set the message field', function () {
      expect(logged.message).to.eql('this is some information');
    });

    it('should set the response code', function () {
      expect(logged.responseCode).to.eql(404);
    });

    it('should set the rootRequestId', function () {
      expect(logged.rootRequestId).to.eql('ac-23-4a-b8-4f');
    });

    it('should set the requestId', function () {
      expect(logged.requestId).to.eql('bc-63-4a-b8-4g');
    });

    it('should set the originRequestId', function () {
      expect(logged.originRequestId).to.eql('cc-93-4a-b8-4i');
    });

    it('should set the environment', function () {
      expect(logged.environment).to.eql('production');
    });

    it('should set the hostname', function () {
      expect(logged.hostname).to.be.defined;
    });

    it('should set the fields', function () {
      expect(logged.fields.length).to.eql(3);
      expect(logged.fields[0].key).to.eql('a');
      expect(logged.fields[1].key).to.eql('b');
      expect(logged.fields[2].key).to.eql('c');
      expect(logged.fields[0].value).to.eql(1);
      expect(logged.fields[1].value).to.eql('foo');
      expect(logged.fields[2].value).to.eql([1,2,3]);
    });

  });

  describe('Logging an event at a given level', function () {

    let logger, logEntry;

    beforeEach(() => {
      logger = require('app/core/log/Logger').getLogger();
      logEntry = {};
      logger._log = sinon.spy();
    });

    afterEach(() => {
      logger = undefined;
    });

    it('should log a message at level TRACE', function () {
      logger.trace(logEntry);
      expect(logEntry.level).to.eql('TRACE');
      expect(logger._log).to.have.been.calledWith(logEntry);
    });

    it('should log a message at level DEBUG', function () {
      logger.debug(logEntry);
      expect(logEntry.level).to.eql('DEBUG');
      expect(logger._log).to.have.been.calledWith(logEntry);
    });

    it('should log a message at level INFO', function () {
      logger.info(logEntry);
      expect(logEntry.level).to.eql('INFO');
      expect(logger._log).to.have.been.calledWith(logEntry);
    });

    it('should log a message at level WARN', function () {
      logger.warn(logEntry);
      expect(logEntry.level).to.eql('WARN');
      expect(logger._log).to.have.been.calledWith(logEntry);
    });

    it('should log a message at level ERROR', function () {
      logger.error(logEntry);
      expect(logEntry.level).to.eql('ERROR');
      expect(logger._log).to.have.been.calledWith(logEntry);
    });

    it('should log a message at level FATAL', function () {
      logger.fatal(logEntry);
      expect(logEntry.level).to.eql('FATAL');
      expect(logger._log).to.have.been.calledWith(logEntry);
    });

  });

});
