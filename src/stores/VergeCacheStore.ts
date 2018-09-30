import * as electronStore from 'electron-store'

const vergeCacheStore: any = new electronStore({
  encryptionKey: Buffer.from('vergecurrency'),
})

export default vergeCacheStore
