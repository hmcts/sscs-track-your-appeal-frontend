# SSCS - Track Your Appeal (TYA)

Track your appeal is a node.js web application that allows an appellant to track the progress of their benefit appeal 
online. An appellant may also wish to subscribe to receive updates about their appeal via email and SMS, however, that 
is not part of this application.

## Background

An appellant can challenge a decision about a benefit claim from the Department for Work and Pensions (DWP) and ask
for reconsideration of the decision before making an appeal, officially this is known as a mandatory reconsideration 
notice (MRN). The DWP must reconsider the decision and provide a response before an appellant can appeal to an 
independent tribunal. If an appellant is not not happy with the DWP’s reconsideration of the initial decision they may 
go on to appeal.
 
**There are 4 main statuses within TYA:**

1. `Appeal received`
2. `DWP respond`
3. `Hearing booked`
4. `Hearing`

![Track your appeal progress bar](/app/assets/images/progress-bar.png?raw=true)

**With 10 status exceptions:** 

1.  `Adjourned`
2.  `Closed`
3.  `Dormant`
4.  `Evidence received`
5.  `DWP respond overdue`
6.  `Lapsed revised`
7.  `New hearing booked`
8.  `Past hearing booked`
9.  `Postponed`
10. `Withdrawn`

From a progress bar standpoint some exceptions are paired with one of the 4 main statuses, whilst some do not have a 
progress bar, `Closed`, `Evidence received`, `Lapsed revised` and `Withdrawn`. All statuses are technically classified 
as [events](/app/core/events.js).

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
