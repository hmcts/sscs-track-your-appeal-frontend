const {expect} = require('util/chai-sinon');
const mockery = require('mockery');
const app = require('app');

describe('I18nHelper', () => {

  const mockedEvents = [{
    "contentKey": "status.hearing",
    "date": "2016-11-16T01:00:00Z",
    "placeholder": {
      "date": "2016-11-30T00:00:00Z"
    }
  }, {
    "contentKey": "status.hearingBooked",
    "date": "2016-11-15T01:00:00Z",
    "placeholder": {
      "date": "2016-11-30T00:00:00Z"
    }
  }, {
    "contentKey": "status.dwpRespond",
    "date": "2016-11-13T01:00:00Z",
    "placeholder": {
      "date": "2016-11-30T00:00:00Z"
    }
  }, {
    "contentKey": "status.appealReceived",
    "date": "2016-11-12T01:00:00Z",
    "placeholder": {
      "date": "2016-11-30T00:00:00Z"
    }
  }];

  const mockedContent = {
    "status": {
      "appealReceived": {
        "heading": "Appeal received",
        "content": "Appeal received: {{date | formatDate}}"
      },
      "dwpRespond": {
        "heading": "DWP response",
        "content": [
          "DWP content line 1",
          "DWP content line 2"
        ]
      },
      "hearingBooked": {
        "heading": "Hearing booked",
        "content": "Hearing booked content line"
      },
      "hearing": {
        "heading": "Hearing",
        "content": "Hearing date: {{date | formatDate}}."
      }
    }
  };

  const MockNunjucksUtils = class NunjucksUtils {
    static renderString(str, placeholder) {
      return nunjucksEnv.renderString(str, placeholder);
    }
  };

  let I18nHelper;
  let express;
  let nunjucksEnv;

  before(() => {
    express = app.init();
    nunjucksEnv = express.njk.env;

    // Register and enable mockery.
    mockery.registerAllowable('app/core/I18nHelper');
    mockery.registerAllowable('lodash');
    mockery.registerMock('app/assets/locale/en', mockedContent);
    mockery.registerMock('app/core/NunjucksUtils', MockNunjucksUtils);
    mockery.enable({
      useCleanCache: true,
      warnOnReplace: false,
      warnOnUnregistered: false
    });

    // Require the class under test.
    I18nHelper = require('app/core/I18nHelper');
  });

  after(() => {
    mockery.disable();
    mockery.deregisterAll();
    I18nHelper = undefined;
    express.server.close();
  });

  describe('calling the setHeadingOnEvent() function', () => {

    before(() => mockedEvents.forEach(event => I18nHelper.setHeadingOnEvent(event)));

    it("should set the heading to 'Hearing' when the contentKey is defined as status.hearing", () => {
      expect(mockedEvents[0].heading).to.equal('Hearing');
    });

    it("should set the heading to 'Hearing booked' when the contentKey is defined as status.hearingBooked", () => {
      expect(mockedEvents[1].heading).to.equal('Hearing booked');
    });

    it("should set the heading to 'DWP response' when the contentKey is defined as status.dwpRespond", () => {
      expect(mockedEvents[2].heading).to.equal('DWP response');
    });

    it("should set the heading to 'Appeal received' when the contentKey is defined as status.appealReceived", () => {
      expect(mockedEvents[3].heading).to.equal('Appeal received');
    });

  });

  describe('calling the setRenderedContentOnEvent() function', () => {

    before(() => mockedEvents.forEach(event => I18nHelper.setRenderedContentOnEvent(event)));

    it('should set the renderedContent property when the contentKey is defined as status.hearing', () => {
      expect(mockedEvents[0].renderedContent[0]).to.equal('Hearing date: 30 November 2016.');
      expect(mockedEvents[0].renderedContent.length).to.equal(1);
    });

    it('should set the renderedContent property when the contentKey is defined as status.hearingBooked', () => {
      expect(mockedEvents[1].renderedContent[0]).to.equal('Hearing booked content line');
      expect(mockedEvents[1].renderedContent.length).to.equal(1);
    });

    it('should set the renderedContent property when the contentKey is defined as status.dwpRespond', () => {
      expect(mockedEvents[2].renderedContent[0]).to.equal('DWP content line 1');
      expect(mockedEvents[2].renderedContent[1]).to.equal('DWP content line 2');
      expect(mockedEvents[2].renderedContent.length).to.equal(2);
    });

    it('should set the renderedContent property when the contentKey is defined as status.appealReceived', () => {
      expect(mockedEvents[3].renderedContent[0]).to.equal('Appeal received: 30 November 2016');
      expect(mockedEvents[3].renderedContent.length).to.equal(1);
    });

  });

  describe('calling the getContent() function', () => {

    it('should retreive the content when using the status.hearing.content key', () => {
      const content = I18nHelper.getContent(mockedContent, 'status.hearing.content');
      expect(content).to.equal('Hearing date: {{date | formatDate}}.');
    });

    it('should retreive the content when using the status.hearingBooked.content key', () => {
      const content = I18nHelper.getContent(mockedContent, 'status.hearingBooked.content');
      expect(content).to.equal('Hearing booked content line');
    });

    it('should retreive the content when using the status.dwpRespond.content key', () => {
      const content = I18nHelper.getContent(mockedContent, 'status.dwpRespond.content');
      expect(content[0]).to.equal('DWP content line 1');
      expect(content[1]).to.equal('DWP content line 2');
    });

    it('should retreive the content when using the status.appealReceived.content key', () => {
      const content = I18nHelper.getContent(mockedContent, 'status.appealReceived.content');
      expect(content).to.equal('Appeal received: {{date | formatDate}}');
    });

    it('should throw an error when encountering an unknown content key', () => {
      expect(() => I18nHelper.getContent(mockedContent, 'rubbish')).to.throw(Error, 'Unkown content key: rubbish');
    });

  });

});
