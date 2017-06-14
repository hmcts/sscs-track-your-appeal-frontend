const logger = require('nodejs-logging').getLogger('server.js');
const app = require('app.js');

let server = app.listen(app.get('port'));
logger.info(`Server listening on port: ${server.address().port}`);
