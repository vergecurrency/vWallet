const electronStore = require('electron-store')

export const vergeCacheStore = new electronStore({
  encryptionKey: Buffer.from('vergecurrency'),
})

export default vergeCacheStore
