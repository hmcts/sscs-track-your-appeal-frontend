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
        { appealDesc: "appealReceivedAppealCaseId", appealCaseId: 111111, hearingDate: new Date(2017, 11, 7), surname: 'Alpha' },
              { appealDesc: "dwpAppealCaseId", appealCaseId: 222222, hearingDate: null, surname: 'Bravo' },
              { appealDesc: "hearingBookedAppealCaseId", appealCaseId: 333333, hearingDate: null, surname: 'Charlie' },
              { appealDesc: "hearingESAAppealCaseId", appealCaseId: 444444, hearingDate: new Date(2017, 5, 24), surname: 'Delta' },
              { appealDesc: "hearingPIPAppealCaseId", appealCaseId: 300004, hearingDate: new Date(2017, 5, 24), surname: 'Date' },
              { appealDesc: "lapsedRevisedESAAppealCaseId", appealCaseId: 555555, hearingDate: null, surname: 'Foxtrot' },
              { appealDesc: "lapsedRevisedPIPAppealCaseId", appealCaseId: 300005, hearingDate: null, surname: 'Queen' },
              { appealDesc: "withdrawnESAAppealCaseId", appealCaseId: 666666, hearingDate: null, surname: 'Iglo' },
              { appealDesc: "withdrawnPIPAppealCaseId", appealCaseId: 300006, hearingDate: null, surname: 'Iceberg' },
              { appealDesc: "adjurnedAppealCaseId", appealCaseId: 777777, hearingDate: new Date(2017, 2, 2), surname: 'Kilo' },
              { appealDesc: "postponedESAAppealCaseId", appealCaseId: 888888, hearingDate: new Date(2017, 2, 2), surname: 'Lena' },
              { appealDesc: "postponedPIPAppealCaseId", appealCaseId: 300008, hearingDate: null, surname: 'Lemon' },
              { appealDesc: "pastHearingDateESAAppealCaseId", appealCaseId: 100000, hearingDate: null, surname: 'Miao' },
              { appealDesc: "pastHearingDatePIPAppealCaseId", appealCaseId: 300010, hearingDate: null, surname: 'Melon' },
              { appealDesc: "dormantESAAppealCaseId", appealCaseId: 100001, hearingDate: new Date(2017, 11, 27), surname: 'November' },
              { appealDesc: "dormantPIPAppealCaseId", appealCaseId: 300011, hearingDate: new Date(2017, 11, 27), surname: 'Nut' },
              { appealDesc: "dormantClosedESAAppealCaseId", appealCaseId: 100002, hearingDate: null, surname: 'Owl' },
              { appealDesc: "dormantClosedPIPAppealCaseId", appealCaseId: 300012, hearingDate: null, surname: 'Opel' },
              { appealDesc: "dwpRespondOverdueAppealCaseId", appealCaseId: 100003, hearingDate: null, surname: 'Papa' },
              { appealDesc: "newHearingBookedAppealCaseId", appealCaseId: 100004, hearingDate: null, surname: 'Quack' }
    ],
   dataBaseFields: {
     connectionString: process.env.DB_CONNECTION_URL || 'postgres://postgres:postgres@localhost:5432/sscs-staging',
   }

};
