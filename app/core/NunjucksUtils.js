const moment = require('moment');
const {dateFormat} = require('app/config');
const {events} = require('app/core/events');
const locale = require('app/assets/locale/en');

const filters = {

  json: (obj) => {
    return JSON.stringify(obj, null, 2);
  },

  formatDate: (date) => {
    return moment(date, dateFormat.utc).format(dateFormat.date);
  },

  formatTime: (date) => {
    return moment(date, dateFormat.utc).format(dateFormat.time);
  },

  isActive: (currentStatus, status) => {
    return events[currentStatus].index >= events[status].index ? 'active' : '';
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
