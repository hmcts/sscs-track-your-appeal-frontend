'use strict';

let I;
module.exports = {

  _init() {
    I = actor();
  },

  fields: {
    //Track Appeal Page Properties

    form_hint_css_path: {css: '.form-hint'},
    appeal_progbar_css_path: {css: '.appeal-received>span.screen-reader-text'},
    dwp_respond_progbar_css_path: {css: '.dwp-respond>span.screen-reader-text'},
    hearing_booked_progbar_css_path: {css: '.hearing-booked>span.screen-reader-text'},
    hearing_progbar_css_path: {css: '.hearing>span.screen-reader-text'},
    view_previous_updates_link_css_path: {css: '.events details summary'},
    sub_headings_h3_css_path: {css: 'h3.bold-small'},
    sub_headings_h2_css_path: {css: 'h2.heading-medium'},

  },
  data_fields: {
    connectionString: process.env.DB_CONNECTION_URL || 'postgres://postgres:postgres@localhost:5432/sscs-staging',
    appealreceived_appeal_case_id: 111111,
    dwp_appeal_case_id: 222222,
    hearingBooked_appeal_case_id: 333333,
    hearing_appeal_case_id: 444444,
    subscription_appeal_case_id: 888888
  }

};
