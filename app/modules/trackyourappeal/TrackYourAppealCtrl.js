let singleton = Symbol();
let singletonEnforcer = Symbol();

class TrackYourAppeal {

    constructor (enforcer, router) {
        if(enforcer != singletonEnforcer) {
            throw new Error("Cannot construct TrackYourAppeal singleton, use the static instance function");
        }
        this.initRoutes(router);
    }

    initRoutes(router) {
        router.get('/', this.redirectRoot);
        router.get('/trackyourappeal', this.getStatus);
    }

    redirectRoot(req, res) {
        return res.redirect(302, 'trackyourappeal');
    }

    getStatus(req, res) {
        res.render('track-your-appeal', {
            content: 'Progress bar goes here...'
        });
    }

    static instance(router) {
        if (typeof router !== 'function') {
            throw new TypeError('router must be a function, e.g. express.Router()');
        }

        if(!this[singleton]) {
            this[singleton] = new TrackYourAppeal(singletonEnforcer, router);
        }

        return this[singleton];
    }
}

module.exports = TrackYourAppeal;
