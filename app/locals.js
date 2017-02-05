const packageJson = require('../package.json');
const {STATUSES} = require('app/config');

module.exports = (req, res, next) => {
  res.locals.asset_path = '/public/';
  res.locals.session = req.session;
  res.locals.releaseVersion = 'v' + packageJson.version;
  res.locals.isActive = function (status, currentStatus) {
    return STATUSES[currentStatus].value >= STATUSES[status].value ? 'active' : '';
  };
  next();
};
