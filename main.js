const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const url = require('url')
const childProcess = require('child_process')
const ps = require('ps-node');

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
      '-server=1',
      `-rpcuser=${auth.user}`,
      `-rpcpassword=${auth.pass}`
    ],
    {
      stdio: ['inherit', 'pipe', 'inherit'],
    },
  )

  console.info('VERGE Process running @ ', vergeProcess.pid, ' pid')
  const readable = vergeProcess.stdout

  readable.on('readable', () => {
    let chunk
    while (null !== (chunk = readable.read())) {
      const loadRegex = /\d+/
      const chunkString = chunk.toString()
      if (chunkString.includes('Loading block index')) {
        const [number] = chunkString.match(loadRegex)
        auth.loadingProgress = number
      }
    }
  })
}

if (process.env.NODE_ENV === 'dev') {
  console.info('Creating the verge deamon - dev')
  console.info('Starting tor...')
  createProc('./build/verged')
  console.info('VERGE Process running')
} else {
  createProc(process.resourcesPath + '/build/')
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
    webPreferences: {
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
    console.log('Killing verge process')
    ps.kill(vergeProcess.pid, 'SIGKILL', (err) => {
      if (err) {
        throw new Error(err);
      } else {
        isAlive = false
        console.log(`Process with pid ${vergeProcess.pid} has been killed!`);
      }
    });

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
    webPreferences: {
      nodeIntegration: true
    }
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

    ipcMain.once('loading-finished', () => {
      loadingWindow.close()
      loadingWindow = null

      mainWindow.show()
    })
  })

  loadingWindow.on('closed', function () {
    loadingWindow = null
  })
}

app.on('ready', function () {
  /*autoUpdater
    .checkForUpdatesAndNotify()
    .then(value => {
      console.info(
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
      createLoadingWindow()
      createWindow()
    })*/
  createLoadingWindow()
  createWindow()
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
