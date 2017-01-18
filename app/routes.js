const TrackYourAppealService = require('app/services/TrackYourAppealService');
const locale = require('app/assets/locale/en');

const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
  return res.redirect(302, '/malformedurl');
});

router.get('/malformedurl', function(req, res) {
  return res.render('malformed-url');
});

router.use((req, res, next) => {

    let id = req.url.split('/')[2];

    if(id) {
      TrackYourAppealService.status(id).then((appeal) => {
        // Temporarily add on the hearing data until the API has it.
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

        res.locals.appeal = appeal;
        next();
      });
    } else {
      console.log("Unable to determine ID: '" + id + "' from URL: '" + req.url + "'");
      next();
    }
});

router.get('/progress/:id/abouthearing', (req, res) => {
  res.render('about-hearing', Object.assign({i18n: locale}, {data: res.locals.appeal}));
});

router.get('/progress/:id/trackyourappeal', (req, res) => {
  res.render('track-your-appeal', Object.assign({i18n: locale}, {data: res.locals.appeal}));
});

router.get('/progress/:id/evidence', (req, res) => {
  res.render('provide-evidence', Object.assign({i18n: locale}, {data: res.locals.appeal}));
});

router.get('/progress/:id/expenses', (req, res) => {
  res.render('claim-expenses', Object.assign({i18n: locale}, {data: res.locals.appeal}));
});

router.get('/progress/:id/hearingdetails', (req, res) => {
  res.render('hearing-details', Object.assign({i18n: locale}, {data: res.locals.appeal}));
});

module.exports = router;
