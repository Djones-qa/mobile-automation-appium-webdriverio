const fs = require('fs');

fs.writeFileSync('config/wdio.base.conf.ts', `export const config: WebdriverIO.Config = {
  runner: 'local',
  framework: 'mocha',
  reporters: ['spec', ['allure', { outputDir: 'allure-results' }]],
  mochaOpts: { ui: 'bdd', timeout: 60000 },
  logLevel: 'info',
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  services: [['appium', { command: 'appium' }]],
  port: 4723,
};
`);

fs.writeFileSync('config/wdio.android.conf.ts', `import { config as baseConfig } from './wdio.base.conf';
const path = require('path');

export const config = {
  ...baseConfig,
  specs: ['./tests/**/*.spec.ts'],
  capabilities: [{
    platformName: 'Android',
    'appium:deviceName': 'Pixel 9a',
    'appium:platformVersion': '16.0',
    'appium:automationName': 'UiAutomator2',
    'appium:app': path.resolve('./apps/wikipedia.apk'),
    'appium:appPackage': 'org.wikipedia.alpha',
    'appium:appActivity': 'org.wikipedia.main.MainActivity',
    'appium:noReset': false,
  }],
};
`);

console.log('All config files written!');
