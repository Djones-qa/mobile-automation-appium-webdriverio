import { execSync } from 'child_process';

export const config: WebdriverIO.Config = {
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

  // Use ts-node instead of the default tsx/esbuild loader (which is blocked in
  // this sandbox) so .ts configs and specs compile without spawning binaries.
  autoCompileOpts: {
    autoCompile: true,
    tsNodeOpts: {
      project: './tsconfig.json',
      transpileOnly: true,
      files: true,
    },
  } as any,

  onPrepare() {
    // Force-stop system apps that keep crashing and blocking the emulator UI
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
        // ignore — adb may not be in PATH or app may not be running
      }
    }
  },
};
