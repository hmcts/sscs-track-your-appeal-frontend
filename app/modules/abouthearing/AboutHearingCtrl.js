const TrackYourAppealService = require('app/services/TrackYourAppealService');
const locale = require('app/assets/locale/en');

let singleton = Symbol();
let singletonEnforcer = Symbol();

class AboutHearing {

  constructor(enforcer, router) {
    if (enforcer != singletonEnforcer) {
      throw new Error('Cannot construct AboutHearing singleton, use the static instance function');
    }
    this.initRoutes(router);
  }

  initRoutes(router) {
    router.get('/progress/:id/abouthearing', this.aboutHearing);
  }

  aboutHearing(req, res) {
    TrackYourAppealService.status(req.params.id).then((appeal) => {
      res.render('about-hearing', Object.assign({i18n: locale}, {data: appeal}));
    });
  }

  static instance(router) {
    if (typeof router !== 'function') {
      throw new TypeError('router must be a function, e.g. express.Router()');
    }

    if (!this[singleton]) {
      this[singleton] = new AboutHearing(singletonEnforcer, router);
    }
    return this[singleton];
  }
}

module.exports = AboutHearing;
