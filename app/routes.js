const _ = require('lodash');
const ServiceLoader = require('app/services/ServiceLoader');
const AppealsService = ServiceLoader.instance().load(ServiceLoader.appeals);
const HealthService = ServiceLoader.instance().load(ServiceLoader.health);
const TokenService = ServiceLoader.instance().load(ServiceLoader.token);
const locale = require('app/assets/locale/en');
const express = require('express');
const router = express.Router();
const progressRoot = '/progress';
const notificationRoot = '/manage-email-notifications';
const errors = locale.notifications.email.errors;
const urls = require('app/urls');
const EMAIL = {
  CHANGE: 'changeEmailAddress',
  STOP: 'stopEmails',
  EMPTY_STRING_EMAIL_HEADING: errors.emptyStringEmailHeading,
  EMPTY_STRING_EMAIL_HEADING_TWO: errors.emptyStringEmailHeadingTwo,
  EMPTY_STRING_EMAIL_FIELD: errors.emptyStringEmailField,
  EMPTY_STRING_EMAIL_FIELD_TWO: errors.emptyStringEmailFieldTwo,
  NO_MATCH_HEADING: errors.noMatchHeading,
  NO_MATCH_FIELD: errors.noMatchField,
  NOT_VALID_HEADING: errors.notValidHeading,
  NOT_VALID_FIELD: errors.notValidField
};
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function getAppeal(req, res, next) {
  if (req.params.id) {
    //console.log(`GET:/appeals/${id} : PATH:${req.url}`);
    AppealsService.status(req.params.id).then((appeal) => {
      res.locals.appeal = appeal;
      next();
    }).catch((error) => {
      next(error);
    })
  } else {
    next();
  }
}

router.get(`${progressRoot}/:id/abouthearing`, getAppeal, (req, res) => {
  res.render('about-hearing', _getData(res.locals.appeal));
});

router.get(`${progressRoot}/:id/trackyourappeal`, getAppeal, (req, res) => {
  res.render('track-your-appeal', _getData(res.locals.appeal));
});

router.get(`${progressRoot}/:id/evidence`, getAppeal, (req, res) => {
  res.render('provide-evidence', _getData(res.locals.appeal));
});

router.get(`${progressRoot}/:id/expenses`, getAppeal, (req, res) => {
  res.render('claim-expenses', _getData(res.locals.appeal));
});

router.get(`${progressRoot}/:id/hearingdetails`, getAppeal, (req, res) => {
  res.render('hearing-details', _getData(res.locals.appeal));
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
};

router.get(`${notificationRoot}/:mactoken`, validateToken, (req, res, next) => {
  res.render('manage-email-notifications', {
    i18n: locale.notifications.email.manage,
    mactoken: req.params.mactoken,
    field: {
      value:'changeEmailAddress'
    }
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

  let errors = {
    email: {
      value: email
    },
    email2: {
      value: email2
    }
  };

  if(email === '' && email2 === '') {
    errors.heading = errorTexts.emptyStringEmailHeading;
    errors.heading2 = errorTexts.emptyStringEmailHeadingTwo;
    errors.email.field = errorTexts.emptyStringEmailField;
    errors.email2.field = errorTexts.emptyStringEmailFieldTwo;
    errors.isEmptyStringError = true;

    res.status(400);
    res.render('email-address-change', {
      errors: errors,
      i18n: res.locals.i18n.notifications.email.addressChange,
      mactoken: req.params.mactoken,
    });
    return;
  }

  if(email !== email2 ) {
    errors.heading = errorTexts.noMatchHeading;
    errors.email.field = errors.email2.field = errorTexts.noMatchField;

    res.status(400);
    res.render('email-address-change', {
      errors: errors,
      i18n: res.locals.i18n.notifications.email.addressChange,
      mactoken: req.params.mactoken,
    });
    return;
  }

  if(!EMAIL_REGEX.test(email)) {
    errors.heading = errorTexts.notValidHeading;
    errors.email.field = errors.email2.field = errorTexts.notValidField;

    res.status(400);
    res.render('email-address-change', {
      errors: errors,
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

router.get('/status', (req, res, next) => {
  //console.log(`GET:/health: PATH:${req.url}`);
  HealthService.health().then((health) => {
    res.json(health.body);
  });
});

router.get('/cookiepolicy', (req, res) => {
  res.render('cookie-policy', {i18n: locale.cookiePolicy, urls});
});

router.get('/_errors/404', (req, res, next) => {
  let err = new Error('Not found');
  err.status = 404;
  next(err);
})

router.get('/_errors/500', (req, res, next) => {
  let err = new Error('Broken');
  err.status = 500;
  next(err);
});

_getData = (appeal) => {
  return {data: appeal};
};

module.exports = router;
