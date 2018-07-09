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
  chrome_win_previous: {
    browserName: 'chrome',
    name: 'WIN_CHROME_PREVIOUS',
    platform: 'Windows 8.1',
    version: 'latest-1'
  },
  chrome_mac_latest: {
    browserName: 'chrome',
    name: 'MAC_CHROME_LATEST',
    platform: 'OS X 10.12',
    version: 'latest'
  },
  chrome_mac_previous: {
    browserName: 'chrome',
    name: 'MAC_CHROME_PREVIOUS',
    platform: 'OS X 10.11',
    version: 'latest-1'
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
    platform: 'OS X 10.12',
    version: 'latest'
  }
};

module.exports = supportedBrowsers;
