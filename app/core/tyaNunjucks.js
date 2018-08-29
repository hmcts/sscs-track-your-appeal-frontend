const { getContentAsString } = require('app/core/contentLookup');
const { dateFormat, timeZone } = require('app/core/dateUtils');
const { events } = require('app/core/events');
const screenReaderHelper = require('app/core/ScreenReaderHelper');
const moment = require('moment-timezone');

const space = 2;
const tyaNunjucks = {

  nunjucksEnv: null,

  get env() {
    if (!this.nunjucksEnv) {
      throw Error('The nunjucks environment has not been set.');
    }
    return this.nunjucksEnv;
  },

  set env(env) {
    this.nunjucksEnv = env;
  }

};

const filters = {

  json: obj => {
    return JSON.stringify(obj, null, space);
  },

  formatDate: utcDateTimeStr => {
    return moment.tz(utcDateTimeStr, timeZone).format(dateFormat.date);
  },

  formatTime: utcDateTimeStr => {
    return moment.tz(utcDateTimeStr, timeZone).format(dateFormat.time);
  },

  isActive: (currentStatus, status) => {
    return events[currentStatus].index >= events[status].index ? 'active' : '';
  },

  isCurrent: (currentStatus, status) => {
    return events[currentStatus].index === events[status].index ? 'current' : '';
  },

  getScreenReaderTextFor: (currentStatus, progressBarTick) => {
    return screenReaderHelper.getScreenReaderTextFor(currentStatus, progressBarTick);
  },

  acronym: benefitType => {
    return getContentAsString(`benefitTypes.${benefitType}.acronym`);
  },

  fullDescription: benefitType => {
    return getContentAsString(`benefitTypes.${benefitType}.fullDescription`);
  },

  agency: benefitType => {
    return getContentAsString(`benefitTypes.${benefitType}.agency`);
  },

  agencyAcronym: benefitType => {
    return getContentAsString(`benefitTypes.${benefitType}.agencyAcronym`);
  }

};

const renderContent = (content, placeholder) => {
  if (Array.isArray(content)) {
    return content.map(str => {
      return renderContent(str, placeholder);
    });
  }
  if (typeof content === 'object') {
    const newKeys = Object.keys(content).map(key => {
      return { [key]: renderContent(content[key], placeholder) };
    });
    return Object.assign({}, ...newKeys);
  }
  if (typeof content === 'string') {
    return tyaNunjucks.env.renderString(content, placeholder);
  }
  return null;
};

module.exports = { tyaNunjucks, filters, renderContent };
