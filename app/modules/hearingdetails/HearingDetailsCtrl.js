const TrackYourAppealService = require('app/services/TrackYourAppealService');
const locale = require('app/assets/locale/en');

let singleton = Symbol();
let singletonEnforcer = Symbol();

class HearingDetails {

  constructor(enforcer, router) {
    if (enforcer != singletonEnforcer) {
      throw new Error('Cannot construct HearingDetails singleton, use the static instance function');
    }
    this.initRoutes(router);
  }

  initRoutes(router) {
    router.get('/progress/:id/hearingdetails', this.hearingDetails);
  }

  hearingDetails(req, res) {
    TrackYourAppealService.status(req.params.id).then((appeal) => {
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
      res.render('hearing-details', Object.assign({i18n: locale}, {data: appeal}));
    });
  }

  static instance(router) {
    if (typeof router !== 'function') {
      throw new TypeError('router must be a function, e.g. express.Router()');
    }

    if (!this[singleton]) {
      this[singleton] = new HearingDetails(singletonEnforcer, router);
    }
    return this[singleton];
  }
}

module.exports = HearingDetails;
