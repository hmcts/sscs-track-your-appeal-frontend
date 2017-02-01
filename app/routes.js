const ServiceLoader = require('app/services/ServiceLoader');
const AppealsService = ServiceLoader.load(ServiceLoader.APPEALS);
const locale = require('app/assets/locale/en');
const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
  return res.redirect(302, '/malformedurl');
});

router.get('/malformedurl', function (req, res) {
  return res.render('malformed-url');
});

router.use((req, res, next) => {
  let id = req.url.split('/')[2];
  if (!id) {
    console.log(`Unable to determine id:${id} from path ${req.url}`);
    next();
  }

  console.log(`GET:/appeals/${id} : PATH:${req.url}`);
  AppealsService.status(id).then((appeal) => {
    res.locals.appeal = appeal;
    next();
  }).catch((error) => {
    console.log(error);
    res.status(error.responseCode).send(error);
  })
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
