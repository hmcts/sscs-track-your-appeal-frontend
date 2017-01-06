const _ = require('lodash');
const locale = require('app/assets/locale/en');
const NunjucksUtils = require('app/core/NunjucksUtils');

const SUBKEYS = {
  HEADING: '.heading',
  CONTENT: '.content'
};

class I18nHelper {

  static setHeadingAndRenderedContentOnEvents(events) {
    events.forEach(event => {
      I18nHelper.setHeadingOnEvent(event);
      I18nHelper.setRenderedContentOnEvent(event);
    });
  }

  static setHeadingOnEvent(event) {
    event.heading = I18nHelper.getContent(locale, event.contentKey + SUBKEYS.HEADING);
  }

  static setRenderedContentOnEvent(event) {
    let content = I18nHelper.getContent(locale, event.contentKey + SUBKEYS.CONTENT);
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
}

module.exports = I18nHelper;
