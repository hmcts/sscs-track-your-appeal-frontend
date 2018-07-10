const supportedBrowsers = {
  ie10_win7: {
    browserName: 'internet explorer',
    name: 'IE10_Win7',
    platform: 'Windows 7',
    ignoreZoomSetting: true,
    nativeEvents: false,
    ignoreProtectedModeSettings: true,
    version: '10'
  },
  ie11_win10: {
    browserName: 'internet explorer',
    name: 'IE11_Win10',
    platform: 'Windows 10',
    ignoreZoomSetting: true,
    nativeEvents: false,
    ignoreProtectedModeSettings: true,
    version: '11'
  },
  chrome_win_latest: {
    browserName: 'chrome',
    name: 'WIN_CHROME_LATEST',
    platform: 'Windows 10',
    version: 'latest'
  },
  chrome_mac_latest: {
    browserName: 'chrome',
    name: 'MAC_CHROME_LATEST',
    platform: 'OS X 10.13',
    version: 'latest'
  },
  firefox_win_latest: {
    browserName: 'firefox',
    name: 'WIN_FIREFOX_LATEST',
    platform: 'Windows 10',
    version: 'latest'
  },
  firefox_mac_latest: {
    browserName: 'firefox',
    name: 'MAC_FIREFOX_LATEST',
    platform: 'OS X 10.13',
    version: 'latest'
  },
  safari11: {
    browserName: 'safari',
    name: 'SAFARI_11',
    platform: 'macOS 10.13',
    version: '11.1'
  }
};

module.exports = supportedBrowsers;
