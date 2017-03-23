const packageJson = require('../package.json');
const {STATUSES} = require('app/config');
const locale = require('app/assets/locale/en');

module.exports = (req, res, next) => {
  res.locals.asset_path = '/public/';
  res.locals.releaseVersion = 'v' + packageJson.version;
  res.locals.cookieText = locale.cookiePolicy.banner.text;
  res.locals.cookieLink = locale.cookiePolicy.banner.link;

  res.locals.isActive = function (status, currentStatus) {
    return STATUSES[currentStatus].value >= STATUSES[status].value ? 'active' : '';
  };
  next();
};
