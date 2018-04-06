const { expect } = require('test/chai-sinon');
const { timeZone, dateFormat } = require('app/core/dateUtils');

describe('timeZone', () => {
  it('should equal Europe/London', () => {
    expect(timeZone).to.equal('Europe/London');
  });
});

describe('dateFormat', () => {
  it('should return an object', () => {
    expect(dateFormat).to.be.an('object');
  });

  it('should contain 3 keys', () => {
    const THREE_KEYS = 3;
    expect(Object.keys(dateFormat).length).to.equal(THREE_KEYS);
    expect(dateFormat).to.have.all.keys(
      'utc',
      'date',
      'time'
    );
  });
});
