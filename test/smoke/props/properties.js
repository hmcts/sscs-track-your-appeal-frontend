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
  testAppeals: [
        { appealDesc: "appealReceivedAppealCaseId", appealCaseId: 111111, hearingDate: new Date(2017, 11, 7) },
              { appealDesc: "dwpAppealCaseId", appealCaseId: 222222, hearingDate: null },
              { appealDesc: "hearingBookedAppealCaseId", appealCaseId: 333333, hearingDate: null },
              { appealDesc: "hearingESAAppealCaseId", appealCaseId: 444444, hearingDate: new Date(2017, 5, 24) },
              { appealDesc: "hearingPIPAppealCaseId", appealCaseId: 300004, hearingDate: new Date(2017, 5, 24) },
              { appealDesc: "lapsedRevisedESAAppealCaseId", appealCaseId: 555555, hearingDate: null },
              { appealDesc: "lapsedRevisedPIPAppealCaseId", appealCaseId: 300005, hearingDate: null },
              { appealDesc: "withdrawnESAAppealCaseId", appealCaseId: 666666, hearingDate: null },
              { appealDesc: "withdrawnPIPAppealCaseId", appealCaseId: 300006, hearingDate: null },
              { appealDesc: "adjurnedAppealCaseId", appealCaseId: 777777, hearingDate: new Date(2017, 2, 2) },
              { appealDesc: "postponedESAAppealCaseId", appealCaseId: 888888, hearingDate: new Date(2017, 2, 2) },
              { appealDesc: "postponedPIPAppealCaseId", appealCaseId: 300008, hearingDate: null },
              { appealDesc: "pastHearingDateESAAppealCaseId", appealCaseId: 100000, hearingDate: null },
              { appealDesc: "pastHearingDatePIPAppealCaseId", appealCaseId: 300010, hearingDate: null },
              { appealDesc: "dormantESAAppealCaseId", appealCaseId: 100001, hearingDate: new Date(2017, 11, 27) },
              { appealDesc: "dormantPIPAppealCaseId", appealCaseId: 300011, hearingDate: new Date(2017, 11, 27) },
              { appealDesc: "dormantClosedESAAppealCaseId", appealCaseId: 100002, hearingDate: null },
              { appealDesc: "dormantClosedPIPAppealCaseId", appealCaseId: 300012, hearingDate: null },
              { appealDesc: "dwpRespondOverdueAppealCaseId", appealCaseId: 100003, hearingDate: null },
              { appealDesc: "newHearingBookedAppealCaseId", appealCaseId: 100004, hearingDate: null }
    ],
   dataBaseFields: {
     connectionString: process.env.DB_CONNECTION_URL || 'postgres://postgres:postgres@localhost:5432/sscs-staging',
   }

};
