const screenReaderHelper = require('app/core/ScreenReaderHelper');
const {dateFormat, timeZone} = require('app/config');
const {events} = require('app/core/events');
const {getContent} = require('app/core/contentLookup');
const moment = require('moment-timezone');

const keys = {
  BENEFIT_TYPES: 'benefitTypes',
  SHORT: 'short',
  LONG: 'long'
};

const filters = {

  json: (obj) => {
    return JSON.stringify(obj, null, 2);
  },

  formatDate: (utcDateTimeStr) => {
    return moment.tz(utcDateTimeStr, timeZone).format(dateFormat.date);
  },

  formatTime: (utcDateTimeStr) => {
    return moment.tz(utcDateTimeStr, timeZone).format(dateFormat.time);
  },

  isActive: (currentStatus, status) => {
    return events[currentStatus].index >= events[status].index ? 'active' : '';
  },

  isCurrent: (currentStatus, status) => {
    return events[currentStatus].index === events[status].index ? 'current' : ''
  },

  getScreenReaderTextFor: (currentStatus, progressBarTick) => {
    return screenReaderHelper.getScreenReaderTextFor(currentStatus, progressBarTick);
  },

  benefitType: (str, benefitType, format = keys.SHORT) => {
    return NunjucksUtils.renderString(str, {
      benefitType: getContent(`${keys.BENEFIT_TYPES}.${benefitType}.${format}`)
    });
  },

  short: (benefitType) => {
    return getContent(`${keys.BENEFIT_TYPES}.${benefitType}.${keys.SHORT}`);
  },

  long: (benefitType) => {
    return getContent(`${keys.BENEFIT_TYPES}.${benefitType}.${keys.LONG}`);
  }

};

let nunjucksEnv;

class NunjucksUtils {

  static get env() {
    return nunjucksEnv;
  }

  static set env(value) {
    nunjucksEnv = value;
  }

  static renderString(str, placeholder) {
    if(!nunjucksEnv) {
      throw Error('The nunjucksEnv has not been set!');
    }
    return nunjucksEnv.renderString(str, placeholder);
  }

  static get filters() {
    return filters;
  }
}

module.exports = NunjucksUtils;
