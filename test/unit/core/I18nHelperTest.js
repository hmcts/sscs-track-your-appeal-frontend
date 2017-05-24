const {expect} = require('test/chai-sinon');
const mockery = require('mockery');
const testServer = require('test/testServer');
const {EVENTS} = require('app/config');
const appeal = require('test/mock/data/hearing.json').appeal;
const nunjucksEnv = require('app/core/NunjucksUtils').env;

describe('I18nHelper', () => {

  const mockedContent = {
    "status": {
      "appealReceived": {
        "heading": "Appeal received",
        "content": "DWP should respond by respond: {{dwpResponseDate|formatDate}}"
      },
      "dwpRespond": {
        "heading": "DWP response",
        "content": [
          "The DWP have written a response to your ESA benefit appeal...",
          "We’re now in the process of booking a hearing... {{hearingContactDate|formatDate}}"
        ]
      },
      "hearingBooked": {
        "heading": "Hearing booked",
        "content": "A hearing has been booked for your appeal"
      },
      "hearing": {
        "heading": "Hearing",
        "content": "Hearing date: {{hearingDate|formatDate}}."
      },
      "evidenceReceived": {
        "heading": "Evidence Received",
        "content": "The {{evidenceType}} evidence you sent was received by us on {{date|formatDate}}"
      }
    }
  };

  const MockNunjucksUtils = class NunjucksUtils {
    static renderString(str, placeholder) {
      return nunjucksEnv.renderString(str, placeholder);
    }
  };

  let I18nHelper;

  before(() => {

    // Register and enable mockery.
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
  });

  describe('Calling the setHeadingOnEvent() function on all historicalEvents', () => {

    before(() => appeal.historicalEvents.forEach(event => I18nHelper.setHeadingOnEvent(event)));

    it("should set the heading to 'Evidence Received' when the contentKey is defined as status.evidenceReceived", () => {
      expect(appeal.historicalEvents[0].heading).to.equal('Evidence Received');
    });

    it("should set the heading to 'Hearing booked' when the contentKey is defined as status.hearingBooked", () => {
      expect(appeal.historicalEvents[1].heading).to.equal('Hearing booked');
    });

    it("should set the heading to 'Evidence Received' when the contentKey is defined as status.evidenceReceived", () => {
      expect(appeal.historicalEvents[2].heading).to.equal('Evidence Received');
    });

    it("should set the heading to 'DWP response' when the contentKey is defined as status.dwpRespond", () => {
      expect(appeal.historicalEvents[3].heading).to.equal('DWP response');
    });

    it("should set the heading to 'Evidence Received' when the contentKey is defined as status.evidenceReceived", () => {
      expect(appeal.historicalEvents[4].heading).to.equal('Evidence Received');
    });

    it("should set the heading to 'Appeal received' when the contentKey is defined as status.appealReceived", () => {
      expect(appeal.historicalEvents[5].heading).to.equal('Appeal received');
    });

  });

  describe('Calling the setRenderedContentOnEvent() function on all historicalEvents', () => {

    before(() => appeal.historicalEvents.forEach(event => I18nHelper.setRenderedContentOnEvent(event)));

    it('should set the renderedContent property when the contentKey is defined as status.evidenceReceived', () => {
      expect(appeal.historicalEvents[0].renderedContent[0]).to.equal('The medical evidence you sent was received by us on 03 May 2017');
      expect(appeal.historicalEvents[0].renderedContent.length).to.equal(1);
    });

    it('should set the renderedContent property when the contentKey is defined as status.hearingBooked', () => {
      expect(appeal.historicalEvents[1].renderedContent[0]).to.equal('A hearing has been booked for your appeal');
      expect(appeal.historicalEvents[1].renderedContent.length).to.equal(1);
    });

    it('should set the renderedContent property when the contentKey is defined as status.evidenceReceived', () => {
      expect(appeal.historicalEvents[2].renderedContent[0]).to.equal('The medical evidence you sent was received by us on 12 April 2017');
      expect(appeal.historicalEvents[2].renderedContent.length).to.equal(1);
    });

    it('should set the renderedContent property when the contentKey is defined as status.dwpRespond', () => {
      expect(appeal.historicalEvents[3].renderedContent[0]).to.equal('The DWP have written a response to your ESA benefit appeal...');
      expect(appeal.historicalEvents[3].renderedContent[1]).to.equal('We’re now in the process of booking a hearing... 24 May 2017');
      expect(appeal.historicalEvents[3].renderedContent.length).to.equal(2);
    });

    it('should set the renderedContent property when the contentKey is defined as status.evidenceReceived', () => {
      expect(appeal.historicalEvents[4].renderedContent[0]).to.equal('The medical evidence you sent was received by us on 10 March 2017');
      expect(appeal.historicalEvents[4].renderedContent.length).to.equal(1);
    });

    it('should set the renderedContent property when the contentKey is defined as status.appealReceived', () => {
      expect(appeal.historicalEvents[5].renderedContent[0]).to.equal('DWP should respond by respond: 12 April 2017');
      expect(appeal.historicalEvents[5].renderedContent.length).to.equal(1);
    });

  });

  describe('Calling the setRenderedContentOnEvent() function on all latestEvents', () => {

    before(() => appeal.latestEvents.forEach((event) => { I18nHelper.setRenderedContentOnEvent(event); }));

    it('should set the renderedContent property when the contentKey is defined as status.hearing', () => {
      expect(appeal.latestEvents[0].renderedContent[0]).to.equal('Hearing date: 30 November 2016.');
      expect(appeal.latestEvents[0].renderedContent.length).to.equal(1);
    });

  });

  describe('Calling the getContent() function', () => {

    it('should retrieve the content when using the status.hearing.content key', () => {
      const content = I18nHelper.getContent(mockedContent, 'status.hearing.content');
      expect(content).to.equal('Hearing date: {{hearingDate|formatDate}}.');
    });

    it('should retrieve the content when using the status.hearingBooked.content key', () => {
      const content = I18nHelper.getContent(mockedContent, 'status.hearingBooked.content');
      expect(content).to.equal('A hearing has been booked for your appeal');
    });

    it('should retrieve the content when using the status.dwpRespond.content key', () => {
      const content = I18nHelper.getContent(mockedContent, 'status.dwpRespond.content');
      expect(content[0]).to.equal('The DWP have written a response to your ESA benefit appeal...');
      expect(content[1]).to.equal('We’re now in the process of booking a hearing... {{hearingContactDate|formatDate}}');
    });

    it('should retrieve the content when using the status.appealReceived.content key', () => {
      const content = I18nHelper.getContent(mockedContent, 'status.appealReceived.content');
      expect(content).to.equal('DWP should respond by respond: {{dwpResponseDate|formatDate}}');
    });

    it('should retrieve the content when using the status.evidenceReceived.content key', () => {
      const content = I18nHelper.getContent(mockedContent, 'status.evidenceReceived.content');
      expect(content).to.equal('The {{evidenceType}} evidence you sent was received by us on {{date|formatDate}}');
    });

    it('should throw an error when encountering an unknown content key', () => {
      expect(() => I18nHelper.getContent(mockedContent, 'rubbish')).to.throw(Error, 'Unkown content key: rubbish');
    });

  });

  describe('Calling the getEventWithMatchingContentKey() function on all historicalEvents', () => {

    it('should filter out the status.appealReceived event from a list of events', () => {
      const appealReceivedEvent = I18nHelper.getEventWithMatchingContentKey(appeal.historicalEvents, EVENTS.APPEAL_RECEIVED.contentKey);
      expect(appealReceivedEvent.contentKey).to.equal(EVENTS.APPEAL_RECEIVED.contentKey);
    });

    it('should filter out the status.dwpRespond event from a list of events', () => {
      const dwpRespondEvent = I18nHelper.getEventWithMatchingContentKey(appeal.historicalEvents, EVENTS.DWP_RESPOND.contentKey);
      expect(dwpRespondEvent.contentKey).to.equal(EVENTS.DWP_RESPOND.contentKey);
    });

    it('should filter out the status.hearingBooked event from a list of events', () => {
      const hearingEvent = I18nHelper.getEventWithMatchingContentKey(appeal.historicalEvents, EVENTS.HEARING_BOOKED.contentKey);
      expect(hearingEvent.contentKey).to.equal(EVENTS.HEARING_BOOKED.contentKey);
    });

    it('should filter out the status.evidenceReceived event from a list of events', () => {
      const evidenceReceivedEvent = I18nHelper.getEventWithMatchingContentKey(appeal.historicalEvents, EVENTS.EVIDENCE_RECEIVED.contentKey);
      expect(evidenceReceivedEvent.contentKey).to.equal(EVENTS.EVIDENCE_RECEIVED.contentKey);
    });

  });

  describe('Calling the getEventWithMatchingContentKey() function passing the latestEvents array', () => {

    let hearingBooked;

    before(() => {
      hearingBooked = require('test/mock/data/hearingBooked.json').appeal;
    });

    it('should filter out the status.evidenceReceived from the latestEvents array', () => {
      const evidenceReceivedEvent = I18nHelper.getEventWithMatchingContentKey(hearingBooked.latestEvents, EVENTS.EVIDENCE_RECEIVED.contentKey);
      expect(evidenceReceivedEvent.contentKey).to.equal(EVENTS.EVIDENCE_RECEIVED.contentKey);
    });

    it('should filter out the status.hearingBooked event from the latestEvents array', () => {
      const hearingBookedEvent = I18nHelper.getEventWithMatchingContentKey(hearingBooked.latestEvents, EVENTS.HEARING_BOOKED.contentKey);
      expect(hearingBookedEvent.contentKey).to.equal(EVENTS.HEARING_BOOKED.contentKey);
    });

  });

  describe('Copying a hearing event and setting the address', () => {

    let hearingEvt;

    before(() => {
      hearingEvt = I18nHelper.getEventWithMatchingContentKey(appeal.latestEvents, EVENTS.HEARING.contentKey);
    });

    it('should return an event that contains the address in a new format', () => {
      const newHearingEvt = I18nHelper.copyEventAndSetHearingAddress(hearingEvt);
      expect(newHearingEvt.address.lines.length).to.equal(2);
      expect(newHearingEvt.address.lines[0]).to.equal(hearingEvt.placeholder.addressLine1);
      expect(newHearingEvt.address.lines[1]).to.equal(hearingEvt.placeholder.addressLine2);
      expect(newHearingEvt.address.postcode).to.equal(hearingEvt.placeholder.postcode);
    });

  });

  describe('Copying a hearing booked event and setting the address', () => {

    let hearingBookedAppeal, hearingBookedEvt;

    before(() => {
      hearingBookedAppeal = require('test/mock/data/hearingBooked.json').appeal;
      hearingBookedEvt = I18nHelper.getEventWithMatchingContentKey(hearingBookedAppeal.latestEvents, EVENTS.HEARING_BOOKED.contentKey);
    });

    it('should return an event that contains the address in a new format', () => {
      const newHearingEvt = I18nHelper.copyEventAndSetHearingAddress(hearingBookedEvt);
      expect(newHearingEvt.address.lines.length).to.equal(2);
      expect(newHearingEvt.address.lines[0]).to.equal(hearingBookedEvt.placeholder.addressLine1);
      expect(newHearingEvt.address.lines[1]).to.equal(hearingBookedEvt.placeholder.addressLine2);
      expect(newHearingEvt.address.postcode).to.equal(hearingBookedEvt.placeholder.postcode);
    });

  });

});
