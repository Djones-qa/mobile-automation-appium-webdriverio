import { config as baseConfig } from './wdio.base.conf';
import * as path from 'path';

export const config: WebdriverIO.Config = {
  ...baseConfig,
  specs: [path.resolve(__dirname, '../tests/**/*.spec.ts')],
  maxInstances: 1,
  capabilities: [{
    platformName: 'Android',
    'appium:deviceName': 'emulator-5554',
    // Match the available emulator OS version (current device shows API 16).
    'appium:platformVersion': '16',
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
