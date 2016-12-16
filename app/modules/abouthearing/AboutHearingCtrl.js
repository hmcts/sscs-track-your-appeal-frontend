let singleton = Symbol();
let singletonEnforcer = Symbol();

class AboutHearing {

    constructor (enforcer, router) {
        if(enforcer != singletonEnforcer) {
            throw new Error('Cannot construct AboutHearing singleton, use the static instance function');
        }
        this.initRoutes(router);
    }

    initRoutes(router) {
        router.get('/abouthearing', this.aboutHearing);
    }

    aboutHearing(req, res) {
        res.render('about-hearing', {
            content: 'About Hearing goes here...'
        });
    }

    static instance(router) {
        if (typeof router !== 'function') {
            throw new TypeError('router must be a function, e.g. express.Router()');
        }

        if(!this[singleton]) {
            this[singleton] = new AboutHearing(singletonEnforcer, router);
        }
        return this[singleton];
    }
}

module.exports = AboutHearing;
