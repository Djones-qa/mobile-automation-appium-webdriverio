const fs = require('fs');

const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
pkg.scripts = {
  "test": "wdio run config/wdio.android.conf.ts",
  "test:android": "wdio run config/wdio.android.conf.ts",
  "allure:report": "allure generate allure-results --clean -o allure-report && allure open allure-report"
};
pkg.description = "Mobile test automation framework using Appium + WebdriverIO + TypeScript for Wikipedia Android app";
pkg.author = "Darrius Jones";

fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
console.log('package.json updated!');
