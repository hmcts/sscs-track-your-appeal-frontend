require('app-insights').enable();
const { Express } = require('@hmcts/nodejs-logging');
const { tyaNunjucks, filters } = require('app/core/tyaNunjucks');
const health = require('app/services/health');
const monitoring = require('app/services/monitoring');
const ErrorHandling = require('app/core/ErrorHandling');
const nunjucks = require('nunjucks');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
const express = require('express');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const locals = require('app/locals');
const config = require('config');
const routes = require('app/routes');
const helmet = require('helmet');
const os = require('os');
const path = require('path');
const paths = require('paths');

const app = express();

const ONE_MINUTE = 60000;
const THIRTY = 30;
const cookieSecret = config.get('session.cookieSecret');

app.set('view engine', 'html');
app.set('views', [
  `${__dirname}/lib/`,
  `${__dirname}/app/views`,
  `${__dirname}/app/views/notifications`
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
    imgSrc: ["'self'", 'www.google-analytics.com']
  }
}));

// Helmet referrer policy
app.use(helmet.referrerPolicy({ policy: 'origin' }));

// Disallow search index indexing
app.use((req, res, next) => {
  // Setting headers stops pages being indexed even if indexed pages link to them.
  res.setHeader('X-Robots-Tag', 'noindex');
  res.setHeader('X-Served-By', os.hostname());
  res.setHeader('Cache-Control', 'no-cache, max-age=0, must-revalidate, no-store');
  next();
});

app.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  res.send('User-agent: *\nDisallow: /');
});

const nunjucksEnv = nunjucks.configure([
  path.join(__dirname, 'app', 'views'),
  path.join(__dirname, 'app', 'views', 'notifications'),
  path.join(__dirname, 'govuk_modules', 'govuk_template', 'views', 'layouts'),
  __dirname
], {
  autoescape: true,
  watch: process.env.NODE_ENV !== 'production',
  express: app,
  noCache: false
});
Object.keys(filters).map(key => {
  return nunjucksEnv.addFilter(key, filters[key]);
});

tyaNunjucks.env = nunjucksEnv;


app.use('/public', express.static(`${__dirname}/public`));
app.use('/public', express.static(`${__dirname}/govuk_modules/govuk_template/assets`));
app.use('/public', express.static(`${__dirname}/govuk_modules/govuk_frontend_toolkit`));
app.use('/public/images/icons', express.static(
  `${__dirname}/govuk_modules/govuk_frontend_toolkit/images`));

// Elements refers to icon folder instead of images folder
app.use(favicon(path.join(
  __dirname,
  'govuk_modules',
  'govuk_template',
  'assets',
  'images',
  'favicon.ico')
));

// API health check
app.use(paths.health, health);
app.use(paths.monitoring, monitoring);

// Support for parsing data in POSTs
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('trust proxy', 1);
app.use(cookieParser(cookieSecret));
app.use(cookieSession({
  name: 'tya-surname-appeal-validated',
  secret: cookieSecret,
  maxAge: THIRTY * ONE_MINUTE,
  secure: process.env.NODE_ENV !== 'development',
  httpOnly: true
}));

app.use(locals);
app.use('/', routes);
app.use(ErrorHandling.handle404);
app.use(ErrorHandling.handleError);

module.exports = app;
