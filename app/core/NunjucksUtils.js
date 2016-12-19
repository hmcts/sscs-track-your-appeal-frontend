const FILTERS = {

    json: function(obj) {
        return JSON.stringify(obj, null, 2);
    }

};

class NunjucksUtils {

    static get filters() {
        return FILTERS;
    }
}

module.exports = NunjucksUtils;