'use strict';
const props = require('../props/properties').dataBaseFields,
  pg = require('pg');

class dataBaseConnectionHelper extends Helper {

  retrieveAppealNumber(appealCaseId) {
    return new Promise((resolve, reject) => {

      let pgClient = new pg.Client(props.connectionString);
      let appealData = [];
      pgClient.connect();
      let query = pgClient.query("Select appeal_number from subscriptions where appeal_case_id=$1", [appealCaseId]);

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

