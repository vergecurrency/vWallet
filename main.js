const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const url = require('url')
const childProcess = require('child_process')
const { autoUpdater } = require('electron-updater')
const log = require('electron-log')

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
} else {
  log.info('Creating the verge deamon - prod')
  createProc(process.resourcesPath + '/VERGEd')
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
    while (!vergeProcess.killed) {
      try {
        process.kill(vergeProcess.pid + 1, 'SIGINT')
      } catch (e) {}
    }

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
