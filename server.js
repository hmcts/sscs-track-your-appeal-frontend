const { Logger } = require('@hmcts/nodejs-logging');
const logger = Logger.getLogger('server.js');
const config = require('config');
const app = require('app.js');

const port = config.get('node.port');
app.listen(port);
logger.info(`Server listening on port: ${port}`);
