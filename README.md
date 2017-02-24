# SSCS - Track your appeal

## Dependencies
 - [node.js](https://nodejs.org) >= v7
 - npm >= v4 (note that npm ships with node.js) 

## Install application dependencies
    $> npm install

## Generate/copy assets over

##### Development
    $> npm run dev
 
##### Production
    $> npm run setup
    $> npm start

## Open a browser including the ID
    http://localhost:3000/progress/id/trackyourappeal 

## Run the unit tests
    $> npm test
    
## Run the acceptance tests
    $> npm run pa11y

## Run the smoke tests
    $> npm run smoke-test
        or
       codeceptjs run test/smoketest/ --steps

## Logging

* There are 8 log levels: {ALL, TRACE, DEBUG, INFO, WARN, ERROR, FATAL, OFF}.
* A level can be set either within app/config.js or via an environment variable LOG_LEVEL within the npm script.
* There are 2 types of logging output, the first is a single line (production), the second is over multiple lines (dev). Both are set via an environment variable: LOG_OUTPUT=single & LOG_OUTPUT=multi
* By default logging is turned off when running the unit tests and the accessability tests.
* A typical HTTP 404 log error when encountering an unknown id would look like the following. Note the property "fields" contains the server errors.

~~~~
{
  responseCode: 404,
  message: 'Not Found',
  fields: [
    { exception: 'uk.gov.hmcts.sscs.exception.AppealNotFoundException'},
    { message: 'No appeal for given id' },
    { path: '/appeals/777' }
  ],
  level: 'ERROR',
  environment: '',
  hostname: 'Pauls-MacBook-Pro.local',
  rootRequestId: '',
  requestId: '',
  originRequestId: '',
  type: 'nodejs',
  microservice: 'track-your-appeal',
  team: 'SSCS',
  timestamp: '2017-01-27T11:27:23+00:00'
}
~~~~
