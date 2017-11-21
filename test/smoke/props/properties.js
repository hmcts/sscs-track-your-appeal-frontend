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
   dataBaseFields: {
     connectionString: process.env.DB_CONNECTION_URL || 'postgres://postgres:postgres@localhost:5432/sscs-staging',
    appealReceivedAppealCaseId: 111111,
    dwpAppealCaseId: 222222,
    hearingBookedAppealCaseId: 333333,
    hearingESAAppealCaseId: 444444,
    hearingPIPAppealCaseId: 300004,
    lapsedRevisedESAAppealCaseId: 555555,
    lapsedRevisedPIPAppealCaseId: 300005,
    withdrawnESAAppealCaseId:666666,
    withdrawnPIPAppealCaseId:300006,
    adjurnedAppealCaseId:777777,
    postponedESAAppealCaseId:888888,
    postponedPIPAppealCaseId:300008,
    pastHearingDateESAAppealCaseId:100000,
    pastHearingDatePIPAppealCaseId:300010,
    dormantESAAppealCaseId:100001,
    dormantPIPAppealCaseId:300011,
    dormantClosedESAAppealCaseId:100002,
    dormantClosedPIPAppealCaseId:300012,
    dwpRespondOverdueAppealCaseId:100003,
    newHearingBookedAppealCaseId:100004
   }

};
