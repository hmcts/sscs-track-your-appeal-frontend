'use strict';

let I;

module.exports = {
  _init() {
    I = actor();
  },

  fields: {

    //Track Appeal Page Properties
    form_text_label_path: {css: '.form-label'},
    form_hint_css_path: {css: '.form-hint'},
    ref_css_path: 'input[name=reference]',
    ref_id: '123/45/00001',
    find_appeal_button: 'input[type=submit]',
    Page_heading_css_path: {css: 'h1'},
    evidence_received_date: '22 December 2016',
  },
  data_fields: {
    case_ref: 'case-ref_test_frontend_1',
    appeal_id: 'testing_appeal_forntend_id_1',
    appeal_name: 'appeal_name',
    appeal_status: 'APPEAL',
  }
};
