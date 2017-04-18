const packageJson = require('../package.json');
const {STATUSES} = require('app/config');
const locale = require('app/assets/locale/en');

module.exports = (req, res, next) => {
  res.locals.asset_path = '/public/';
  res.locals.releaseVersion = 'v' + packageJson.version;
  res.locals.i18n = locale;
  res.locals.cookieText = locale.cookiePolicy.banner.text;
  res.locals.cookieLink = locale.cookiePolicy.banner.link;

  next();
};
