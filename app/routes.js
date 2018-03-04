const { getAppeal, changeEmailAddress, stopReceivingEmails, validateToken, matchSurnameToAppeal  } = require('app/services');
const { applyContentToEvents } = require('app/middleware/events');
const { aboutHearingContent, emailNotifications } = require('app/middleware/content');
const { applyEvidence } = require('app/middleware/evidence');
const { reformatHearingDetails } = require('app/middleware/hearing');
const { notificationChoiceRedirect } = require('app/middleware/notificationChoiceRedirect');
const { validateEmail } = require('app/middleware/validateEmail');
const { validateSurname } = require('app/middleware/validateSurname');
const { surnameValidationCookieCheck } = require('app/middleware/surnameValidationCookieCheck');
const { showProgressBar } = require('app/core/UIUtils');

const express = require('express');
const router = express.Router();

const tyaMiddleware = [
  getAppeal,
  applyEvidence,
  applyContentToEvents,
  showProgressBar
];

//------------------------------------ TRACK YOUR APPEAL ---------------------------------------------------------------

router.get('/validate-surname/:id', (req, res) => {
  res.render('validate-surname', { id: req.params.id });
});

router.post('/validate-surname/:id', validateSurname, matchSurnameToAppeal, (req, res, next) => {});

router.get('/abouthearing/:id', surnameValidationCookieCheck, getAppeal, aboutHearingContent, (req, res) => {
  res.render('about-hearing', {data: res.locals.appeal});
});

router.get('/trackyourappeal/:id', surnameValidationCookieCheck, tyaMiddleware, (req, res) => {
  res.render('track-your-appeal', {data: res.locals.appeal});
});

router.get('/evidence/:id', surnameValidationCookieCheck, getAppeal, (req, res) => {
  res.render('provide-evidence', {data: res.locals.appeal});
});

router.get('/expenses/:id', surnameValidationCookieCheck, getAppeal, (req, res) => {
  res.render('claim-expenses', {data: res.locals.appeal});
});

// Hearing details relating to the latest event e.g. HEARING_BOOKED
router.get('/hearingdetails/:id', surnameValidationCookieCheck, getAppeal, reformatHearingDetails, (req, res) => {
  res.render('hearing-details', {
    data: res.locals.appeal,
    event: res.locals.appeal.latestHearingBookedEvent
  });
});

// Hearing details relating to historical events e.g. HEARING
router.get('/hearingdetails/:id/:index', surnameValidationCookieCheck, getAppeal, reformatHearingDetails, (req, res) => {
  res.render('hearing-details', {
    appeal: res.locals.appeal,
    event: res.locals.appeal.historicalEvents[req.params.index]
  });
});

router.get('/contactus/:id', surnameValidationCookieCheck, getAppeal, (req, res) => {
  res.render('contact-us', {data: res.locals.appeal});
});

router.get('/cookiepolicy', (req, res) => {
  res.render('cookie-policy');
});

//------------------------------------ EMAIL NOTIFICATIONS -------------------------------------------------------------

router.get('/manage-email-notifications/:mactoken', validateToken, (req, res, next) => {
  res.render('manage-emails', { mactoken: req.params.mactoken } );
});

router.post('/manage-email-notifications/:mactoken', validateToken, notificationChoiceRedirect, (req, res, next) => {});

router.get('/manage-email-notifications/:mactoken/stop', validateToken, emailNotifications, (req, res) => {
  res.render('emails-stop', { mactoken: req.params.mactoken } );
});

router.get('/manage-email-notifications/:mactoken/stopconfirm', validateToken, stopReceivingEmails, emailNotifications, (req, res, next) => {
  res.render('emails-stop-confirmed', { data: { appealNumber: res.locals.token.appealId }, mactoken: req.params.mactoken });
});

router.get('/manage-email-notifications/:mactoken/change', validateToken, (req, res) => {
  res.render('email-address-change', { mactoken: req.params.mactoken } );
});

router.post('/manage-email-notifications/:mactoken/change', validateToken, validateEmail, changeEmailAddress, emailNotifications, (req, res, next) => {
  res.render('email-address-change-confirmed', { data: { email: req.body.email }, mactoken: req.params.mactoken } );
});

module.exports = router;
