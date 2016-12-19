# SSCS - Track your appeal

## Dependencies
 - [node.js](https://nodejs.org) >= v6
 - npm >= v3 (note that npm ships with node.js) 

## Install application dependencies
    $> npm install

## Generate/copy assets over
    $> npm run generate-assets

## Start the application
    $> npm start

## Open a browser including the appellant ID
    http://localhost:3000/trackyourappeal?id=xxxxxx

## Run the unit tests
    $> npm test

## Run the smoke tests
    $> npm smoke-test
        or
       codeceptjs run test/smoketest/ --steps
