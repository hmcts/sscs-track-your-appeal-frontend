const request = require('superagent');
const Config = require('app/config');
const mockedData = require('test/mock/trackyourappeal.json');
const TIMEOUT = 50;

class TrackMyAppealService {

    static status(id) {
        return request('GET', Config.TRACK_YOUR_APPEAL_ENDPOINT + '/' + id);
    }

    static get mockStatus() {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(mockedData), TIMEOUT);
        });
    }
}

module.exports = TrackMyAppealService;