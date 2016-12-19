const SERVICE_NAME = 'Track my appeal for Social Security and Child Support';
const TRACK_YOUR_APPEAL_ENDPOINT = (process.env.SSCS_API_URL || 'http://localhost:8080') + '/appeals';
const STATUSES = {
    APPEAL: 0,
    DWP_RESPOND: 1,
    HEARING_BOOKED: 2,
    HEARING: 3
};

class Config {

    static get TRACK_YOUR_APPEAL_ENDPOINT() {
        return TRACK_YOUR_APPEAL_ENDPOINT;
    }

    static get SERVICE_NAME() {
        return SERVICE_NAME;
    }

    static get STATUSES() {
        return STATUSES;
    }
}

module.exports = Config;