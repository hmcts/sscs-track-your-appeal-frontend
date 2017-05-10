'use strict';
const props = require('../props/properties'),
      //pg = require('pg'),
      appealData = [];

class dataBaseConnectionHelper extends Helper {

  retrieveAppealNumberForAppealCaseID() {
    return new Promise((resolve, reject) => {
      console.log(props.data_fields.connectionString);
     const pg = require('pg');
     let pgClient = new pg.Client(props.data_fields.connectionString);
      pgClient.connect();
      let query = pgClient.query("Select appeal_number from subscriptions where appeal_case_id=$1", [props.data_fields.dwp_appeal_case_id]);
      console.log(query);
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

