'use strict';
const props = require('../props/properties').dataBaseFields,
  pg = require('pg'),
  moment = require('moment');

class dataBaseConnectionHelper extends codecept_helper {

  retrieveAppealNumber(appealCaseId) {
    return new Promise((resolve, reject) => {
      let pgClient = new pg.Client(props.connectionString);
      let appealData = [];
      pgClient.connect();
      let query = pgClient.query('Select appeal_number from subscriptions where appeal_case_id=$1', [appealCaseId]);
      query.on('row', (row) => {
        appealData.push(row);
      });
      query.on('end', (result) => {
        if (result.rowCount === 0 || result.rowCount === null) {
          pgClient.end();
          reject('No matching record found for appeal case id');
        }
        else {
          pgClient.end();
          resolve(appealData[0].appeal_number);
        }
      });
    });
  }

  getEventDateforAppealCaseID(appealCaseId) {
    return new Promise((resolve, reject) => {
      let pgClient = new pg.Client(props.connectionString);
      let eventData = [];
      pgClient.connect();
      let query = pgClient.query('Select event_date from events where appeal_case_id=$1 order by event_date desc limit 1', [appealCaseId]);
      query.on('row', (row) => {
        eventData.push(row);

      });
      query.on('end', (result) => {
        if (result.rowCount === 0 || result.rowCount === null) {
          pgClient.end();
          reject('No matching record found for appeal case id');
        }
        else {
          pgClient.end();
          resolve(eventData[0].event_date);
        }
      });
    });
  }

  calculateDate(appealCaseID, numberOfDays) {
    return this.getEventDateforAppealCaseID(appealCaseID)
      .then(eventDate => {
        eventDate.setDate(eventDate.getDate() + numberOfDays);
        let formatDate = moment(eventDate).format('DD MMMM YYYY');
        return formatDate;
      });
  }

}
module.exports = dataBaseConnectionHelper;

