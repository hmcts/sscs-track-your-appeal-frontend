# SSCS - Track Your Appeal (TYA)

Track your appeal is a node.js web application that allows an appellant to track the progress of their benefit appeal 
online. An appellant may also wish to subscribe to receive updates about their appeal via email and SMS, these are
known as notifications and are not part of this application, they are part of the [API](https://git.reform.hmcts.net/sscs/track-your-appeal-api)
 
## Background

Someone who receives a decision about their entitlement to benefits has the right to appeal against that decision, if 
they disagree with it. The first step is asking the Department for Work and Pensions to look at the decision again. 
This is known as requesting ‘Mandatory Reconsideration’. If they still disagree, they can appeal to the Social Security 
and Child Support tribunal. They are independent and will look at both sides before making a decision on the appeal.

## TYA progress bar
 
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

    http://www.sscs.reform.hmcts.net/trackyourappeal/hmUr1moTZj

The ID `hmUr1moTZj` defined within the URL is randomly generated via the backend. When a user clicks on the URL the 
node app performs a HTTP GET request to the Java API /appeals endpoint passing the ID, the response returns the appeal 
in JSON format, processed and presented to the user. If you wish to view some of the responses take a look at the 
[mocked responses](/test/mock/data)

In order to track an appeal the appellant is required to be [subscribed](https://git.reform.hmcts.net/sscs/track-your-appeal-subscriptions-frontend/blob/master/README.md)

## Application Dependencies
 - [node.js](https://nodejs.org) = v8.9.1
 - yarn

## Commands

### Install application dependencies and generate assets
    $> yarn install
    
### Run development server
    $> yarn dev

### Run production server
    $> yarn start

### Open a browser including the ID
    http://localhost:3000/trackyourappeal/id 

### Running the tests

#### Unit tests
    $> yarn test
    $> yarn coverage

#### Security checks
    $> yarn security-checks

#### Crossbrowser tests
Ensure environment variables 'TUNNEL_IDENTIFIER', 
    $> yarn cross-browser
    
#### Accessibility tests
Pass the `JUNIT_REPORT_PATH` environment variable to use the jenkins reporter.

    $> make test-accessibility
    
#### Smoke tests
Ensure environment variable `NOTIFICATION_API_KEY` is set before running smoke tests.
Pass `E2E_OUTPUT_DIR` environment variable to use mochawesome reporter.

    $> make test-end-to-end
    
