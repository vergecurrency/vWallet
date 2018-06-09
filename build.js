'use strict'

const builder = require('electron-builder')

// Promise is returned
builder
  .build({
    config: {
      appId: 'org.verge.electronwallet',
      files: [
        'dist/',
        'main.js',
        'package.json',
        'build/icon.icns',
        'build/icon.ico',
      ],
      dmg: {
        contents: [
          {
            x: 130,
            y: 220,
          },
          {
            x: 410,
            y: 220,
            type: 'link',
            path: '/Applications',
          },
        ],
      },
      mac: {
        category: 'your.vergecurrency.wallet.finance',
        target: ['zip', 'dmg'],
      },
    },
  })
  .then(console.log)
  .catch(console.log)
