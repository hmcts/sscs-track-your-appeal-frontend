const request = require('superagent');
const Config = require('app/config');
const I18nHelper = require('app/core/I18nHelper');

class TrackMyAppealService {

  static status(id) {
    return new Promise((resolve, reject) => {
      request('GET', Config.TRACK_YOUR_APPEAL_ENDPOINT + '/' + id).then((result) => {
        let appeal = result.body.appeal;
        I18nHelper.setHeadingAndRenderedContentOnEvents(appeal.events);

        // Temporarily add the hearing data until it's defined within the API.
        appeal.hearingDate = "To be defined";
        appeal.hearingTime = "To be defined";
        appeal.disabledAccess = "To be defined";
        appeal.representative = "To be defined";
        appeal.interpreter = "To be defined";
        appeal.address = {
          addressLine1: "Address line 1 to be defined",
          addressLine2: "Address line 2 to be defined",
          addressLine3: "Address line 3 to be defined",
          addressLine4: "Address line 4 to be defined",
        };

        resolve(appeal);

      }).catch((error) => {
        let serverErr = {};
        if(error.response && error.response.body && error.response.body.Map) {
          serverErr = error.response.body.Map;
        }
        reject({
          responseCode: error.status,
          message: error.message,
          fields: [
            {'exception': serverErr.exception},
            {'message': serverErr.message},
            {'path': serverErr.path}
          ]
        });
      });
    });
  }
}

module.exports = TrackMyAppealService;
