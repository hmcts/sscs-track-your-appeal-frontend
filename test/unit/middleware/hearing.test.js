const { reformatHearingDetails } = require('app/middleware/hearing');
const { expect, sinon } = require('test/chai-sinon');

const testAddressLines = (
  address,
  venueName,
  addressLine1,
  addressLine2,
  addressLine3,
  postcode) => {
  expect(address).to.be.an('object');
  expect(address.lines[0]).to.equal(venueName);
  expect(address.lines[1]).to.equal(addressLine1);
  expect(address.lines[2]).to.equal(addressLine2);
  expect(address.lines[3]).to.equal(addressLine3);
  expect(address.lines[4]).to.equal(postcode);
};

describe('hearing.js', () => {
  let appeal = null, req = null, res = null, next = null;

  before(() => {
    appeal = {
      // ...
      status: 'HEARING_BOOKED',
      latestEvents: [
        {
          type: 'EVIDENCE_RECEIVED',
          contentKey: 'status.evidenceReceived'
        },
        {
          type: 'HEARING_BOOKED',
          contentKey: 'status.hearingBooked',
          venueName: 'Venue name A',
          addressLine1: 'Address line 1a',
          addressLine2: 'Address line 2a',
          addressLine3: 'Address line 3a',
          postcode: 'postcode a'
        }
      ],
      historicalEvents: [
        {
          type: 'HEARING_BOOKED',
          contentKey: 'status.hearingBooked',
          venueName: 'Venue name B',
          addressLine1: 'Address line 1b',
          addressLine2: 'Address line 2b',
          addressLine3: 'Address line 3b',
          postcode: 'postcode b'
        },
        {
          type: 'DWP_RESPOND',
          contentKey: 'status.dwpRespond'
        },
        {
          type: 'APPEAL_RECEIVED',
          contentKey: 'status.appealReceived'
        }
      ]
    };

    req = sinon.stub();
    res = { locals: { appeal } };
    next = sinon.stub();

    reformatHearingDetails(req, res, next);
  });

  it('should reformat the hearing addresses details in the latest events array', () => {
    testAddressLines(
      res.locals.appeal.latestEvents[1].hearingAddress,
      'Venue name A',
      'Address line 1a',
      'Address line 2a',
      'Address line 3a',
      'postcode a');
  });

  it('should reformat the hearing addresses details in the historical events array', () => {
    testAddressLines(
      res.locals.appeal.historicalEvents[0].hearingAddress,
      'Venue name B',
      'Address line 1b',
      'Address line 2b',
      'Address line 3b',
      'postcode b');
  });

  it('should set the latestHearingBookedEvent when status is HEARING_BOOKED', () => {
    testAddressLines(
      res.locals.appeal.latestHearingBookedEvent.hearingAddress,
      'Venue name A',
      'Address line 1a',
      'Address line 2a',
      'Address line 3a',
      'postcode a');
  });

  it('should set the latestHearingBookedEvent when status is HEARING', () => {
    res.locals.appeal.status = 'HEARING';
    reformatHearingDetails(req, res, next);
    testAddressLines(
      res.locals.appeal.latestHearingBookedEvent.hearingAddress,
      'Venue name B',
      'Address line 1b',
      'Address line 2b',
      'Address line 3b',
      'postcode b');
  });

  it('should call next', () => {
    return expect(next).to.have.been.called;
  });
});
