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
      "adjourned": {
        "heading": "Adjourned",
        "content": [
          "...you should receive by {{adjournedLetterReceivedByDate|formatDate}}.",
          "We’ll contact you by {{hearingContactDate|formatDate}} to let you know..."
        ]
      },
      "appealReceived": {
        "heading": "Appeal received",
        "content": "DWP should respond by respond: {{dwpResponseDate|formatDate}}"
      },
      "dormant": {
        "heading": "Dormant",
        "content": [
          "The DWP have told us they changed their decision...",
          "If you have any questions relating to your benefits, contact the DWP..."
        ]
      },
      "dwpRespond": {
        "heading": "DWP response",
        "content": [
          "The DWP have written a response to your ESA benefit appeal...",
          "We’re now in the process of booking a hearing... {{hearingContactDate|formatDate}}"
        ]
      },
      "evidenceReceived": {
        "heading": "Evidence received",
        "content": "The {{evidenceType}} evidence you sent was received by us on {{date|formatDate}}"
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
  });

  describe('Calling the setHeadingOnEvent() function on all historicalEvents', () => {

    let appeal;

    before( ()=> {
      appeal = new Appeal(cloneDeep(hearing));
      appeal.historicalEvents.forEach((historicalEvent) => {
        appeal.setHeadingOnEvent(historicalEvent);
      })
    });

    it("should set the heading to 'Dormant' when the contentKey is defined as status.dormant", () => {
      expect(appeal.historicalEvents[0].heading).to.equal('Dormant');
    });

    it("should set the heading to 'Hearing booked' when the contentKey is defined as status.hearingBooked", () => {
      expect(appeal.historicalEvents[1].heading).to.equal('Hearing booked');
    });

    it("should set the heading to 'Evidence Received' when the contentKey is defined as status.evidenceReceived", () => {
      expect(appeal.historicalEvents[2].heading).to.equal('Adjourned');
    });

    it("should set the heading to 'Hearing booked' when the contentKey is defined as status.hearingBooked", () => {
      expect(appeal.historicalEvents[3].heading).to.equal('Hearing booked');
    });

    it("should set the heading to 'DWP response' when the contentKey is defined as status.dwpRespond", () => {
      expect(appeal.historicalEvents[4].heading).to.equal('DWP response');
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

    it('should set the renderedContent property when the contentKey is defined as status.dormant', () => {
      expect(appeal.historicalEvents[0].renderedContent[0]).to.equal('The DWP have told us they changed their decision...');
      expect(appeal.historicalEvents[0].renderedContent[1]).to.equal('If you have any questions relating to your benefits, contact the DWP...');
      expect(appeal.historicalEvents[0].renderedContent.length).to.equal(2);
    });

    it('should set the renderedContent property when the contentKey is defined as status.hearingBooked', () => {
      expect(appeal.historicalEvents[1].renderedContent[0]).to.equal('A hearing has been booked for your appeal');
      expect(appeal.historicalEvents[1].renderedContent.length).to.equal(1);
    });

    it('should set the renderedContent property when the contentKey is defined as status.adjourned', () => {
      expect(appeal.historicalEvents[2].renderedContent[0]).to.equal('...you should receive by 19 November 2009.');
      expect(appeal.historicalEvents[2].renderedContent[1]).to.equal('We’ll contact you by 24 December 2009 to let you know...');
      expect(appeal.historicalEvents[2].renderedContent.length).to.equal(2);
    });

    it('should set the renderedContent property when the contentKey is defined as status.hearingBooked', () => {
      expect(appeal.historicalEvents[3].renderedContent[0]).to.equal('A hearing has been booked for your appeal');
      expect(appeal.historicalEvents[3].renderedContent.length).to.equal(1);
    });

    it('should set the renderedContent property when the contentKey is defined as status.dwpRespond', () => {
      expect(appeal.historicalEvents[4].renderedContent[0]).to.equal('The DWP have written a response to your ESA benefit appeal...');
      expect(appeal.historicalEvents[4].renderedContent[1]).to.equal('We’re now in the process of booking a hearing... 28 July 2009');
      expect(appeal.historicalEvents[4].renderedContent.length).to.equal(2);
    });

    it('should set the renderedContent property when the contentKey is defined as status.appealReceived', () => {
      expect(appeal.historicalEvents[5].renderedContent[0]).to.equal('DWP should respond by respond: 17 July 2009');
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
      expect(appeal.latestEvents[0].renderedContent[0]).to.equal('Your hearing took place on 11 September 2010... should have arrived at your registered address by 18 September 2010.');
      expect(appeal.latestEvents[0].renderedContent[1]).to.equal('We can’t publish the decision online or tell you over the phone...');
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

  describe('Setting the showEvidenceReminder flag to true', () => {

    const showEvidence = [
      { status: events.ADJOURNED.name },
      { status: events.APPEAL_RECEIVED.name },
      { status: events.DWP_RESPOND.name },
      { status: events.DWP_RESPOND_OVERDUE.name },
      { status: events.HEARING_BOOKED.name },
      { status: events.NEW_HEARING_BOOKED.name },
      { status: events.PAST_HEARING_BOOKED.name },
      { status: events.POSTPONED.name }
    ];

    showEvidence.forEach((appeal) => {
      it(`should set showEvidenceReminder to true when the case status is ${appeal.status}`, () => {
        const appealInstance = new Appeal(appeal);
        expect(appealInstance.showEvidenceReminder).to.eq(true);
      });
    });

  });

  describe('Setting the showEvidenceReminder flag to false', () => {

    const hideEvidence = [
      { status: events.CLOSED.name },
      { status: events.DORMANT.name },
      { status: events.EVIDENCE_RECEIVED.name },
      { status: events.HEARING.name },
      { status: events.LAPSED_REVISED.name },
      { status: events.WITHDRAWN.name }
    ];

    hideEvidence.forEach((appeal) => {
      it(`should set showEvidenceReminder to false when the case status is ${appeal.status}`, () => {
        const appealInstance = new Appeal(appeal);
        expect(appealInstance.showEvidenceReminder).to.eq(false);
      });
    });

  });

  describe('Calling the setEvidenceReceivedFlag() function', () => {


    let mockAppeal = {
      appeal: {
        latestEvents: [],
        historicalEvents: []
      }
    };

    let evidenceRecived = {
      contentKey: "status.evidenceReceived"
    };

    beforeEach(() => {
      appeal = new Appeal(cloneDeep(mockAppeal.appeal));
    });

    let appeal;

    it('should set evidenceReceived to false by default', () => {
      expect(appeal.evidenceReceived).to.eq(false);
    });

    it('should set evidenceReceived to false when the evidence received event does not exist in either the latestEvents array or the historicalEvents array', () => {
      appeal.setEvidenceReceivedFlag();
      expect(appeal.evidenceReceived).to.eq(false);
    });

    it('should set evidenceReceived to true when the evidence received event exists in the latestEvents array', () => {
      appeal.latestEvents.push(evidenceRecived);
      appeal.setEvidenceReceivedFlag();
      expect(appeal.evidenceReceived).to.eq(true);
    });

    it('should set evidenceReceived to true when the evidence received event exists in the historicalEvents array', () => {
      appeal.historicalEvents.push(evidenceRecived);
      appeal.setEvidenceReceivedFlag();
      expect(appeal.evidenceReceived).to.eq(true);
    });

    it('should set evidenceReceived to true when the evidence received event exists in both the latestEvents and historicalEvents arrays', () => {
      appeal.latestEvents.push(evidenceRecived);
      appeal.historicalEvents.push(evidenceRecived);
      appeal.setEvidenceReceivedFlag();
      expect(appeal.evidenceReceived).to.eq(true);
    });

  });

  describe('Calling the reformatAllHearingDetails() function', () => {

    let appeal;

    before( ()=> {
      appeal = new Appeal(cloneDeep(hearingBooked));
    });

    it('should not blow up if the events are undefined', () => {
      appeal.reformatAllHearingDetails(undefined);
      expect(appeal.latestEvents[0].hearingAddress).to.equal(undefined);
      expect(appeal.historicalEvents[1].hearingAddress).to.equal(undefined);
    });

    it('should loop over the latest events and reformat the hearing address details', () => {
      appeal.reformatAllHearingDetails(appeal.latestEvents);
      expect(appeal.latestEvents[1].hearingAddress.lines.length).to.equal(4);
      expecttheHearingAddressToBeReformated(appeal.latestEvents, 1);
    });

    it('should loop over all historical events and reformat the hearing address details', () => {
      appeal.reformatAllHearingDetails(appeal.historicalEvents);
      expecttheHearingAddressToBeReformated(appeal.historicalEvents, 2);
      expecttheHearingAddressToBeReformated(appeal.historicalEvents, 4);
      expecttheHearingAddressToBeReformated(appeal.historicalEvents, 8);
    });

  });

  describe('Calling the reformatHearingDetails() function', () => {

    let hearingEvent = {
      placeholder: {
        venueName: '  Fox Court  ',
        addressLine1: '  4th Floor  ',
        addressLine2: '  30 Brooke Street ',
        addressLine3: null,
        addressLine4: undefined,
        addressLine5: '   ',
        postcode: '  EC1N 7RS  '
      }
    }, appeal;

    before( ()=> {
      appeal = new Appeal({});
    });

    it('should ignore address lines that are null or undefined and trim all address lines', () => {
      appeal.reformatHearingDetails(hearingEvent);
      expect(hearingEvent.hearingAddress.lines[0]).to.eq('Fox Court');
      expect(hearingEvent.hearingAddress.lines[1]).to.eq('4th Floor');
      expect(hearingEvent.hearingAddress.lines[2]).to.eq('30 Brooke Street');
      expect(hearingEvent.hearingAddress.lines[3]).to.eq('EC1N 7RS');
      expect(hearingEvent.hearingAddress.lines.length).to.eq(4);
    });

  });

  function expecttheHearingAddressToBeReformated(events, index) {
    expect(events[index].hearingAddress.lines.length).to.equal(4);
    expect(events[index].hearingAddress.lines[0]).to.equal(events[index].placeholder.venueName.trim());
    expect(events[index].hearingAddress.lines[1]).to.equal(events[index].placeholder.addressLine1.trim());
    expect(events[index].hearingAddress.lines[2]).to.equal(events[index].placeholder.addressLine2.trim());
    expect(events[index].hearingAddress.lines[3]).to.equal(events[index].placeholder.postcode.trim());
  }

});
