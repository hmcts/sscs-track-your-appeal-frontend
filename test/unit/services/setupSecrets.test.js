const { expect } = require('chai');
const { cloneDeep } = require('lodash');
const config = require('config');
const proxyquire = require('proxyquire');

const modulePath = 'app/services/setupSecrets';

let mockConfig = {};

describe(modulePath, () => {
  describe('#setup', () => {
    beforeEach(() => {
      mockConfig = cloneDeep(config);
    });

    it('should set config values when secrets path is set', () => {
      mockConfig.secrets = {
        sscs: {
          tyacookiesecret: 'cookie',
          AppInsightsInstrumentationKey: '0000-0000-0000-0000'
        }
      };

      // Update config with secret setup
      const setupSecrets = proxyquire(modulePath,
        { config: mockConfig });
      setupSecrets();

      expect(mockConfig.session.cookieSecret)
        .to.equal(mockConfig.secrets.sscs.tyacookiesecret);
      expect(mockConfig.appInsights.instrumentationKey)
        .to.equal(mockConfig.secrets.sscs.AppInsightsInstrumentationKey);
    });

    it('should not set config values when secrets path is not set', () => {
      // Update config with secret setup
      const setupSecrets = proxyquire(modulePath,
        { config: mockConfig });
      setupSecrets();

      expect(mockConfig.session.cookieSecret)
        .to.equal(config.session.cookieSecret);
      expect(mockConfig.appInsights.instrumentationKey)
        .to.equal(config.appInsights.instrumentationKey);
    });

    it('should only set one config value when single secret path is set', () => {
      mockConfig.secrets = { sscs: { tyacookiesecret: 'cookie' } };

      // Update config with secret setup
      const setupSecrets = proxyquire(modulePath,
        { config: mockConfig });
      setupSecrets();

      expect(mockConfig.secrets.cookieSecret)
        .to.equal(mockConfig.secrets.sscsyacookiesecret);
      expect(mockConfig.appInsights.instrumentationKey)
        .to.equal(config.appInsights.instrumentationKey);
    });
  });
});
