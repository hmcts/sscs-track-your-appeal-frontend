const _ = require('lodash');
const locale = require('app/assets/locale/en');
const NunjucksUtils = require('app/core/NunjucksUtils');
const {CONTENT_SUBKEYS} = require('app/config');

const ADDRESS_LINE = 'addressLine';

class I18nHelper {

  static setHeadingAndRenderedContentOnEvents(events) {
    events.forEach(event => {
      I18nHelper.setHeadingOnEvent(event);
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
    let event = I18nHelper.getEventWithMatchingContentKey(appeal.events, contentKey);
    appeal.hearing = I18nHelper.copyEventAndSetAddress(event);
  }

  static getEventWithMatchingContentKey(events, contentKey) {
    return events.filter(event => {
      return event.contentKey === contentKey;
    })[0];
  }

  static copyEventAndSetAddress(event) {
    let copyEvent = Object.assign({}, event);
    copyEvent.address = {};
    copyEvent.address.postcode = copyEvent.placeholder.postcode;
    copyEvent.address.lines = [];
    for (let property in copyEvent.placeholder) {
      if (_.startsWith(property, ADDRESS_LINE)) {
        copyEvent.address.lines.push(copyEvent.placeholder[property]);
      }
    }
    return copyEvent;
  }
}

module.exports = I18nHelper;
