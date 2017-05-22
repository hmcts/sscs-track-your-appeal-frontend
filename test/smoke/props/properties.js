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
    appealReceivedAppealCaseId: 111111,
    dwpAppealCaseId: 222222,
    hearingBookedAppealCaseId: 333333,
    hearingAppealCaseId: 444444,
    lapsedRevisedAppealCaseId: 555555,
    withdrawnAppealCaseId:666666,
    adjurnedAppealCaseId:777777,
    postponedAppealCaseId:888888,
    dormantAppealCaseId:100001
  }

};
