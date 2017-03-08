const _ = require('lodash');
const locale = require('app/assets/locale/en');
const NunjucksUtils = require('app/core/NunjucksUtils');
const {CONTENT_KEYS, CONTENT_SUBKEYS} = require('app/config');

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
    event.heading = I18nHelper.getContent(locale, event.contentKey + CONTENT_SUBKEYS.HEADING);
  }

  static setRenderedContentOnEvent(event) {
    let content = I18nHelper.getContent(locale, event.contentKey + CONTENT_SUBKEYS.CONTENT);
    if (typeof content === 'string') {
      content = [content];
    }

    // Safely remove this when the evidence received date has moved from
    // the event to the event.placeholder.
    if(event.contentKey === CONTENT_KEYS.EVIDENCE_RECEIVED) {
      event.placeholder.date = event.date;
    }

    event.renderedContent = I18nHelper.getRenderedContent(content, event.placeholder);
  }

  static getContent(obj, contentKey) {
    let content = _.get(obj, contentKey);
    if (content === undefined) {
      throw new Error('Unkown content key: ' + contentKey);
    }
    return content;
  }

  static getRenderedContent(content, placeholder) {
    return content.map((str) => {
      return NunjucksUtils.renderString(str, placeholder);
    });
  }

  static setHearingOnAppeal(appeal, contentKey) {
    let event = I18nHelper.getEventWithMatchingContentKey(appeal.latestEvents, contentKey);
    appeal.hearing = I18nHelper.copyEventAndSetHearingAddress(event);
  }

  static getEventWithMatchingContentKey(events, contentKey) {
    return events.filter(event => {
      return event.contentKey === contentKey;
    })[0];
  }

  static copyEventAndSetHearingAddress(event) {
    let copyEvent = Object.assign({}, event);

    if(!copyEvent.placeholder) {
      return copyEvent;
    }

    // Create the hearing address object.
    copyEvent.address = {};
    copyEvent.address.lines = [];

    // Add the address lines.
    for (let property in copyEvent.placeholder) {
      if (_.startsWith(property, ADDRESS_LINE)) {
        copyEvent.address.lines.push(copyEvent.placeholder[property]);
      }
    }

    // Finally set the postcode.
    copyEvent.address.postcode = copyEvent.placeholder.postcode;

    return copyEvent;
  }
}

module.exports = I18nHelper;
