const { events } = require('app/core/events');
const { startsWith } = require('lodash');

const ADDRESS_LINE = 'addressLine';

const getFirstEventWithMatchingContentKey = (evnts, contentKey) => {
  return evnts.filter(event => {
    return event.contentKey === contentKey;
  })[0];
};


const setLatestHearingBookedEventOnAppeal = appeal => {
  if (appeal.status === events.HEARING_BOOKED.name) {
    appeal.latestHearingBookedEvent = getFirstEventWithMatchingContentKey(
      appeal.latestEvents, events.HEARING_BOOKED.contentKey);
  } else if (appeal.status === events.HEARING.name) {
    appeal.latestHearingBookedEvent = getFirstEventWithMatchingContentKey(
      appeal.historicalEvents, events.HEARING_BOOKED.contentKey);
  }
};

const reformatHearingBookedEvents = (evnts = []) => {
  evnts.forEach(event => {
    if (event.type === events.HEARING_BOOKED.name) {
      event.hearingAddress = { lines: [] };

      // Venue name
      if (event.venueName) {
        const venueName = event.venueName.trim();
        if (venueName) {
          event.hearingAddress.lines.push(venueName);
        }
      }

      // Address lines
      for (const property in event) {
        if (startsWith(property, ADDRESS_LINE) && event[property]) {
          const addressLine = event[property].trim();
          if (addressLine) {
            event.hearingAddress.lines.push(addressLine);
          }
        }
      }

      // Postcode
      if (event.postcode) {
        const postcode = event.postcode.trim();
        if (postcode) {
          event.hearingAddress.lines.push(postcode);
        }
      }
    }
  });
};

const reformatHearingDetails = (req, res, next) => {
  const appeal = res.locals.appeal;
  reformatHearingBookedEvents(appeal.latestEvents);
  reformatHearingBookedEvents(appeal.historicalEvents);
  setLatestHearingBookedEventOnAppeal(appeal);

  next();
};

module.exports = { reformatHearingDetails };
