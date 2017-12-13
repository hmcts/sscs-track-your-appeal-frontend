const {events} = require('app/core/events');
const {startsWith} = require('lodash');

const ADDRESS_LINE = 'addressLine';

const reformatHearingDetails = (req, res, next) => {
  apply(res.locals.appeal);
  next();
};

const apply = (appeal) => {
  reformatAllHearingDetails(appeal.latestEvents);
  reformatAllHearingDetails(appeal.historicalEvents);
  setLatestHearingBookedEventOnAppeal(appeal);
};

const reformatAllHearingDetails = (evnts) => {
  evnts = evnts || [];
  evnts.forEach(event => {
    if(event.type === events.HEARING_BOOKED.name) {
      reformat(event);
    }
  });
};

const reformat = (event) => {

  event.hearingAddress = {
    lines: []
  };

  // Venue name
  if(event.venueName) {
    const venueName = event.venueName.trim();
    if(venueName) {
      event.hearingAddress.lines.push(venueName);
    }
  }

  // Address lines
  for (const property in event) {
    if (startsWith(property, ADDRESS_LINE) && event[property]) {
      const addressLine = event[property].trim();
      if(addressLine) {
        event.hearingAddress.lines.push(addressLine);
      }
    }
  }

  // Postcode
  if(event.postcode) {
    const postcode = event.postcode.trim();
    if(postcode) {
      event.hearingAddress.lines.push(postcode);
    }
  }
};

const setLatestHearingBookedEventOnAppeal = (appeal) => {
  if(appeal.status === events.HEARING_BOOKED.name) {
    appeal.latestHearingBookedEvent = getFirstEventWithMatchingContentKey(
      appeal.latestEvents, events.HEARING_BOOKED.contentKey);
  } else if(appeal.status === events.HEARING.name) {
    appeal.latestHearingBookedEvent = getFirstEventWithMatchingContentKey(
      appeal.historicalEvents, events.HEARING_BOOKED.contentKey);
  }
};

const getFirstEventWithMatchingContentKey = (events, contentKey) =>
  events.filter(event => event.contentKey === contentKey)[0];

module.exports = { reformatHearingDetails };
