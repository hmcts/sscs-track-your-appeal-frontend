const moment = require('moment');
const {STATUSES} = require('app/config');
const DATE_FORMAT = 'YYYY-MM-DDHH:mm:ss ZZ';
const locale = require('app/assets/locale/en');
const FILTERS = {

  json: (obj) => {
    return JSON.stringify(obj, null, 2);
  },

  formatDate: (date) => {
    return moment(date, DATE_FORMAT).format('DD MMMM YYYY');
  },

  formatTime: (date) => {
    return moment(date, DATE_FORMAT).format("HH:mm");
  },

  needed: (needed) => {
    if (needed === undefined) {
      return '-'
    }

    return needed ?
      locale.hearingDetails.needed :
      locale.hearingDetails.notNeeded;
  },

  isActive: (currentStatus, status) => {
    return STATUSES[currentStatus].value >= STATUSES[status].value ? 'active' : '';
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
    return FILTERS;
  }
}

module.exports = NunjucksUtils;
