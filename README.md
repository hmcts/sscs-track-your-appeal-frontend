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
- Ensure environment variable NOTIFICATION_API_KEY is set before running smoke tests.

    $> npm run smoke-test
 
## Run the security checks
    $> npm run security-checks
