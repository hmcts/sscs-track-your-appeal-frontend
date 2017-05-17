'use strict';
const props = require('../props/properties'),
  pg = require('pg');

class dataBaseConnectionHelper extends Helper {

  retrieveAppealNumberForAppealReceivedAppealCaseID() {
    return new Promise((resolve, reject) => {

      let pgClient = new pg.Client(props.data_fields.connectionString);
      let appealData = [];
      pgClient.connect();
      let query = pgClient.query("Select appeal_number from subscriptions where appeal_case_id=$1", [props.data_fields.appealreceived_appeal_case_id]);

      query.on('row', (row) => {
        appealData.push(row);
      });

      query.on("end", (result) => {
        pgClient.end();
        resolve(appealData[0].appeal_number);
      });

    })
  }

  retrieveAppealNumberForDwpAppealCaseID() {
    return new Promise((resolve, reject) => {

      let pgClient = new pg.Client(props.data_fields.connectionString);
      let appealData = [];
      pgClient.connect();
      let query = pgClient.query("Select appeal_number from subscriptions where appeal_case_id=$1", [props.data_fields.dwp_appeal_case_id]);

      query.on('row', (row) => {
        appealData.push(row);
      });

      query.on("end", (result) => {
        pgClient.end();
        resolve(appealData[0].appeal_number);
      });

    })
  }

  retrieveAppealNumberForHearingBookedAppealCaseID() {
    return new Promise((resolve, reject) => {

      let pgClient = new pg.Client(props.data_fields.connectionString);
      let appealData = [];
      pgClient.connect();
      let query = pgClient.query("Select appeal_number from subscriptions where appeal_case_id=$1", [props.data_fields.hearingBooked_appeal_case_id]);

      query.on('row', (row) => {
        appealData.push(row);
      });

      query.on("end", (result) => {
        pgClient.end();
        resolve(appealData[0].appeal_number);
      });

    })
  }

  retrieveAppealNumberForHearingAppealCaseID() {
    return new Promise((resolve, reject) => {

      let pgClient = new pg.Client(props.data_fields.connectionString);
      let appealData = [];
      pgClient.connect();
      let query = pgClient.query("Select appeal_number from subscriptions where appeal_case_id=$1", [props.data_fields.hearing_appeal_case_id]);

      query.on('row', (row) => {
        appealData.push(row);
      });

      query.on("end", (result) => {
        pgClient.end();
        resolve(appealData[0].appeal_number);
      });

    })
  }

  retrieveAppealNumberForUnmappedCaseID() {
    return new Promise((resolve, reject) => {

      let pgClient = new pg.Client(props.data_fields.connectionString);
      let appealData = [];
      pgClient.connect();
      let query = pgClient.query("Select appeal_number from subscriptions where appeal_case_id=$1", [props.data_fields.subscription_appeal_case_id]);

      query.on('row', (row) => {
        appealData.push(row);
      });

      query.on("end", (result) => {
        pgClient.end();
        resolve(appealData[0].appeal_number);
      });

    })
  }
}
module.exports = dataBaseConnectionHelper;

