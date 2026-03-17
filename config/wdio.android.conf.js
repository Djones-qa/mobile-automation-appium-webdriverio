const path = require('path');
const baseConfig = require('./wdio.base.conf').config;

/** @type {WebdriverIO.Config} */
exports.config = {
  ...baseConfig,
  specs: [path.resolve(__dirname, '../tests/**/*.spec.ts')],
  maxInstances: 1,
  capabilities: [{
    platformName: 'Android',
    'appium:deviceName': 'emulator-5554',
    // Match the emulator built in CI (android-30 image == Android 11).
    'appium:platformVersion': process.env.ANDROID_PLATFORM_VERSION || '11',
    'appium:automationName': 'UiAutomator2',
    'appium:app': path.resolve(__dirname, '../apps/wikipedia.apk'),
    'appium:appPackage': 'org.wikipedia.alpha',
    'appium:appActivity': 'org.wikipedia.main.MainActivity',
    'appium:autoGrantPermissions': true,
    'appium:noReset': false,
    'appium:fullReset': false,
    'appium:forceAppLaunch': true,
    'appium:adbExecTimeout': 120000,
    'appium:uiautomator2ServerInstallTimeout': 120000,
    'appium:uiautomator2ServerLaunchTimeout': 120000,
    'appium:skipServerInstallation': false,
    'appium:ignoreHiddenApiPolicyError': true,
  }],
};
