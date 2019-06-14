let vergeCacheStore
if (process.env.NODE_ENV !== 'test') {
  const electronStore = require('electron-store')
  vergeCacheStore = new electronStore({
    encryptionKey: Buffer.from('vergecurrency'),
  })
} else {
  let testStore = {}
  vergeCacheStore = {
    get: name => testStore[name],
    set: (name, data) => {
      testStore = { ...testStore, [name]: data }
    },
    clean: () => {
      testStore = {}
    },
  }
}

export default vergeCacheStore
