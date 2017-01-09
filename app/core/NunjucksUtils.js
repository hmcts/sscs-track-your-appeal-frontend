const moment = require('moment');
const DATE_FORMAT = 'YYYY-MM-DDHH:mm:ss ZZ';
const FILTERS = {

  json: (obj) => {
    return JSON.stringify(obj, null, 2);
  },

  formatDate: (date) => {
    return moment(date, DATE_FORMAT).format('DD MMMM YYYY');
  },
};
let nunjucksEnv;

class NunjucksUtils {

  static set env(value) {
    nunjucksEnv = value;
  }

  static renderString(str, placeholder) {
    return nunjucksEnv.renderString(str, placeholder);
  }

  static get filters() {
    return FILTERS;
  }
}

module.exports = NunjucksUtils;
