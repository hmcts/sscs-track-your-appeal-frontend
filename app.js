const logging = require('nodejs-logging');
const express = require('express');
const nunjucks = require('express-nunjucks');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const locals = require('app/locals');
const routes = require('app/routes');
const NunjucksUtils = require('app/core/NunjucksUtils');
const os = require('os');
const path = require('path');
const helmet = require('helmet');

const PORT = 3000;
const TEST_PORT = 3021;

function init() {

  const exp = express();

  logging.config({
    microservice: 'sscs-track-your-appeal',
    team: 'SSCS',
    environment: process.env.NODE_ENV
  });

  const logger = logging.getLogger('app.js');

  exp.set('view engine', 'html');
  exp.set('views', [
    __dirname + '/lib/',
    __dirname + '/app/views',
    __dirname + '/app/views/notifications'
  ]);

  const njk = nunjucks(exp, {
    autoescape: true,
    watch: true,
    noCache: false,
    filters: NunjucksUtils.filters
  });

  NunjucksUtils.env = njk.env;

  // Protect against some well known web vulnerabilities
  // by setting HTTP headers appropriately.
  exp.use(helmet());

  // Sets "X-XSS-Protection: 1; mode=block".
  exp.use(helmet.xssFilter({ setOnOldIE: true }));

  // Disallow search index indexing
  exp.use((req, res, next) => {
    // Setting headers stops pages being indexed even if indexed pages link to them.
    res.setHeader('X-Robots-Tag', 'noindex');
    res.setHeader('X-Served-By', os.hostname());
    next();
  });

  exp.use('/public', express.static(__dirname + '/public'));
  exp.use('/public', express.static(__dirname + '/govuk_modules/govuk_template/assets'));
  exp.use('/public', express.static(__dirname + '/govuk_modules/govuk_frontend_toolkit'));
  exp.use('/public/images/icons', express.static(__dirname + '/govuk_modules/govuk_frontend_toolkit/images'));

  // Elements refers to icon folder instead of images folder
  exp.use(favicon(path.join(__dirname, 'govuk_modules', 'govuk_template', 'assets', 'images', 'favicon.ico')));

  // Support for parsing data in POSTs
  exp.use(bodyParser.json());
  exp.use(bodyParser.urlencoded({
    extended: true
  }));

  exp.use(locals);
  exp.use('/', routes);

  exp.use((err, req, res, next) => {
    const status =  err.status || err.statusCode || err.responseCode;

    let error = {};

    if(status) {
      error.status = status;
      res.status(status);
    }

    if(err.fields && err.fields.length) {
      error.fields = err.fields;
    }

    if(err.message) {
      error.message = err.message;
    }

    if(err.rawResponse) {
      error.rawResponse = err.rawResponse;
    }

    if(err.name) {
      error.name = err.name;
    }

    if(err.stack) {
      error.stack = err.stack;
    }

    res.json(error)

  });

  const srv = exp.listen(process.env.PORT || PORT);

  if(srv.address().port !== TEST_PORT) {
    logger.info(`Express server started on port ${srv.address().port}`);
  }

  return {exp, srv, njk};
}

module.exports = init;
