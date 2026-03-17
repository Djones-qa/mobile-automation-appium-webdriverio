const { execSync } = require('child_process');

/** @type {WebdriverIO.Config} */
exports.config = {
  runner: 'local',
  framework: 'mocha',
  reporters: ['spec'],
  mochaOpts: { ui: 'bdd', timeout: 120000 },
  logLevel: 'info',
  waitforTimeout: 10000,
  connectionRetryTimeout: 300000,
  connectionRetryCount: 3,
  hostname: 'localhost',
  port: 4725,
  path: '/',

  // Use ts-node instead of the default tsx/esbuild loader (blocked in sandbox)
  // so .ts configs/specs compile without spawning binaries.
  autoCompileOpts: {
    autoCompile: true,
    tsNodeOpts: {
      project: './tsconfig.json',
      transpileOnly: true,
      files: true,
    },
  },

  onPrepare() {
    // Force-stop system apps that sometimes crash the emulator UI.
    const appsToKill = [
      'com.android.bluetooth',
      'com.google.android.apps.wellbeing',
      'com.google.android.settings.intelligence',
    ];
    for (const app of appsToKill) {
      try {
        execSync(`adb -s emulator-5554 shell am force-stop ${app}`, { timeout: 5000 });
        console.log(`Stopped ${app}`);
      } catch (e) {
        // adb may be unavailable in CI/sandbox; ignore errors.
      }
    }
  },
};
