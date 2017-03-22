# SSCS - Track your appeal

## Dependencies
 - [node.js](https://nodejs.org) >= v7
 - npm >= v4 (note that npm ships with node.js) 

## Commands

### Install application dependencies and generate assets
    $> make install

### Run development server
    $> npm run dev

### Run production server
    $> npm start

### Open a browser including the ID
    http://localhost:3000/progress/id/trackyourappeal 

### Run the tests

#### Unit tests
    $> make test-unit
    $> make test-coverage

#### Security checks
    $> make test-security

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
