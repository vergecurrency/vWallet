const { app, BrowserWindow } = require('electron')
const path = require('path')
const url = require('url')
const childProcess = require('child_process')

let mainWindow

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

/*let vergeProcess

let createProc = processPath => {
  vergeProcess = childProcess.spawn(
    processPath
  )
}

if (process.env.NODE_ENV === 'dev') {
  createProc('./build/tor/darwin/tor')
} else {
  createProc(process.resourcesPath + '/build/tor/darwin/tor')
}*/

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
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true
    }
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

  mainWindow.on('closed', () => {
    // console.log('Killing verge process')
    // while (vergeProcess && !vergeProcess.killed) {
    //   try {
    //     process.kill(vergeProcess.pid, 'SIGINT')
    //   } catch (e) {
    //     if (e.code === 'ESRCH') {
    //       vergeProcess = null
    //     }
    //     console.error(e)
    //   }
    // }

    mainWindow = null
  })

  mainWindow.show()
}

app.on('ready', function () {
  createWindow()
})

app.on('window-all-closed', () => {
  app.quit()
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
