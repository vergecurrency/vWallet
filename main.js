const { app, BrowserWindow } = require('electron')
const path = require('path')
const url = require('url')
const childProcess = require('child_process')

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
      '-server=1',
      `-rpcuser=${auth.user}`,
      `-rpcpassword=${auth.pass}`,
      '-printtoconsole',
    ],
    {
      stdio: ['inherit', 'pipe', 'inherit'],
    },
  )

  console.info('VERGE Process running @ ', vergeProcess.pid + 1, ' pid')
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
      console.log('loading progress: ', auth.loadingProgress, '%')
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
    while (vergeProcess && !vergeProcess.killed) {
      try {
        process.kill(vergeProcess.pid + 1, 'SIGINT')
      } catch (e) {
        if (e.code === 'ESRCH') {
          vergeProcess = null
        }
        console.error(e)
      }
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

    setTimeout(() => {
      loadingWindow.close()
      loadingWindow = null

      mainWindow.show()
    }, 5000)
  })

  loadingWindow.on('closed', function() {
    loadingWindow = null
  })
}

app.on('ready', function() {
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
