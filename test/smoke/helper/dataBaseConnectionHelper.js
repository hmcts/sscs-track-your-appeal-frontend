'use strict';
const props = require('../props/properties'),
  pg = require('pg');

class dataBaseConnectionHelper extends Helper {

  retrieveAppealNumberForAppealReceivedAppealCaseID() {
    return new Promise((resolve, reject) => {

      let pgClient = new pg.Client(props.data_fields.connectionString);
      let appealData = [];
      pgClient.connect();
      let query = pgClient.query("Select appeal_number from subscriptions where appeal_case_id=$1", [props.data_fields.appealReceivedAppealCaseId]);

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
      let query = pgClient.query("Select appeal_number from subscriptions where appeal_case_id=$1", [props.data_fields.dwpAppealCaseId]);

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
      let query = pgClient.query("Select appeal_number from subscriptions where appeal_case_id=$1", [props.data_fields.hearingBookedAppealCaseId]);

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
      let query = pgClient.query("Select appeal_number from subscriptions where appeal_case_id=$1", [props.data_fields.hearingAppealCaseId]);

      query.on('row', (row) => {
        appealData.push(row);
      });

      query.on("end", (result) => {
        pgClient.end();
        resolve(appealData[0].appeal_number);
      });

    })
  }

  retrieveAppealNumberForLapsedRevisedCaseID() {
    return new Promise((resolve, reject) => {

      let pgClient = new pg.Client(props.data_fields.connectionString);
      let appealData = [];
      pgClient.connect();
      let query = pgClient.query("Select appeal_number from subscriptions where appeal_case_id=$1", [props.data_fields.lapsedRevisedAppealCaseId]);

      query.on('row', (row) => {
        appealData.push(row);
      });

      query.on("end", (result) => {
        pgClient.end();
        resolve(appealData[0].appeal_number);
      });

    })
  }

  retrieveAppealNumberForAdjurnedCaseID() {
    return new Promise((resolve, reject) => {

      let pgClient = new pg.Client(props.data_fields.connectionString);
      let appealData = [];
      pgClient.connect();
      let query = pgClient.query("Select appeal_number from subscriptions where appeal_case_id=$1", [props.data_fields.adjurnedAppealCaseId]);

      query.on('row', (row) => {
        appealData.push(row);
      });

      query.on("end", (result) => {
        pgClient.end();
        resolve(appealData[0].appeal_number);
      });

    })
  }

  retrieveAppealNumberForWithdrawnCaseID() {
    return new Promise((resolve, reject) => {

      let pgClient = new pg.Client(props.data_fields.connectionString);
      let appealData = [];
      pgClient.connect();
      let query = pgClient.query("Select appeal_number from subscriptions where appeal_case_id=$1", [props.data_fields.withdrawnAppealCaseId]);

      query.on('row', (row) => {
        appealData.push(row);
      });

      query.on("end", (result) => {
        pgClient.end();
        resolve(appealData[0].appeal_number);
      });

    })
  }

  retrieveAppealNumberForPostponedCaseID() {
    return new Promise((resolve, reject) => {

      let pgClient = new pg.Client(props.data_fields.connectionString);
      let appealData = [];
      pgClient.connect();
      let query = pgClient.query("Select appeal_number from subscriptions where appeal_case_id=$1", [props.data_fields.postponedAppealCaseId]);

      query.on('row', (row) => {
        appealData.push(row);
      });

      query.on("end", (result) => {
        pgClient.end();
        resolve(appealData[0].appeal_number);
      });

    })
  }

  retrieveAppealNumberForDormantCaseID(){
    return new Promise((resolve, reject) => {

      let pgClient = new pg.Client(props.data_fields.connectionString);
      let appealData = [];
      pgClient.connect();
      let query = pgClient.query("Select appeal_number from subscriptions where appeal_case_id=$1", [props.data_fields.dormantAppealCaseId]);

      query.on('row', (row) => {
        appealData.push(row);
      });

      query.on("end", (result) => {
        pgClient.end();
        resolve(appealData[0].appeal_number);
      });

    })
  }

  retrieveAppealNumberForPastHearingDateCaseID(){
    return new Promise((resolve, reject) => {

      let pgClient = new pg.Client(props.data_fields.connectionString);
      let appealData = [];
      pgClient.connect();
      let query = pgClient.query("Select appeal_number from subscriptions where appeal_case_id=$1", [props.data_fields.pastHearingDateAppealCaseId]);

      query.on('row', (row) => {
        appealData.push(row);
      });

      query.on("end", (result) => {
        pgClient.end();
        resolve(appealData[0].appeal_number);
      });

    })
  }

  retrieveAppealNumberForDormantClosedCaseID(){
    return new Promise((resolve, reject) => {

      let pgClient = new pg.Client(props.data_fields.connectionString);
      let appealData = [];
      pgClient.connect();
      let query = pgClient.query("Select appeal_number from subscriptions where appeal_case_id=$1", [props.data_fields.dormantClosedAppealCaseId]);

      query.on('row', (row) => {
        appealData.push(row);
      });

      query.on("end", (result) => {
        pgClient.end();
        resolve(appealData[0].appeal_number);
      });

    })
  }

  retrieveAppealNumberForDwpOverdueRespondCaseID(){
    return new Promise((resolve, reject) => {

      let pgClient = new pg.Client(props.data_fields.connectionString);
      let appealData = [];
      pgClient.connect();
      let query = pgClient.query("Select appeal_number from subscriptions where appeal_case_id=$1", [props.data_fields.dwpRespondOverdueAppealCaseId]);

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

