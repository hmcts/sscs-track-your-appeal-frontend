const { Logger } = require('@hmcts/nodejs-logging');
const logger = Logger.getLogger('server.js');
const app = require('app.js');
const port = app.get('port');

app.listen(port);
logger.info(`Server listening on port: ${port}`);
