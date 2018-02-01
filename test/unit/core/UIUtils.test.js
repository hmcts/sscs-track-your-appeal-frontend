const {expect,sinon} = require('test/chai-sinon');
const {events} = require('app/core/events');
const proxyquire = require('proxyquire');

describe('UIUtils.js', () => {

  describe('showProgressBar()', () => {

    let req, res, next, logger, UIUtils;

    before(() => {

      req = {};
      res = {
        locals: {
          appeal: {
            status: events.DWP_RESPOND.name
          }
        }
      };

      next = sinon.spy();

      logger = {
        error: sinon.spy()
      };

      UIUtils = proxyquire('app/core/UIUtils', {
        '@hmcts/nodejs-logging': { Logger: { getLogger: ()=> logger } }
      });

    });

    it('should show the progress bar', () => {
        UIUtils.showProgressBar(req, res, next);
        expect(res.locals.appeal.showProgressBar).to.eq(true);
        expect(next).to.have.been.called;
    });

    it('should hide the progress bar', () => {
      res.locals.appeal.status = events.CLOSED.name;
      UIUtils.showProgressBar(req, res, next);
      expect(res.locals.appeal.showProgressBar).to.eq(false);
      expect(next).to.have.been.called;
    });

    it('should log when unable to map a status to an event', () => {
      res.locals.appeal.status = 'unknown';
      UIUtils.showProgressBar(req, res, next);
      expect(logger.error).to.have.been.calledWith('Unable to map the status unknown to an event:');
      expect(next).to.have.been.called;
    });

    it('should log when the appeal is undefined', () => {
      res.locals.appeal = undefined;
      UIUtils.showProgressBar(req, res, next);
      expect(logger.error).to.have.been.calledWith('Undefined appeal');
      expect(next).to.have.been.called;
    });

  });

});
