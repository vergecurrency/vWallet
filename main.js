const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const url = require('url')
const childProcess = require('child_process')
const { autoUpdater } = require('electron-updater')

autoUpdater.logger = require('electron-log')
autoUpdater.logger.transports.file.level = 'info'

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

const auth = { pass: generator(), user: generator() }
global.sharedObj = auth
let processes = []
let createProc = processPath => {
  processes = [
    childProcess.spawn(
      processPath,
      [`-rpcuser=${auth.user}`, `-rpcpassword=${auth.pass}`, '-printtoconsole'],
      {
        stdio: [process.stdin, process.stdout, process.stderr],
      },
    ),
  ]
  processes[0].unref()
  processes[0].on('error', err => {
    console.log('failed to start process', err)
  })
  processes[0].on('exit', (code, signal) => {
    console.log(`child process exited with code ${code}`)
  })

  processes[0].on('message', message => {
    console.log(`Message: ${message}`)
  })
}

if (process.env.NODE_ENV === 'dev') createProc('./build/VERGEd')
else createProc(process.resourcesPath + '/Verge.app/Contents/MacOS/VERGEd')

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 768,
    show: false,
    frame: false,
    icon: __dirname + '/verge.ico',
    resizable: false,
    fullscreenable: false,
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

  mainWindow.on('closed', function() {
    processes[0].kill('SIGINT')
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

app.on('ready', () => {
  autoUpdater
    .checkForUpdatesAndNotify()
    .then(value => {
      console.log('UPDATE: ', value && value.updateInfo.stagingPercentage)
      return false
    })
    .then(() => {
      createLoadingWindow()
      createWindow()
    })
    .catch(console.error)
})

app.on('window-all-closed', () => {
  processes[0].kill('SIGINT')
  app.quit()
})

app.on('activate', () => {
  if (mainWindow === null) {
    createLoadingWindow()
    createWindow()
    createTrayIcon()
  }
})
