# SSCS - Track your appeal

## Background
Track Your Appeal (TYA) is a node.js web application that allows an appellant to track their benefit appeal online.

An appellant typically tracks their appeal after appealing to the Department for Work and Pensions (DWP) to reinstate their benefits.
A subscribed appellant is also notified via email and SMS which is not part of this application.

**There are 4 main statuses (happy path) within TYA:**

1. `Appeal received`
2. `DWP respond`
3. `Hearing booked`
4. `Hearing`

![Track your appeal progress bar](/app/assets/images/progress-bar.png?raw=true)

**With 9 status exceptions (unhappy path):** 

1. `Adjourned`
2. `Closed`
3. `Dormant`
4. `DWP respond overdue`
5. `Lapsed revised`
6. `New hearing booked`
7. `Past hearing booked`
8. `Postponed`
9. `Withdrawn`

From a progress bar standpoint each exception is paired with one of the 4 main statuses, technically they are all 
classified as [events](/app/core/events.js)

In the early stages of an appeal an email/letter is sent to the appellant containing a link/URL respectively 
which looks like:

    http://www.sscs.reform.hmcts.net/progress/hmUr1moTZj/trackyourappeal 

The ID `hmUr1moTZj` defined within the URL is randomly generated via the backend. When a user clicks on the URL the 
node app performs a HTTP GET request to the Java API /appeals endpoint passing the ID, the response returns the appeal 
in JSON format, processed and presented to the user. If you wish to view some of the responses take a look at the 
[mocked responses](/test/mock/data)

In order to track an appeal the appellant is required to be [subscribed](https://git.reform.hmcts.net/sscs/track-your-appeal-subscriptions-frontend/blob/master/README.md)

## Dependencies
 - [node.js](https://nodejs.org) >= v7
 - yarn

## Commands

### Install application dependencies and generate assets
    $> yarn install
    
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

#### Continuous Integration

[Jenkins - TYA frontend](https://dev-build.reform.hmcts.net/view/SSCS/job/sscs-track-your-appeal-frontend)
