const {Logger, Express} = require('@hmcts/nodejs-logging');
const healthcheck = require('@hmcts/nodejs-healthcheck');
const express = require('express');
const expressNunjucks = require('express-nunjucks');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const locals = require('app/locals');
const config = require('app/config');
const routes = require('app/routes');
const {tyaNunjucks, filters} = require('app/core/tyaNunjucks');
const ErrorHandling = require('app/core/ErrorHandling');
const os = require('os');
const path = require('path');
const helmet = require('helmet');

const app = express();

const PORT = 3000;
app.set('port', process.env.PORT || PORT);

Logger.config({
  microservice: 'track-your-appeal-frontend',
  team: 'sscs',
  environment: process.env.NODE_ENV,
});

// Tests
app.set('portFrom', PORT);
app.set('portTo', PORT + 50);

app.set('view engine', 'html');
app.set('views', [
  __dirname + '/lib/',
  __dirname + '/app/views',
  __dirname + '/app/views/notifications'
]);

app.use(Express.accessLogger());

// Protect against some well known web vulnerabilities
// by setting HTTP headers appropriately.
app.use(helmet());

// Helmet content security policy (CSP) to allow only assets from same domain.
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    fontSrc: ["'self' data:"],
    scriptSrc: ["'self'", "'unsafe-inline'", 'www.google-analytics.com'],
    connectSrc: ["'self'"],
    mediaSrc: ["'self'"],
    frameSrc: ["'none'"],
    imgSrc: ["'self'", 'www.google-analytics.com'],
  }
}));

// Helmet HTTP public key pinning
app.use(helmet.hpkp({
  maxAge: 900,
  sha256s: ['AbCdEf123=', 'XyzABC123=']
}));

// Helmet referrer policy
app.use(helmet.referrerPolicy({
  policy: 'origin'
}));

// Disallow search index indexing
app.use((req, res, next) => {
  // Setting headers stops pages being indexed even if indexed pages link to them.
  res.setHeader('X-Robots-Tag', 'noindex');
  res.setHeader('X-Served-By', os.hostname());
  res.setHeader('Cache-Control' , 'no-cache, max-age=0, must-revalidate, no-store' );
  next();
});

app.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  res.send('User-agent: *\nDisallow: /');
});

tyaNunjucks.env = expressNunjucks(app, {
  autoescape: true,
  watch: true,
  noCache: false,
  filters: filters
}).env;

app.use('/public', express.static(__dirname + '/public'));
app.use('/public', express.static(__dirname + '/govuk_modules/govuk_template/assets'));
app.use('/public', express.static(__dirname + '/govuk_modules/govuk_frontend_toolkit'));
app.use('/public/images/icons', express.static(__dirname + '/govuk_modules/govuk_frontend_toolkit/images'));

// Elements refers to icon folder instead of images folder
app.use(favicon(path.join(__dirname, 'govuk_modules', 'govuk_template', 'assets', 'images', 'favicon.ico')));

app.use('/status', healthcheck.configure({
  checks: {
    'track-your-appeal-api': healthcheck.web(config.healthAPI)
  }
}));

// Support for parsing data in POSTs
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(locals);
app.use('/', routes);

app.use(ErrorHandling.handle404);
app.use(process.env.NODE_ENV === 'development' ?
  ErrorHandling.handleErrorDuringDevelopment :
  ErrorHandling.handleError);

module.exports = app;
