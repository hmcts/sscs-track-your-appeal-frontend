const { getAppeal, changeEmailAddress, stopReceivingEmails, validateToken } = require('app/services');
const { applyPlaceholders } = require('app/middleware/placeHolder');
const { applyContentToEvents } = require('app/middleware/events');
const { aboutHearingContent, manageEmailNotifications } = require('app/middleware/content');
const { applyEvidence } = require('app/middleware/evidence');
const { reformatHearingDetails } = require('app/middleware/hearing');
const { validateEmail } = require('app/middleware/validateEmail');
const { showProgressBar } = require('app/core/UIUtils');
const types = require('app/core/notifications/types');
const express = require('express');
const router = express.Router();

const progressRoot = '/progress';
const notificationRoot = '/manage-email-notifications';
const tyaMiddleware = [ getAppeal, applyPlaceholders, applyEvidence, applyContentToEvents, showProgressBar ];

//------------------------------------ TRACK YOUR APPEAL ---------------------------------------------------------------

router.get(`${progressRoot}/:id/abouthearing`, getAppeal, aboutHearingContent, (req, res) => {
  res.render('about-hearing', {data: res.locals.appeal});
});

router.get(`${progressRoot}/:id/trackyourappeal`, tyaMiddleware, (req, res) => {
  res.render('track-your-appeal', {data: res.locals.appeal});
});

router.get(`${progressRoot}/:id/evidence`, getAppeal, (req, res) => {
  res.render('provide-evidence', {data: res.locals.appeal});
});

router.get(`${progressRoot}/:id/expenses`, getAppeal, (req, res) => {
  res.render('claim-expenses', {data: res.locals.appeal});
});

// Hearing details relating to the latest event e.g. HEARING_BOOKED
router.get(`${progressRoot}/:id/hearingdetails`, getAppeal, reformatHearingDetails, (req, res) => {
  res.render('hearing-details', {
    data: res.locals.appeal,
    event: res.locals.appeal.latestHearingBookedEvent
  });
});

// Hearing details relating to historical events e.g. HEARING
router.get(`${progressRoot}/:id/hearingdetails/:index`, getAppeal, reformatHearingDetails, (req, res) => {
  res.render('hearing-details', {
    appeal: res.locals.appeal,
    event: res.locals.appeal.historicalEvents[req.params.index]
  });
});

router.get(`${progressRoot}/:id/contactus`, getAppeal, (req, res) => {
  res.render('contact-us', {data: res.locals.appeal});
});

router.get('/cookiepolicy', (req, res) => {
  res.render('cookie-policy');
});

//------------------------------------ EMAIL NOTIFICATIONS -------------------------------------------------------------

router.get(`${notificationRoot}/:mactoken`, validateToken, manageEmailNotifications, (req, res, next) => {
  res.render('manage-emails', { mactoken: req.params.mactoken, fields: { type: { value: types.CHANGE_EMAIL } } });
});

router.post(`${notificationRoot}/:mactoken`, validateToken, (req, res, next) => {
  switch(req.body.type) {
    case types.CHANGE_EMAIL:
      res.redirect(`${notificationRoot}/${req.params.mactoken}/change`);
      break;
    case types.STOP_EMAIL:
      res.redirect(`${notificationRoot}/${req.params.mactoken}/stop`);
      break;
    default:
      next(new Error(`Unknown type: ${req.body.type}`))
  }
});

router.get(`${notificationRoot}/:mactoken/stop`, validateToken, (req, res) => {
  res.render('emails-stop', { mactoken: req.params.mactoken });
});

router.get(`${notificationRoot}/:mactoken/stopconfirm`, validateToken, stopReceivingEmails, (req, res, next) => {
  res.render('emails-stop-confirmed', { data: { appealNumber: res.locals.token.appealId }, mactoken: req.params.mactoken });
});

router.get(`${notificationRoot}/:mactoken/change`, validateToken, manageEmailNotifications, (req, res) => {
  res.render('email-address-change', { mactoken: req.params.mactoken });
});

router.post(`${notificationRoot}/:mactoken/change`, validateToken, validateEmail, changeEmailAddress, (req, res, next) => {
  res.render('email-address-change-confirmed', { data: { email: req.body.email }, mactoken: req.params.mactoken });
});

module.exports = router;
