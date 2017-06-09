const { get, startsWith } = require('lodash');
const locale = require('app/assets/locale/en');
const NunjucksUtils = require('app/core/NunjucksUtils');
const {events, contentSubKeys} = require('app/config');

const ADDRESS_LINE = 'addressLine';

class I18nHelper {

  static setHeadingAndRenderedContentOnEvents(events) {
    events = events || [];
    events.forEach(event => {
      I18nHelper.setHeadingOnEvent(event);
      I18nHelper.setRenderedContentOnEvent(event);
    });
  }

  static setRenderedContentOnEvents(events) {
    events = events || [];
    events.forEach(event => {
      I18nHelper.setRenderedContentOnEvent(event);
    });
  }

  static setHeadingOnEvent(event) {
    event.heading = I18nHelper.getContent(locale, event.contentKey + contentSubKeys.HEADING);
  }

  static setRenderedContentOnEvent(event) {
    let content = I18nHelper.getContent(locale, event.contentKey + contentSubKeys.CONTENT);
    if (typeof content === 'string') {
      content = [content];
    }

    if(event.type === events.EVIDENCE_RECEIVED.name || event.type === events.HEARING.name) {
      event.placeholder.date = event.date;
    }

    event.renderedContent = I18nHelper.getRenderedContent(content, event.placeholder);
  }

  static reformatAndSetHearingDetailsOnEvents(evnts) {
    evnts = evnts || [];
    evnts.forEach(event => {
      if(event.type === events.HEARING_BOOKED.name && event.placeholder) {
        event.hearingAddress = {};
        event.hearingAddress.lines = [event.placeholder.venueName];
        for (const property in event.placeholder) {
          if (startsWith(property, ADDRESS_LINE)) {
            if(event.placeholder[property].trim()) {
              event.hearingAddress.lines.push(event.placeholder[property]);
            }
          }
        }
        event.hearingAddress.lines.push(event.placeholder.postcode);
      }
    });
  }

  static getContent(obj, contentKey) {
    let content = get(obj, contentKey);
    if (content === undefined) {
      throw new Error('Unknown content key: ' + contentKey);
    }
    return content;
  }

  static getRenderedContent(content, placeholder) {
    return content.map((str) => {
      return NunjucksUtils.renderString(str, placeholder);
    });
  }

  static getEventWithMatchingContentKey(events, contentKey) {
    return events.filter(event => {
      return event.contentKey === contentKey;
    })[0];
  }
}

module.exports = I18nHelper;
