'use strict';

let I;

module.exports = {
  _init() {
    I = actor();
  },

  fields: {

  },

  page() {
    I.amOnPage('/track-your-appeal');
  },

  benifitAppealPage() {
    I.amOnPage('/validate?reference=123%2F45%2F00001');
  }
};
