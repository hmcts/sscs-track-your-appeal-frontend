const { expect, sinon } = require('test/chai-sinon');
const { aboutHearingContent, emailNotifications } = require('app/middleware/content');
const { appeal } = require('test/mock/data/oral/appealReceived');

describe('content.js', () => {
  const req = sinon.stub();
  const next = sinon.stub();
  let res = null;

  beforeEach(() => {
    res = {
      locals: {
        appeal,
        i18n: {
          hearing: 'Hearing benefit type = {{ benefitType }}',
          notifications: 'Notifications benefit type = {{ benefitType }}'
        },
        token: { benefitType: 'pip' }
      }
    };
  });

  describe('aboutHearingContent', () => {
    beforeEach(() => {
      aboutHearingContent(req, res, next);
    });

    it('should have called next', () => {
      return expect(next).to.have.been.called;
    });

    it('should replace the placeholder with the string', () => {
      expect(res.locals.i18n.hearing).to.equal('Hearing benefit type = esa');
    });
  });

  describe('emailNotifications', () => {
    beforeEach(() => {
      emailNotifications(req, res, next);
    });

    it('should have called next', () => {
      return expect(next).to.have.been.called;
    });

    it('should replace the placeholder with the string', () => {
      expect(res.locals.i18n.notifications).to.equal('Notifications benefit type = pip');
    });
  });
});
