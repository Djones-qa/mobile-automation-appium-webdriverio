import { config as baseConfig } from './wdio.base.conf';

export const config = {
  ...baseConfig,
  specs: ['./tests/**/*.spec.ts'],
  capabilities: [{
    platformName: 'iOS',
    'appium:deviceName': 'iPhone 15',
    'appium:platformVersion': '17.0',
    'appium:automationName': 'XCUITest',
    'appium:browserName': 'Safari',
    'appium:noReset': false,
  }],
};
