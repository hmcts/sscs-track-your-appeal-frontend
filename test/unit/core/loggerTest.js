const {expect, sinon} = require('test/chai-sinon');
const logging = require('app/core/log/logConfig').logging;
const defaultLogEntry = logging.defaultLogEntry;
const LEVELS = require('log4js').levels;

describe('Logging within the Node.js application', () => {

  describe('Adding default field settings to an empty log entry object', () => {

    let logger, logEntry, logged;

    beforeEach(() => {
      logger = require('app/core/log/Logger').getLogger('test');
      logEntry = {};
      logged = logger.info(logEntry); // Any log level will do.
    });

    afterEach(() => {
      logger = undefined;
    });

    it('should set the level field', () => {
      expect(logged.level).to.eql(LEVELS.INFO.toString());
    });

    it('should set the message field', () => {
      expect(logged.message).to.eql(defaultLogEntry.message);
    });

    it('should set the responseCode field', () => {
      expect(logged.responseCode).to.eql(defaultLogEntry.responseCode);
    });

    it('should set the rootRequestId field', () => {
      expect(logged.rootRequestId).to.eql(defaultLogEntry.rootRequestId);
    });

    it('should set the requestId field', () => {
      expect(logged.requestId).to.eql(defaultLogEntry.requestId);
    });

    it('should set the originRequestId field', () => {
      expect(logged.originRequestId).to.eql(defaultLogEntry.originRequestId);
    });

    it('should set the fields field', () => {
      expect(logged.fields).to.eql(defaultLogEntry.fields);
    });

    it('should set the type field', () => {
      expect(logged.type).to.eql(defaultLogEntry.type);
    });

    it('should set the microservice field', () => {
      expect(logged.microservice).to.eql(defaultLogEntry.microservice);
    });

    it('should set the team field', () => {
      expect(logged.team).to.eql(defaultLogEntry.team);
    });

    it('should set the hostname field', () => {
      expect(logged.hostname).to.be.a('string');
      expect(logged.hostname.length > 0).to.eql(true);
    });

    it('should set the timestamp field', () => {
      expect(logged.timestamp).to.be.a('string');
      expect(logged.timestamp.length > 0).to.eql(true);
    });
  });

  describe('Adding user defined fields to a log entry object', () => {

    let logger, logEntry, logged;

    beforeEach(() => {
      logger = require('app/core/log/Logger').getLogger('test');
      logEntry = {
        message: 'this is some information',
        responseCode: 404,
        rootRequestId: 'ac-23-4a-b8-4f',
        requestId: 'bc-63-4a-b8-4g',
        originRequestId: 'cc-93-4a-b8-4i',
        environment: 'production',
        hostname: 'myhostname',
        fields: [
          {key: 'a', value: 1},
          {key: 'b', value: 'foo'},
          {key: 'c', value: [1, 2, 3]}
        ]
      };
      logged = logger.info(logEntry); // Any log level will do.
    });

    afterEach(() => {
      logger = undefined;
    });

    it('should set the level field', () => {
      expect(logged.level).to.eql(LEVELS.INFO.toString());
    });

    it('should set the message field', () => {
      expect(logged.message).to.eql('this is some information');
    });

    it('should set the response code', () => {
      expect(logged.responseCode).to.eql(404);
    });

    it('should set the rootRequestId', () => {
      expect(logged.rootRequestId).to.eql('ac-23-4a-b8-4f');
    });

    it('should set the requestId', () => {
      expect(logged.requestId).to.eql('bc-63-4a-b8-4g');
    });

    it('should set the originRequestId', () => {
      expect(logged.originRequestId).to.eql('cc-93-4a-b8-4i');
    });

    it('should set the environment', () => {
      expect(logged.environment).to.eql('production');
    });

    it('should set the hostname', () => {
      expect(logged.hostname).to.be.a('string');
      expect(logged.hostname.length > 0).to.eql(true);
    });

    it('should set the fields', () => {
      expect(logged.fields.length).to.eql(3);
      expect(logged.fields[0].key).to.eql('a');
      expect(logged.fields[1].key).to.eql('b');
      expect(logged.fields[2].key).to.eql('c');
      expect(logged.fields[0].value).to.eql(1);
      expect(logged.fields[1].value).to.eql('foo');
      expect(logged.fields[2].value).to.eql([1, 2, 3]);
    });

  });

  describe('Logging an event at a given level', () => {

    let logger, logEntry;

    beforeEach(() => {
      logger = require('app/core/log/Logger').getLogger('test');
      logEntry = {};
      logger._log = sinon.spy();
    });

    afterEach(() => {
      logger = undefined;
    });

    it('should log a message at level TRACE', () => {
      logger.trace(logEntry);
      expect(logEntry.level).to.eql('TRACE');
      expect(logger._log).to.have.been.calledWith(logEntry);
    });

    it('should log a message at level DEBUG', () => {
      logger.debug(logEntry);
      expect(logEntry.level).to.eql('DEBUG');
      expect(logger._log).to.have.been.calledWith(logEntry);
    });

    it('should log a message at level INFO', () => {
      logger.info(logEntry);
      expect(logEntry.level).to.eql('INFO');
      expect(logger._log).to.have.been.calledWith(logEntry);
    });

    it('should log a message at level WARN', () => {
      logger.warn(logEntry);
      expect(logEntry.level).to.eql('WARN');
      expect(logger._log).to.have.been.calledWith(logEntry);
    });

    it('should log a message at level ERROR', () => {
      logger.error(logEntry);
      expect(logEntry.level).to.eql('ERROR');
      expect(logger._log).to.have.been.calledWith(logEntry);
    });

    it('should log a message at level FATAL', () => {
      logger.fatal(logEntry);
      expect(logEntry.level).to.eql('FATAL');
      expect(logger._log).to.have.been.calledWith(logEntry);
    });

  });

  describe('Obtaining a single instance of Logger', () => {

    let Logger, loggerInstance1, loggerInstance2, loggerInstance3;

    beforeEach(() => {
      Logger = require('app/core/log/Logger');
      loggerInstance1 = Logger.getLogger('test1');
      loggerInstance2 = Logger.getLogger('test2');
      loggerInstance3 = Logger.getLogger('test3');
    });

    afterEach(() => {
      loggerInstance1 = undefined;
      loggerInstance2 = undefined;
      loggerInstance3 = undefined;
    });

    it('should only create a single instance', () => {
      expect(loggerInstance1).to.deep.equal(loggerInstance2);
      expect(loggerInstance2).to.deep.equal(loggerInstance3);
      expect(loggerInstance3).to.deep.equal(loggerInstance1);
    });

    it('should throw an Error', () => {
      expect(() => {
        new Logger();
      }).to.throw(Error, 'Cannot construct Logger singleton, use the static getLogger() function');
    });

  });

});
