'use strict'

// Import parts of electron to use
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const url = require('url')
const menubar = require('menubar')
const childProcess = require('child_process')
const { autoUpdater } = require('electron-updater')

autoUpdater.logger = require('electron-log')
autoUpdater.logger.transports.file.level = 'info'

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
let loadingWindow

// Keep a reference for dev mode
let dev = false
if (
  process.defaultApp ||
  /[\\/]electron-prebuilt[\\/]/.test(process.execPath) ||
  /[\\/]electron[\\/]/.test(process.execPath)
) {
  dev = true
}

console.log(process.resourcesPath + '/Verge.app/Contents/MacOS/Verge')
let createProc = () => {
  let sp = childProcess.spawn(
    process.resourcesPath + '/Verge.app/Contents/MacOS/Verge',
    [
      '-deamon',
      '-rpcuser kyon',
      '-rpcpassword lolcat',
      '-rpcallowip "127.0.0.1"',
      '-printtoconsole',
    ],
  )
  sp.unref()
  sp.on('error', err => {
    console.log('failed to start process', err)
  })
  sp.on('exit', (code, signal) => {
    console.log(`child process exited with code ${code}`)
    createProc()
  })

  sp.on('message', (message, signal) => {
    console.log(`Message: ${message}`)
    createProc()
  })
}

// if (!dev) createProc();

function createTrayIcon() {
  let indexPath
  if (dev && process.argv.indexOf('--noDevServer') === -1) {
    indexPath = url.format({
      protocol: 'http:',
      host: 'localhost:8080',
      pathname: 'status.html',
      slashes: true,
    })
  } else {
    indexPath = url.format({
      protocol: 'file:',
      pathname: path.join(__dirname, 'dist', 'status.html'),
      slashes: true,
    })
  }
  var mb = menubar({
    index: indexPath,
    tooltip: 'VERGE Wallet',
  })

  mb.on('ready', function ready() {
    console.log('app is ready')
  })
}

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 768,
    show: false,
    frame: false,
    icon: __dirname + '/verge.ico',
    resizable: false,
    fullscreenable: false,
  })

  // and load the index.html of the app.
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

  // Don't show until we are ready and loaded
  /*mainWindow.once('ready-to-show', () => {
		mainWindow.show()
		// Open the DevTools automatically if developing
		if (dev) {
			mainWindow.webContents.openDevTools()
		}
	})*/

  mainWindow.once('finalized-loading', () => {
    mainWindow.show()
    // Open the DevTools automatically if developing
    /*if (dev) {
			mainWindow.webContents.openDevTools()
		}*/
  })

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

function createLoadingWindow() {
  // Create the browser window.
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

  // and load the index.html of the app.
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

  // Don't show until we are ready and loaded
  loadingWindow.once('ready-to-show', () => {
    loadingWindow.show()
    // Open the DevTools automatically if developing
    /*if (dev) {
			loadingWindow.webContents.openDevTools()
		}*/
  })

  ipcMain.once('finalized-loading', () => {
    console.warn('triggered event :)')
    loadingWindow.close()
    loadingWindow = null

    mainWindow.show()
  })

  // Emitted when the window is closed.
  loadingWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    loadingWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
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
  // createTrayIcon()
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createLoadingWindow()
    createWindow()
    createTrayIcon()
  }
})
