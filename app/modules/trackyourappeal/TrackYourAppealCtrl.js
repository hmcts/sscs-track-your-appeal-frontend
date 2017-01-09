const TrackYourAppealService = require('app/services/TrackYourAppealService');
const I18nHelper = require('app/core/I18nHelper');
const locale = require('app/assets/locale/en');

let singleton = Symbol();
let singletonEnforcer = Symbol();

class TrackYourAppeal {

  constructor(enforcer, router) {
    if (enforcer != singletonEnforcer) {
      throw new Error("Cannot construct TrackYourAppeal singleton, use the static instance function");
    }
    this.initRoutes(router);
  }

  initRoutes(router) {
    router.get('/', this.redirectRoot);
    router.get('/trackyourappeal/:id', this.getStatus);
  }

  redirectRoot(req, res) {
    return res.redirect(302, 'trackyourappeal');
  }

  getStatus(req, res) {
    TrackYourAppealService.status(req.params.id).then((result) => {
      let appeal = result.body.appeal;
      I18nHelper.setHeadingAndRenderedContentOnEvents(appeal.events);
      res.render('track-your-appeal', Object.assign({i18n: locale}, {data: appeal}));
    });
  }

  static instance(router) {
    if (typeof router !== 'function') {
      throw new TypeError('router must be a function, e.g. express.Router()');
    }

    if (!this[singleton]) {
      this[singleton] = new TrackYourAppeal(singletonEnforcer, router);
    }

    return this[singleton];
  }
}

module.exports = TrackYourAppeal;
