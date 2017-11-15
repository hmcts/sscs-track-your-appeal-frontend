const types = require('app/core/notifications/types');
const packageJson = require('../package.json');
const locale = require('app/assets/locale/en');
const urls = require('app/urls');

module.exports = (req, res, next) => {
  res.locals.asset_path = '/public/';
  res.locals.releaseVersion = 'v' + packageJson.version;
  res.locals.i18n = locale;
  res.locals.cookies    = locale.cookiePolicy.footer.cookies;
  res.locals.cookieText = locale.cookiePolicy.banner.text;
  res.locals.cookieLink = locale.cookiePolicy.banner.link;
  res.locals.types = types;
  res.locals.urls = urls;

  next();
};
