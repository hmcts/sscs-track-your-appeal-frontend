const {
  getAppeal,
  changeEmailAddress,
  stopReceivingEmails,
  validateToken,
  matchSurnameToAppeal
} = require('app/services');

const { applyContentToEvents } = require('app/middleware/events');
const { aboutHearingContent, emailNotifications, evidenceContent } = require('app/middleware/content');
const { applyEvidence } = require('app/middleware/evidence');
const { reformatHearingDetails } = require('app/middleware/hearing');
const { notificationRedirect } = require('app/middleware/notificationRedirect');
const { validateEmail } = require('app/middleware/validateEmail');
const { validateSurname } = require('app/middleware/validateSurname');
const { cookieCheck } = require('app/middleware/cookieCheck');
const { showProgressBar } = require('app/core/UIUtils');

const express = require('express');

const router = express.Router();

const tyaMiddleware = [
  getAppeal,
  applyEvidence,
  applyContentToEvents,
  showProgressBar
];

const { tya } = require('paths');

// -------------------------- TRACK YOUR APPEAL ------------------------------------------

router.get(`${tya.validateSurname}/:id/:originalPage`, (req, res) => {
  res.render('validate-surname', {
    id: req.params.id,
    originalPage: req.params.originalPage
  });
});

router.post(`${tya.validateSurname}/:id/:originalPage`, validateSurname, matchSurnameToAppeal);

router.get(`${tya.aboutHearing}/:id`, cookieCheck, getAppeal, aboutHearingContent, (req, res) => {
  res.render('about-hearing', { data: res.locals.appeal});
});

router.get(`${tya.trackYourAppeal}/:id`, cookieCheck, tyaMiddleware, (req, res) => {
  res.render('track-your-appeal', { data: res.locals.appeal});
});

router.get(`${tya.evidence}/:id`, cookieCheck, getAppeal, evidenceContent, (req, res) => {
  res.render('provide-evidence', { data: res.locals.appeal});
});

router.get(`${tya.expenses}/:id`, cookieCheck, getAppeal, (req, res) => {
  res.render('claim-expenses', { data: res.locals.appeal});
});

// Hearing details relating to the latest event e.g. HEARING_BOOKED
router.get(`${tya.hearingDetails}/:id`, cookieCheck, getAppeal, reformatHearingDetails, (req, res) => {
  res.render('hearing-details', {
    data: res.locals.appeal,
    event: res.locals.appeal.latestHearingBookedEvent
  });
});

// Hearing details relating to historical events e.g. HEARING
router.get(`${tya.hearingDetails}/:id/:index`, cookieCheck, getAppeal, reformatHearingDetails, (req, res) => {
  res.render('hearing-details', {
    appeal: res.locals.appeal,
    event: res.locals.appeal.historicalEvents[req.params.index]
  });
});

router.get(`${tya.contactus}/:id`, cookieCheck, getAppeal, (req, res) => {
  res.render('contact-us', {data: res.locals.appeal});
});

router.get(tya.cookiepolicy, (req, res) => {
  res.render('cookie-policy');
});

router.get(`${tya.terms}/:id`, cookieCheck, getAppeal, (req, res) => {
  res.render('terms-and-conditions', {data: res.locals.appeal});
});

router.get(`${tya.privacy}/:id`, cookieCheck, getAppeal, (req, res) => {
  res.render('privacy-policy', {data: res.locals.appeal});
});

// -------------------------- EMAIL NOTIFICATIONS ----------------------------------------

router.get('/manage-email-notifications/:mactoken', validateToken, (req, res, next) => {
  res.render('manage-emails', { mactoken: req.params.mactoken } );
});

router.post('/manage-email-notifications/:mactoken', validateToken, notificationRedirect, (req, res, next) => {});

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
