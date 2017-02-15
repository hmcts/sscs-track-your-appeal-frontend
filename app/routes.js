const _ = require('lodash');
const ServiceLoader = require('app/services/ServiceLoader');
const AppealsService = ServiceLoader.instance().load(ServiceLoader.appeals);
const HealthService = ServiceLoader.instance().load(ServiceLoader.health);
const TokenService = ServiceLoader.instance().load(ServiceLoader.token);
const locale = require('app/assets/locale/en');
const {SHOW_HEARING_DETAILS} = require('app/config');
const express = require('express');
const router = express.Router();
const rootPath = '/progress';
const EMAIL = {
  CHANGE: 'changeEmailAddress',
  STOP: 'stopEmails',
  NO_MATCH: 'Emails do not match',
  NOT_VALID: 'Not a valid email address',
  EMPTY_STRING: 'Please enter an email address'
};
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

router.use((req, res, next) => {

  if (_.startsWith(req.url, rootPath)) {
    let id = req.url.split('/')[2];
    //console.log(`GET:/appeals/${id} : PATH:${req.url}`);
    AppealsService.status(id).then((appeal) => {
      res.locals.appeal = appeal;
      next();
    }).catch((error) => {
      next(error);
    })
  } else {
    next();
  }

});

router.get(`${rootPath}/:id/abouthearing`, (req, res) => {
  res.render('about-hearing', _getData(res.locals.appeal));
});

router.get(`${rootPath}/:id/trackyourappeal`, (req, res) => {
  res.render('track-your-appeal', _getData(res.locals.appeal));
});

router.get(`${rootPath}/:id/evidence`, (req, res) => {
  res.render('provide-evidence', _getData(res.locals.appeal));
});

router.get(`${rootPath}/:id/expenses`, (req, res) => {
  res.render('claim-expenses', _getData(res.locals.appeal));
});

router.get(`${rootPath}/:id/hearingdetails`, (req, res) => {
  if (SHOW_HEARING_DETAILS) {
    res.render('hearing-details', Object.assign({i18n: locale}, {data: res.locals.appeal}));
  } else {
    res.send("Sorry, currently unavailable");
  }
});

router.get('/manage-email-notifications/:mactoken', (req, res, next) => {
  TokenService.validateToken(req.params.mactoken).then((result) => {
    req.session.token = result.body.token;
    res.render('manage-email-notifications', {
      i18n: locale.notifications.email.manage
    });
  }).catch((error) => {
    next(error);
  });
});

router.post('/manage-email-notifications', (req, res, next) => {
  const userSelection = req.body.emailNotify;
  if(userSelection === EMAIL.CHANGE) {
    res.render('email-address-change', {
      i18n: locale.notifications.email.addressChange
    });
  } else if (userSelection === EMAIL.STOP) {
    res.render('confirm-emails-stop', {
      i18n: locale.notifications.email.stop
    });
  }
});

router.get('/manage-email-notifications-stop', (req, res, next) => {
  const token = req.session.token;
  AppealsService.stopReceivingEmails(token.appealId, token.subscriptionId).then((result) => {
    res.render('stopped-email-notifications', {
      data: { id: token.appealId },
      i18n: locale.notifications.email.stopConfirmation
    });
  }).catch((error) => {
    next(error);
  });
});

router.post('/manage-email-notifications-change', (req, res, next) => {
  const token = req.session.token;
  const email = req.body.email;
  const email2 = req.body.email2;

  let errors = {
    email: {
      value: email
    },
    email2: {
      value: email2
    }
  };

  if(email === '' && email2 === '') {
    errors.email.message = errors.email2.message = EMAIL.EMPTY_STRING;
    res.render('email-address-change', {
      errors: errors,
      i18n: locale.notifications.email.addressChange
    });
    return;
  }

  if(email !== email2 ) {
    errors.email.message = errors.email2.message = EMAIL.NO_MATCH;
    res.render('email-address-change', {
      errors: errors,
      i18n: locale.notifications.email.addressChange
    });
    return;
  }

  if(!EMAIL_REGEX.test(email)) {
    errors.email.message = errors.email2.message = EMAIL.NOT_VALID;
    res.render('email-address-change', {
      errors: errors,
      i18n: locale.notifications.email.addressChange
    });
    return;
  }

  const body = { subscription: { email: email } };
  AppealsService.changeEmailAddress(token.appealId, token.subscriptionId, body).then((result) => {
    res.render('email-address-change-confirmed', {
      i18n: locale.notifications.email.addressChangeConfirmed,
      data: { email: email } });
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

router.get('/', function (req, res, next) {
  //console.log(`PATH:${req.url}`);
  return next({
    message: `Not found, you probably want ${rootPath}/:id/trackyourappeal`,
    responseCode: 404,
  });
});

_getData = (appeal) => {
  return {
    i18n: locale,
    data: appeal,
    feature: {
      SHOW_HEARING_DETAILS: SHOW_HEARING_DETAILS
    }
  };
};

module.exports = router;
