const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const url = require('url')
const childProcess = require('child_process')
const { autoUpdater } = require('electron-updater')
const log = require('electron-log')
const { platform } = require('os')
//autoUpdater.logger = log
//autoUpdater.logger.transports.file.level = 'info'

let mainWindow
let loadingWindow

let dev = false
if (
  process.defaultApp ||
  /[\\/]electron-prebuilt[\\/]/.test(process.execPath) ||
  /[\\/]electron[\\/]/.test(process.execPath)
) {
  dev = true
}

const generator = () =>
  Math.random()
    .toString(36)
    .slice(-8)

const auth = { pass: generator(), user: generator(), loadingProgress: 0 }

global.sharedObj = auth

let vergeProcess
let torProcessManager = {
  tor: null,

  /**
   * Start the tor process.
   *
   * @param {string} executablePath
   * @returns void
   */
  startProcess(executablePath) {
    this.tor = childProcess.spawn(
      `${executablePath}tor/${this.executable()}`,
      ['-f', `${executablePath}tor/torrc`],
      {
        stdio: ['inherit', 'inherit', 'inherit', 'ipc'],
      },
    )
  },

  /**
   * Kill the tor process.
   *
   * @returns void
   */
  killProcess() {
    if (this.tor) {
      try {
        process.kill(this.tor.pid)
      } catch (e) {
        console.error(e)
      }
    }
  },

  /**
   * Get the correct executable tor binary for the current system.
   *
   * @returns {string}
   */
  executable() {
    // const platform = platform()
    switch (platform()) {
      case 'darwin':
        return 'darwin/tor'
      case 'win32':
        return 'win32/tor.exe'
      default:
        log.error(
          `The tor version for your operating system hasn't been implemented yet.`,
        )
    }
  },
}

let createProc = processPath => {
  vergeProcess = childProcess.spawn(
    processPath,
    [
      '-daemon',
      `-rpcuser=${auth.user}`,
      `-rpcpassword=${auth.pass}`,
      '-printtoconsole',
    ],
    {
      stdio: ['inherit', 'pipe', 'inherit'],
    },
  )
  log.info('VERGE Process running @ ', vergeProcess.pid + 1, ' pid')
  const readable = vergeProcess.stdout
  //vergeProcess.unref()
  readable.on('readable', () => {
    let chunk
    while (null !== (chunk = readable.read())) {
      const loadRegex = /\d+/
      const chunkString = chunk.toString()
      if (chunkString.includes('Loading block index')) {
        const [number] = chunkString.match(loadRegex)
        auth.loadingProgress = number
      }
      log.log('loading progress: ', auth.loadingProgress, '%')
    }
  })
}

if (process.env.NODE_ENV === 'dev') {
  log.info('Creating the verge deamon - dev')
  // createProc('./build/VERGEd')
  log.info('Starting tor...')
  torProcessManager.startProcess('./build/')
  log.info('VERGE Process running')
} else {
  // createProc(process.resourcesPath + '/VERGEd')
  torProcessManager.startProcess(process.resourcesPath + '/build/')
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 768,
    minWidth: 1200,
    minHeight: 768,
    show: false,
    frame: false,
    titleBarStyle: 'hiddenInset',
    icon: __dirname + '/verge.ico',
    resizable: true,
    fullscreenable: true,
  })

  let indexPath
  if (dev && process.argv.indexOf('--noDevServer') === -1) {
    indexPath = url.format({
      protocol: 'http:',
      host: 'localhost:8080',
      pathname: 'index.html',
      slashes: true,
    })
  } else {
    indexPath = url.format({
      protocol: 'file:',
      pathname: path.join(__dirname, 'dist', 'index.html'),
      slashes: true,
    })
  }
  mainWindow.loadURL(indexPath)

  mainWindow.once('finalized-loading', () => {
    mainWindow.show()
  })

  mainWindow.on('closed', () => {
    log.log('Killing verge process')
    while (vergeProcess && !vergeProcess.killed) {
      try {
        process.kill(vergeProcess.pid + 1, 'SIGINT')
      } catch (e) {}
    }

    log.log('Killing tor process')
    torProcessManager.killProcess()

    mainWindow = null
  })
}

function createLoadingWindow() {
  loadingWindow = new BrowserWindow({
    width: 825,
    height: 576,
    show: false,
    frame: false,
    icon: __dirname + '/verge.ico',
    resizable: false,
    fullscreenable: false,
    transparent: true,
  })

  let indexPath
  if (dev && process.argv.indexOf('--noDevServer') === -1) {
    indexPath = url.format({
      protocol: 'http:',
      host: 'localhost:8080',
      pathname: 'loading.html',
      slashes: true,
    })
  } else {
    indexPath = url.format({
      protocol: 'file:',
      pathname: path.join(__dirname, 'dist', 'loading.html'),
      slashes: true,
    })
  }
  loadingWindow.loadURL(indexPath)

  loadingWindow.once('ready-to-show', () => {
    loadingWindow.show()
  })

  ipcMain.once('finalized-loading', () => {
    loadingWindow.close()
    loadingWindow = null

    mainWindow.show()
  })

  loadingWindow.on('closed', function() {
    loadingWindow = null
  })
}

app.on('ready', function() {
  autoUpdater
    .checkForUpdatesAndNotify()
    .then(value => {
      log.info(
        `Checking update - Info: ${(value &&
          value.updateInfo.stagingPercentage) ||
          -1}%`,
      )
    })
    .then(() => {
      createLoadingWindow()
      createWindow()
    })
    .catch(e => {
      // log.error(e)
      createLoadingWindow()
      createWindow()
    })
})

app.on('window-all-closed', () => {
  app.quit()
})

app.on('activate', () => {
  if (mainWindow === null) {
    createLoadingWindow()
    createWindow()
  }
})
