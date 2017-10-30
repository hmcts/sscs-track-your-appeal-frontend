const {getContent} = require('app/core/contentLookup');
const {startsWith,includes} = require('lodash');
const {contentSubKeys} = require('app/config');
const {events} = require('app/core/events');
const NunjucksUtils = require('app/core/NunjucksUtils');

const ADDRESS_LINE = 'addressLine';

const showEvidenceReminderStatuses = [
  events.ADJOURNED.name,
  events.APPEAL_RECEIVED.name,
  events.DWP_RESPOND.name,
  events.DWP_RESPOND_OVERDUE.name,
  events.HEARING_BOOKED.name,
  events.NEW_HEARING_BOOKED.name,
  events.PAST_HEARING_BOOKED.name,
  events.POSTPONED.name
];

class Appeal {

  constructor(appeal) {
    this.caseReference = appeal.caseReference;
    this.appealNumber = appeal.appealNumber;
    this.name = appeal.name;
    this.benefitType = appeal.benefitType;
    this.status = appeal.status;
    this.evidenceReceived = false;
    this.showEvidenceReminder = includes(showEvidenceReminderStatuses, this.status);
    this.latestEvents = appeal.latestEvents || [];
    this.historicalEvents = appeal.historicalEvents || [];
  }

  decorate() {
    this.setHeadingAndRenderedContentOnEvents(this.latestEvents);
    this.setHeadingAndRenderedContentOnEvents(this.historicalEvents);
    this.reformatAllHearingDetails(this.latestEvents);
    this.reformatAllHearingDetails(this.historicalEvents);
    this.setLatestHearingBookedEventOnAppeal();

    if(this.showEvidenceReminder) {
      this.setEvidenceReceivedFlag();
    }
  }

  setHeadingAndRenderedContentOnEvents(events) {
    events.forEach(event => {
      this.setHeadingOnEvent(event);
      this.setRenderedContentOnEvent(event);
    });
  }

  setLatestHearingBookedEventOnAppeal() {
    if(this.status === events.HEARING_BOOKED.name) {
      this.latestHearingBookedEvent = this.getFirstEventWithMatchingContentKey(
        this.latestEvents, events.HEARING_BOOKED.contentKey);
    }

    if(this.status === events.HEARING.name) {
      this.latestHearingBookedEvent = this.getFirstEventWithMatchingContentKey(
        this.historicalEvents, events.HEARING_BOOKED.contentKey);
    }
  }

  setEvidenceReceivedFlag() {
    let evidenceRecievedInLatestEvents = this.getFirstEventWithMatchingContentKey(
      this.latestEvents, events.EVIDENCE_RECEIVED.contentKey);
    let evidenceRecievedInHistoricalEvents = this.getFirstEventWithMatchingContentKey(
      this.historicalEvents, events.EVIDENCE_RECEIVED.contentKey);

    this.evidenceReceived = !!(evidenceRecievedInLatestEvents || evidenceRecievedInHistoricalEvents);
  }

  reformatAllHearingDetails(evnts) {
    evnts = evnts || [];
    evnts.forEach(event => {
      if(event.type === events.HEARING_BOOKED.name) {
        this.reformatHearingDetails(event);
      }
    });
  }

  reformatHearingDetails(event) {

    if(!event.placeholder) {
      return;
    }

    event.hearingAddress = {
      lines: []
    };

    // Venue name
    if(event.placeholder.venueName) {
      const venueName = event.placeholder.venueName.trim();
      if(venueName) {
        event.hearingAddress.lines.push(venueName);
      }
    }

    // Address lines
    for (const property in event.placeholder) {
      if (startsWith(property, ADDRESS_LINE) && event.placeholder[property]) {
        const addressLine = event.placeholder[property].trim();
        if(addressLine) {
          event.hearingAddress.lines.push(addressLine);
        }
      }
    }

    // Postcode
    if(event.placeholder.postcode) {
      const postcode = event.placeholder.postcode.trim();
      if(postcode) {
        event.hearingAddress.lines.push(postcode);
      }
    }
  }

  getFirstEventWithMatchingContentKey(events, contentKey) {
    return events.filter(event => {
      return event.contentKey === contentKey;
    })[0];
  }

  setHeadingOnEvent(event) {
    event.heading = getContent(event.contentKey + contentSubKeys.HEADING);
  }

  setRenderedContentOnEvent(event) {
    let content= getContent(event.contentKey + contentSubKeys.CONTENT);

    if (typeof content === 'string') {
      content = [content];
    }

    // Both of these should be done in the API.
    this.setDateOnPlaceholderFields(event);
    this.setBenefitTypeOnPlaceholderFields(event);

    event.renderedContent = this.getRenderedContent(content, event.placeholder);
  }

  getRenderedContent(content, placeholder) {
    return content.map((str) => {
      return NunjucksUtils.renderString(str, placeholder);
    });
  }

  setDateOnPlaceholderFields(event) {
    if(event.type === events.EVIDENCE_RECEIVED.name ||
       event.type === events.HEARING.name ||
       event.type === events.DORMANT.name) {

       event.placeholder.date = event.date;
    }
  }

  setBenefitTypeOnPlaceholderFields(event) {
    if(event.type === events.CLOSED.name ||
       event.type === events.DORMANT.name ||
       event.type === events.DWP_RESPOND.name ||
       event.type === events.HEARING.name ||
       event.type === events.LAPSED_REVISED.name ||
       event.type === events.PAST_HEARING_BOOKED.name ||
       event.type === events.POSTPONED.name) {

      if(!event.placeholder) {
        event.placeholder = {};
      }

      event.placeholder.benefitType = this.benefitType;
    }
  }
}

module.exports = Appeal;
