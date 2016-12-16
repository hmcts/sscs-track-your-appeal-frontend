const express = require('express');
const router = express.Router();

// Initialise controller singletons.
require('app/modules/abouthearing/AboutHearingCtrl').instance(router);
require('app/modules/trackyourappeal/TrackYourAppealCtrl').instance(router);

module.exports = router;