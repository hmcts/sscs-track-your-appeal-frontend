# SSCS - Track your appeal

## Dependencies
 - [node.js](https://nodejs.org) >= v7
 - npm >= v4 (note that npm ships with node.js) 

## Commands

### Install application dependencies and generate assets
    In order for yarn to communicate with Artifactory we need to go through a proxy when installing our dependencies.
    $> http_proxy=http://proxyout.reform:8080 yarn install
    
### Run development server
    $> yarn dev

### Run production server
    $> yarn start

### Open a browser including the ID
    http://localhost:3000/progress/id/trackyourappeal 

### Running the tests

#### Unit tests
    $> yarn test
    $> yarn coverage

#### Security checks
    $> yarn security-checks

#### Accessibility tests
Pass the `JUNIT_REPORT_PATH` environment variable to use the jenkins reporter.

    $> make test-accessibility
    
#### Smoke tests
Ensure environment variable `NOTIFICATION_API_KEY` is set before running smoke tests.
Pass `E2E_OUTPUT_DIR` environment variable to use mochawesome reporter.

    $> make test-end-to-end
 
## Error pages
- `/_errors/404` HTTP 404 Not found
- `/_errors/500` HTTP 500 Internal server error
