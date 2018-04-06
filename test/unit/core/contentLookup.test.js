const {
  getContentFromFile,
  getContentAsString,
  getContentAsArray
} = require('app/core/contentLookup');
const { expect, sinon } = require('test/chai-sinon');
const content = require('app/assets/locale/en.json');
const proxyquire = require('proxyquire');

const allEventKeys = Object.keys(content.status);

describe('Calling the getContentFromFile() function', () => {
  it('should throw an error when encountering an unknown content key', () => {
    expect(() => {
      getContentFromFile('unknown').to.throw(ReferenceError, 'Unknown key: unknown');
    });
  });
});

describe('Calling the getContentAsString() function', () => {
  it('should retrieve the headings as a non empty string', () => {
    allEventKeys.forEach(key => {
      const heading = getContentAsString(`status.${key}.heading`);
      expect(heading).to.be.a('string');
      return expect(heading.length > 0).to.be.true;
    });
  });

  describe('Logging an error', () => {
    const logger = { error: sinon.stub() };
    const contentLookupStub = proxyquire('app/core/contentLookup', {
      '@hmcts/nodejs-logging': {
        Logger: {
          getLogger: () => {
            return logger;
          }
        }
      }
    });

    it('should log the error when encountering an unknown content key', () => {
      contentLookupStub.getContentAsString('unknown');
      expect(logger.error).calledWith(sinon.match.instanceOf(ReferenceError));
    });
  });
});

describe('Calling the getContentAsArray() function', () => {
  it('should retrieve the content of all events as an array', () => {
    allEventKeys.forEach(key => {
      const contentArr = getContentAsArray(`status.${key}.content`);
      return expect(contentArr).to.be.an('array').that.is.not.empty;
    });
  });
  it('should...', () => {
    allEventKeys.forEach(key => {
      const contentArr = getContentAsArray(`status.${key}.content`);
      contentArr.forEach(contnt => {
        expect(contnt).to.be.a('string');
        return expect(contnt.length > 0).to.be.true;
      });
    });
  });
});
