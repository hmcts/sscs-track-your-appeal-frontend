const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const logger = require('nodejs-logging').getLogger('routes.js');
const ServiceLoader = require('app/services/ServiceLoader');
const AppealsService = ServiceLoader.AppealService;
const TokenService = ServiceLoader.TokenService;
const locale = require('app/assets/locale/en');
const errors = locale.notifications.email.errors;
const express = require('express');
const router = express.Router();
const urls = require('app/urls');
const UIUtils = require('app/core/UIUtils');
const progressRoot = '/progress';
const notificationRoot = '/manage-email-notifications';
const EMAIL = {
  CHANGE: 'changeEmailAddress',
  STOP: 'stopEmails'
};

router.get(`${progressRoot}/:id/abouthearing`, AppealsService.getAppeal, (req, res) => {
  res.render('about-hearing', {data: res.locals.appeal});
});

router.get(`${progressRoot}/:id/trackyourappeal`, AppealsService.getAppeal, UIUtils.showProgressBar, (req, res) => {
  res.render('track-your-appeal', {data: res.locals.appeal});
});

router.get(`${progressRoot}/:id/evidence`, AppealsService.getAppeal, (req, res) => {
  res.render('provide-evidence', {data: res.locals.appeal});
});

router.get(`${progressRoot}/:id/expenses`, AppealsService.getAppeal, (req, res) => {
  res.render('claim-expenses', {data: res.locals.appeal});
});

// Hearing details relating to the latest event e.g. HEARING_BOOKED
router.get(`${progressRoot}/:id/hearingdetails`, AppealsService.getAppeal, (req, res) => {
  res.render('hearing-details', {
    data: res.locals.appeal,
    event: res.locals.appeal.latestHearingBookedEvent
  });
});

// Hearing details relating to historical events e.g. HEARING
router.get(`${progressRoot}/:id/hearingdetails/:index`, AppealsService.getAppeal, (req, res) => {
  res.render('hearing-details', {
    appeal: res.locals.appeal,
    event: res.locals.appeal.historicalEvents[req.params.index]
  });
});

router.get(`${progressRoot}/:id/contactus`, AppealsService.getAppeal, (req, res) => {
  res.render('contact-us', {data: res.locals.appeal});
});

function validateToken(req, res, next) {
  if (req.params.mactoken) {
    TokenService.validateToken(req.params.mactoken).then((result) => {
      res.locals.token = result.body.token;
      next();
    }).catch((error) => {
      next(error);
    });
  } else {
    next();
  }
}

router.get(`${notificationRoot}/:mactoken`, validateToken, (req, res, next) => {
  res.render('manage-email-notifications', {
    i18n: locale.notifications.email.manage,
    mactoken: req.params.mactoken
  });
});

router.post(`${notificationRoot}/:mactoken`, validateToken, (req, res, next) => {
  const userSelection = req.body.emailNotify;
  if(userSelection === EMAIL.CHANGE) {
    res.render('email-address-change', {
      i18n: res.locals.i18n.notifications.email.addressChange,
      mactoken: req.params.mactoken,
    });
  } else if (userSelection === EMAIL.STOP) {
    res.render('confirm-emails-stop', {
      i18n: res.locals.i18n.notifications.email.stop,
      mactoken: req.params.mactoken,
    });
  } else {
    res.render('manage-email-notifications', {
      i18n: locale.notifications.email.manage,
      mactoken: req.params.mactoken,
      field: {
        error: true,
        errorMessage: errors.selectAnOption
      }
    });
  }
});

router.post(`${notificationRoot}/:mactoken/stop`, validateToken, (req, res, next) => {
  const token = res.locals.token;
  AppealsService.stopReceivingEmails(token.appealId, token.subscriptionId).then((result) => {
    res.render('stopped-email-notifications', {
      data: { id: token.appealId },
      i18n: res.locals.i18n.notifications.email.stopConfirmation,
      mactoken: req.params.mactoken,
    });
  }).catch((error) => {
    next(error);
  });
});


router.get(`${notificationRoot}/:mactoken/change`, validateToken, (req, res, next) => {
  res.render('email-address-change', {
    i18n: res.locals.i18n.notifications.email.addressChange,
    mactoken: req.params.mactoken,
  });
});

router.post(`${notificationRoot}/:mactoken/change`, validateToken, (req, res, next) => {
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

    res.status(400);
    res.render('email-address-change', {
      fields: fields,
      i18n: res.locals.i18n.notifications.email.addressChange,
      mactoken: req.params.mactoken,
    });
    return;
  }

  if(email !== email2 ) {
    fields.heading = errorTexts.noMatchHeading;
    fields.email.errorMessage = fields.email2.errorMessage = errorTexts.noMatchField;

    res.status(400);
    res.render('email-address-change', {
      fields: fields,
      i18n: res.locals.i18n.notifications.email.addressChange,
      mactoken: req.params.mactoken,
    });
    return;
  }

  if(!EMAIL_REGEX.test(email)) {
    fields.heading = errorTexts.notValidHeading;
    fields.email.errorMessage = fields.email2.errorMessage = errorTexts.notValidField;

    res.status(400);
    res.render('email-address-change', {
      fields: fields,
      i18n: res.locals.i18n.notifications.email.addressChange,
      mactoken: req.params.mactoken,
    });
    return;
  }

  const body = { subscription: { email: email } };
  AppealsService.changeEmailAddress(token.appealId, token.subscriptionId, body).then((result) => {
    res.render('email-address-change-confirmed', {
      i18n: res.locals.i18n.notifications.email.addressChangeConfirmed,
      data: { email: email },
      mactoken: req.params.mactoken,
    });
  }).catch((error) => {
    next(error);
  });
});

router.get('/cookiepolicy', (req, res) => {
  res.render('cookie-policy', {i18n: locale.cookiePolicy, urls});
});

router.get('/_errors/404', (req, res, next) => {
  let err = new Error('Not found');
  err.status = 404;
  next(err);
});

router.get('/_errors/500', (req, res, next) => {
  let err = new Error('Broken');
  err.status = 500;
  next(err);
});

module.exports = router;
