const {cloneDeep} = require('lodash');
const {expect} = require('test/chai-sinon');
const {events} = require('app/core/events');
const mockery = require('mockery');
const testServer = require('test/testServer');
const nunjucksEnv = require('app/core/NunjucksUtils').env;
const hearingBooked = require('test/mock/data/hearingBooked.json').appeal;
const hearing = require('test/mock/data/hearing.json').appeal;

describe('Appeal', () => {

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
        "content": [
          "Your hearing took place on {{date|formatDate}}... should have arrived at your registered address by {{decisionLetterReceiveByDate|formatDate}}.",
          "We can’t publish the decision online or tell you over the phone..."
        ]
      },
      "evidenceReceived": {
        "heading": "Evidence received",
        "content": "The {{evidenceType}} evidence you sent was received by us on {{date|formatDate}}"
      }
    }
  };

  const MockNunjucksUtils = class NunjucksUtils {
    static renderString(str, placeholder) {
      return nunjucksEnv.renderString(str, placeholder);
    }
  };

  let Appeal;

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
    Appeal = require('app/core/Appeal');
  });

  after(() => {
    mockery.disable();
    mockery.deregisterAll();
    Appeal = undefined;
  });

  describe('Calling the setHeadingOnEvent() function on all historicalEvents', () => {

    let appeal;

    before( ()=> {
      appeal = new Appeal(cloneDeep(hearing));
      appeal.historicalEvents.forEach((historicalEvent) => {
        appeal.setHeadingOnEvent(historicalEvent);
      })
    });

    it("should set the heading to 'Evidence received' when the contentKey is defined as status.evidenceReceived", () => {
      expect(appeal.historicalEvents[0].heading).to.equal('Evidence received');
    });

    it("should set the heading to 'Hearing booked' when the contentKey is defined as status.hearingBooked", () => {
      expect(appeal.historicalEvents[1].heading).to.equal('Hearing booked');
    });

    it("should set the heading to 'Evidence Received' when the contentKey is defined as status.evidenceReceived", () => {
      expect(appeal.historicalEvents[2].heading).to.equal('Evidence received');
    });

    it("should set the heading to 'DWP response' when the contentKey is defined as status.dwpRespond", () => {
      expect(appeal.historicalEvents[3].heading).to.equal('DWP response');
    });

    it("should set the heading to 'Evidence Received' when the contentKey is defined as status.evidenceReceived", () => {
      expect(appeal.historicalEvents[4].heading).to.equal('Evidence received');
    });

    it("should set the heading to 'Appeal received' when the contentKey is defined as status.appealReceived", () => {
      expect(appeal.historicalEvents[5].heading).to.equal('Appeal received');
    });

  });

  describe('Calling the setRenderedContentOnEvent() function on all historicalEvents', () => {

    let appeal;

    before( ()=> {
      appeal = new Appeal(cloneDeep(hearing));
      appeal.historicalEvents.forEach((historicalEvent) => {
        appeal.setRenderedContentOnEvent(historicalEvent);
      })
    });

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

    let appeal;

    before( ()=> {
      appeal = new Appeal(cloneDeep(hearing));
      appeal.latestEvents.forEach((latestEvent) => {
        appeal.setRenderedContentOnEvent(latestEvent);
      })
    });

    it('should set the renderedContent property when the contentKey is defined as status.hearing', () => {
      expect(appeal.latestEvents[0].renderedContent[0]).to.equal('Your hearing took place on 17 April 2010... should have arrived at your registered address by 24 April 2010.');
      expect(appeal.latestEvents[0].renderedContent.length).to.equal(2);
    });

  });

  describe('Calling the getContent() function', () => {

    let appeal;

    before( ()=> {
      appeal = new Appeal(cloneDeep(hearing));
    });

    it('should retrieve the content when using the status.hearing.content key', () => {
      const content = appeal.getContent('status.hearing.content');
      expect(content).to.equal(mockedContent.status.hearing.content);
    });

    it('should retrieve the content when using the status.hearingBooked.content key', () => {
      const content = appeal.getContent('status.hearingBooked.content');
      expect(content).to.equal('A hearing has been booked for your appeal');
    });

    it('should retrieve the content when using the status.dwpRespond.content key', () => {
      const content = appeal.getContent('status.dwpRespond.content');
      expect(content[0]).to.equal('The DWP have written a response to your ESA benefit appeal...');
      expect(content[1]).to.equal('We’re now in the process of booking a hearing... {{hearingContactDate|formatDate}}');
    });

    it('should retrieve the content when using the status.appealReceived.content key', () => {
      const content = appeal.getContent('status.appealReceived.content');
      expect(content).to.equal('DWP should respond by respond: {{dwpResponseDate|formatDate}}');
    });

    it('should retrieve the content when using the status.evidenceReceived.content key', () => {
      const content = appeal.getContent('status.evidenceReceived.content');
      expect(content).to.equal('The {{evidenceType}} evidence you sent was received by us on {{date|formatDate}}');
    });

    it('should throw an error when encountering an unknown content key', () => {
      expect(() => appeal.getContent('unknown')).to.throw(Error, 'Unknown content key: unknown');
    });

  });

  describe('Calling the getFirstEventWithMatchingContentKey() function on all historicalEvents', () => {

    let appeal;

    before( ()=> {
      appeal = new Appeal(cloneDeep(hearing));
    });

    it('should filter out the status.appealReceived event from a list of events', () => {
      const appealReceivedEvent = appeal.getFirstEventWithMatchingContentKey(appeal.historicalEvents, events.APPEAL_RECEIVED.contentKey);
      expect(appealReceivedEvent.contentKey).to.equal(events.APPEAL_RECEIVED.contentKey);
    });

    it('should filter out the status.dwpRespond event from a list of events', () => {
      const dwpRespondEvent = appeal.getFirstEventWithMatchingContentKey(appeal.historicalEvents, events.DWP_RESPOND.contentKey);
      expect(dwpRespondEvent.contentKey).to.equal(events.DWP_RESPOND.contentKey);
    });

    it('should filter out the status.hearingBooked event from a list of events', () => {
      const hearingEvent = appeal.getFirstEventWithMatchingContentKey(appeal.historicalEvents, events.HEARING_BOOKED.contentKey);
      expect(hearingEvent.contentKey).to.equal(events.HEARING_BOOKED.contentKey);
    });

    it('should filter out the status.evidenceReceived event from a list of events', () => {
      const evidenceReceivedEvent = appeal.getFirstEventWithMatchingContentKey(appeal.historicalEvents, events.EVIDENCE_RECEIVED.contentKey);
      expect(evidenceReceivedEvent.contentKey).to.equal(events.EVIDENCE_RECEIVED.contentKey);
    });

  });

  describe('Calling the getFirstEventWithMatchingContentKey() function passing the latestEvents array', () => {

    let appeal;

    before( ()=> {
      appeal = new Appeal(cloneDeep(hearingBooked));
    });

    it('should filter out the status.evidenceReceived from the latestEvents array', () => {
      const evidenceReceivedEvent = appeal.getFirstEventWithMatchingContentKey(appeal.latestEvents, events.EVIDENCE_RECEIVED.contentKey);
      expect(evidenceReceivedEvent.contentKey).to.equal(events.EVIDENCE_RECEIVED.contentKey);
    });

    it('should filter out the status.hearingBooked event from the latestEvents array', () => {
      const hearingBookedEvent = appeal.getFirstEventWithMatchingContentKey(appeal.latestEvents, events.HEARING_BOOKED.contentKey);
      expect(hearingBookedEvent.contentKey).to.equal(events.HEARING_BOOKED.contentKey);
    });

  });

  describe('Calling the reformatAndSetHearingDetailsOnEvents() function', () => {

    let appeal;

    before( ()=> {
      appeal = new Appeal(cloneDeep(hearingBooked));
    });

    it('should do nothing if the events are undefined', () => {
      appeal.reformatAndSetHearingDetailsOnEvents(undefined);
      expect(appeal.latestEvents[0].hearingAddress).to.equal(undefined);
      expect(appeal.latestEvents[1].hearingAddress).to.equal(undefined);
    });

    it('should loop over the latest events and reformat the hearing address details', () => {
      appeal.reformatAndSetHearingDetailsOnEvents(appeal.latestEvents);
      expect(appeal.latestEvents[1].hearingAddress.lines.length).to.equal(4);
      expecttheHearingAddressToBeReformated(appeal.latestEvents, 1);
    });

    it('should loop over all historical events and reformat the hearing address details', () => {
      appeal.reformatAndSetHearingDetailsOnEvents(appeal.historicalEvents);
      expecttheHearingAddressToBeReformated(appeal.historicalEvents, 2);
      expecttheHearingAddressToBeReformated(appeal.historicalEvents, 4);
      expecttheHearingAddressToBeReformated(appeal.historicalEvents, 8);
    });

  });

  function expecttheHearingAddressToBeReformated(events, index) {
    expect(events[index].hearingAddress.lines.length).to.equal(4);
    expect(events[index].hearingAddress.lines[0]).to.equal(events[index].placeholder.venueName);
    expect(events[index].hearingAddress.lines[1]).to.equal(events[index].placeholder.addressLine1);
    expect(events[index].hearingAddress.lines[2]).to.equal(events[index].placeholder.addressLine2);
    expect(events[index].hearingAddress.lines[3]).to.equal(events[index].placeholder.postcode);
  }

});
