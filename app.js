const logger = require('app/core/log/Logger').getLogger();
const express = require('express');
const nunjucks = require('express-nunjucks');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const locals = require('app/locals');
const routes = require('app/routes');
const NunjucksUtils = require('app/core/NunjucksUtils');
const os = require('os');
const path = require('path');

const PORT = 3000;

function init() {

  const exp = express();

  exp.set('view engine', 'html');
  exp.set('views', [__dirname + '/lib/', __dirname + '/app/views']);

  const njk = nunjucks(exp, {
    autoescape: true,
    watch: true,
    noCache: false,
    filters: NunjucksUtils.filters
  });

  NunjucksUtils.env = njk.env;

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

  const srv = exp.listen(process.env.PORT || PORT);

  logger.info({
    message: `Express server started on port ${srv.address().port}`
  });

  return {exp,srv,njk};
}

module.exports = init;
