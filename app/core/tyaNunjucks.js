const {getContentAsString} = require('app/core/contentLookup');
const screenReaderHelper = require('app/core/ScreenReaderHelper');
const {dateFormat, timeZone} = require('app/config');
const {events} = require('app/core/events');
const moment = require('moment-timezone');

const keys = {
  BENEFIT_TYPES: 'benefitTypes',
  SHORT: 'short',
  LONG: 'long'
};

const tyaNunjucks = {

  nunjucksEnv: null,

  get env() {
    if(!this.nunjucksEnv) {
      throw Error('The nunjucks environment has not been set.');
    }
    return this.nunjucksEnv;
  },

  set env(env) {
    this.nunjucksEnv = env;
  }

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

  short: (benefitType) => {
    return getContentAsString(`${keys.BENEFIT_TYPES}.${benefitType}.${keys.SHORT}`);
  },

  long: (benefitType) => {
    return getContentAsString(`${keys.BENEFIT_TYPES}.${benefitType}.${keys.LONG}`);
  }

};

const renderContent = (content, placeholder) => {
  if (Array.isArray(content)) {
    return content.map(str => renderContent(str, placeholder));
  }
  if (typeof content === 'object') {
    const newKeys = Object.keys(content).map((key) => { return { [key]: renderContent(content[key], placeholder)}; });
    return Object.assign({}, ...newKeys);
  }
  if (typeof content === 'string') {
    return tyaNunjucks.env.renderString(content, placeholder);
  }
};

module.exports = { tyaNunjucks, filters, renderContent };
