const express = require('express');
const router = express.Router();

// Initialise controller singletons.
require('app/modules/abouthearing/AboutHearingCtrl').instance(router);
require('app/modules/trackyourappeal/TrackYourAppealCtrl').instance(router);
require('app/modules/provideevidence/ProvideEvidenceCtrl').instance(router);
require('app/modules/claimexpenses/ClaimExpensesCtrl').instance(router);
require('app/modules/hearingdetails/HearingDetailsCtrl').instance(router);

module.exports = router;
