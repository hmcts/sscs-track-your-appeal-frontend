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
