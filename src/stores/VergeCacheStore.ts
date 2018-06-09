import electronStore = require('electron-store')

const vergeCacheStore: electronStore = new electronStore({
  encryptionKey: Buffer.from('vergecurrency'),
})

export default vergeCacheStore
