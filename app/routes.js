const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const logger = require('nodejs-logging').getLogger('routes.js');
const ServiceLoader = require('app/services/ServiceLoader');
const AppealsService = ServiceLoader.AppealService;
const {applyPlaceholders} = require('app/middleware/placeHolder');
const {applyContentToEvents} = require('app/middleware/events');
const {aboutHearingContent, manageEmailNotifications} = require('app/middleware/content');
const {applyEvidence} = require('app/middleware/evidence');
const {reformatHearingDetails} = require('app/middleware/hearing');
const TokenService = ServiceLoader.TokenService;
const HttpStatus = require('http-status-codes');
const express = require('express');
const router = express.Router();
const UIUtils = require('app/core/UIUtils');
const progressRoot = '/progress';
const notificationRoot = '/manage-email-notifications';
const EMAIL = {
  CHANGE: 'changeEmailAddress',
  STOP: 'stopEmails'
};

const tyaMiddleware = [
  AppealsService.getAppeal,
  applyPlaceholders,
  applyEvidence,
  applyContentToEvents,
  UIUtils.showProgressBar
];

//------------------------------------ TRACK YOUR APPEAL ---------------------------------------------------------------

router.get(`${progressRoot}/:id/abouthearing`, AppealsService.getAppeal, aboutHearingContent, (req, res) => {
  res.render('about-hearing', {data: res.locals.appeal});
});

router.get(`${progressRoot}/:id/trackyourappeal`, tyaMiddleware, (req, res) => {
  res.render('track-your-appeal', {data: res.locals.appeal});
});

router.get(`${progressRoot}/:id/evidence`, AppealsService.getAppeal, (req, res) => {
  res.render('provide-evidence', {data: res.locals.appeal});
});

router.get(`${progressRoot}/:id/expenses`, AppealsService.getAppeal, (req, res) => {
  res.render('claim-expenses', {data: res.locals.appeal});
});

// Hearing details relating to the latest event e.g. HEARING_BOOKED
router.get(`${progressRoot}/:id/hearingdetails`, AppealsService.getAppeal, reformatHearingDetails, (req, res) => {
  res.render('hearing-details', {
    data: res.locals.appeal,
    event: res.locals.appeal.latestHearingBookedEvent
  });
});

// Hearing details relating to historical events e.g. HEARING
router.get(`${progressRoot}/:id/hearingdetails/:index`, AppealsService.getAppeal, reformatHearingDetails, (req, res) => {
  res.render('hearing-details', {
    appeal: res.locals.appeal,
    event: res.locals.appeal.historicalEvents[req.params.index]
  });
});

router.get(`${progressRoot}/:id/contactus`, AppealsService.getAppeal, (req, res) => {
  res.render('contact-us', {data: res.locals.appeal});
});

//------------------------------------ EMAIL NOTIFICATIONS -------------------------------------------------------------

router.get(`${notificationRoot}/:mactoken`, TokenService.validateToken, manageEmailNotifications, (req, res, next) => {
  res.render('manage-emails', { mactoken: req.params.mactoken });
});

router.post(`${notificationRoot}/:mactoken`, TokenService.validateToken, (req, res, next) => {
  const userSelection = req.body.emailNotify;
  if(userSelection === EMAIL.CHANGE) {
    res.render('email-address-change', { mactoken: req.params.mactoken });
  } else if (userSelection === EMAIL.STOP) {
    res.render('emails-stop', { mactoken: req.params.mactoken });
  } else {
    let errorMsg = res.locals.i18n.notifications.email.errors.selectAnOption;
    res.render('manage-emails', {
      mactoken: req.params.mactoken,
      field: {
        error: true,
        errorMessage: errorMsg
      }
    });
  }
});

router.post(`${notificationRoot}/:mactoken/stop`, TokenService.validateToken, (req, res, next) => {
  const token = res.locals.token;
  AppealsService.stopReceivingEmails(token.appealId, token.subscriptionId).then((result) => {
    res.render('emails-stop-confirmed', {
      data: { appealNumber: token.appealId },
      mactoken: req.params.mactoken,
    });
  }).catch((error) => {
    next(error);
  });
});


router.get(`${notificationRoot}/:mactoken/change`, TokenService.validateToken, manageEmailNotifications, (req, res, next) => {
  res.render('email-address-change', { mactoken: req.params.mactoken });
});

router.post(`${notificationRoot}/:mactoken/change`, TokenService.validateToken, (req, res, next) => {
  const token = res.locals.token;
  const email = req.body.email;
  const email2 = req.body.email2;
  const errorTexts = res.locals.i18n.notifications.email.errors;

  let fields = {
    hasErrors: true,
    email: {
      value: email,
      error: true
    },
    email2: {
      value: email2,
      error: true
    }
  };

  if(email === '' && email2 === '') {
    fields.heading = errorTexts.emptyStringEmailHeading;
    fields.heading2 = errorTexts.emptyStringEmailHeadingTwo;
    fields.email.errorMessage = errorTexts.emptyStringEmailField;
    fields.email2.errorMessage = errorTexts.emptyStringEmailFieldTwo;
    res.status(HttpStatus.BAD_REQUEST);
    res.render('email-address-change', { fields: fields, mactoken: req.params.mactoken });
    return;
  }

  if(email !== email2 ) {
    fields.heading = errorTexts.noMatchHeading;
    fields.email.errorMessage = fields.email2.errorMessage = errorTexts.noMatchField;
    res.status(HttpStatus.BAD_REQUEST);
    res.render('email-address-change', { fields: fields, mactoken: req.params.mactoken });
    return;
  }

  if(!EMAIL_REGEX.test(email)) {
    fields.heading = errorTexts.notValidHeading;
    fields.email.errorMessage = fields.email2.errorMessage = errorTexts.notValidField;
    res.status(HttpStatus.BAD_REQUEST);
    res.render('email-address-change', { fields: fields, mactoken: req.params.mactoken });
    return;
  }

  const body = { subscription: { email: email } };
  AppealsService.changeEmailAddress(token.appealId, token.subscriptionId, body).then((result) => {
    res.render('email-address-change-confirmed', { data: { email: email }, mactoken: req.params.mactoken });
  }).catch((error) => {
    next(error);
  });
});

//------------------------------------------- COOKIE POLICY ------------------------------------------------------------

router.get('/cookiepolicy', (req, res) => {
  res.render('cookie-policy');
});

module.exports = router;
