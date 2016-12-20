const packageJson = require('../package.json');
const Config = require('app/config');

module.exports = (req, res, next) => {
    res.locals.asset_path = '/public/';
    res.locals.session = req.session;
    res.locals.releaseVersion = 'v' + packageJson.version;

    res.locals.isActive = function (status, currentStatus) {
        return Config.STATUSES[currentStatus] >= Config.STATUSES[status] ? 'active' : '';
    };

    next();

};
