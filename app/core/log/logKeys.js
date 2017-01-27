const KEYS = {
  TIMESTAMP: 'timestamp',
  ROOT_REQUEST_ID: 'rootRequestId',
  REQUEST_ID: 'requestId',
  ORIGIN_REQUEST_ID: 'originRequestId',
  TYPE: 'type',
  MICROSERVICE: 'microservice',
  LEVEL: 'level',
  MESSAGE: 'message',
  RESPONSE_CODE: 'responseCode',
  TEAM: 'team',
  ENVIRONMENT: 'environment',
  HOSTNAME: 'hostname',
  FIELDS: 'fields',
  KEY: 'key',
  VALUE: 'value'
};

const VALUES = {
  EMPTY_STRING: '',
  NODEJS: 'nodejs',
  TRACK_YOUR_APPEAL: 'track-your-appeal',
  SSCS: 'SSCS',
  TIMESTAMP_FORMAT: 'YYYY-MM-DDTHH:mm:ssZ'
};

module.exports = {
  KEYS: KEYS,
  VALUES: VALUES
};
