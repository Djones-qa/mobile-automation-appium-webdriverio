const { spawn } = require('child_process');
const net = require('net');

const APPIUM_PORT = 4725;
const APPIUM_HOST = '127.0.0.1';
const APP_DIR = process.cwd();

function isPortOpen(host, port) {
  return new Promise((resolve) => {
    const sock = net.createConnection({ host, port });
    sock.once('connect', () => { sock.destroy(); resolve(true); });
    sock.once('error', () => { sock.destroy(); resolve(false); });
  });
}

function waitForPort(host, port, timeoutMs) {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const tryConnect = () => {
      const sock = net.createConnection({ host, port });
      sock.once('connect', () => {
        sock.destroy();
        resolve();
      });
      sock.once('error', () => {
        sock.destroy();
        if (Date.now() - start > timeoutMs) {
          reject(new Error(`Timed out waiting for ${host}:${port}`));
        } else {
          setTimeout(tryConnect, 200);
        }
      });
    };
    tryConnect();
  });
}

function startAppium() {
  const appiumCmd = process.platform === 'win32' ? 'node' : 'node';
  const appiumArgs = [
    'node_modules/appium/build/lib/main.js',
    '--base-path',
    '/',
    '--port',
    String(APPIUM_PORT)
  ];

  const child = spawn(appiumCmd, appiumArgs, {
    cwd: APP_DIR,
    stdio: 'inherit',
  });

  child.on('error', (err) => {
    console.error('Failed to start Appium:', err);
  });

  return child;
}

function runWdio() {
  const wdioCmd = process.platform === 'win32'
    ? 'node_modules\\@wdio\\cli\\bin\\wdio'
    : 'node_modules/@wdio/cli/bin/wdio';
  const wdio = spawn('node', [wdioCmd, 'run', 'config/wdio.android.conf.js'], {
    cwd: APP_DIR,
    stdio: 'inherit',
  });
  return wdio;
}

(async () => {
  const appiumAlreadyRunning = await isPortOpen(APPIUM_HOST, APPIUM_PORT);
  let appium;
  let manageAppium = false;

  if (appiumAlreadyRunning) {
    console.log(`Port ${APPIUM_PORT} already in use; assuming Appium is running.`);
  } else {
    console.log('Starting Appium server...');
    appium = startAppium();
    manageAppium = true;
  }

  try {
    // Appium startup can take a while in some environments, allow up to 60s.
    await waitForPort(APPIUM_HOST, APPIUM_PORT, 60_000);
    console.log(`Appium is listening on ${APPIUM_HOST}:${APPIUM_PORT}`);
  } catch (err) {
    console.error('Appium did not start in time:', err);
    process.exit(1);
  }

  const wdio = runWdio();

  const cleanUp = () => {
    if (manageAppium && appium && !appium.killed) {
      appium.kill();
    }
  };

  wdio.on('exit', (code) => {
    cleanUp();
    process.exit(code);
  });
  wdio.on('error', (err) => {
    cleanUp();
    console.error('WDIO process error:', err);
    process.exit(1);
  });
})();
