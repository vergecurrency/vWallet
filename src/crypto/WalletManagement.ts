import * as fs from 'fs'
import * as path from 'path'
import { app } from 'electron'
import * as log from 'loglevel'
import { createCipher, createDecipher, randomBytes } from 'crypto'

const ALGORITHM = 'aes-256-cbc'

export default class WalletManagement {
  private readonly dataPath: string
  private key: string
  private data: any

  constructor(databaseName: string, key: string) {
    if (!databaseName || !databaseName.trim()) {
      throw new Error(
        'Database Name is not allowed to be emtpy (use i.e. db.json)',
      )
    }

    if (!key || !key.trim()) {
      throw new Error('Key is not allowed to be emtpy')
    }

    this.dataPath = databaseName
    this.key = key

    this.readFromDisk()
  }

  getUserDataPath() {
    if (!app) {
      return path.resolve(__dirname, '../../test/assets')
    }

    return app.getPath('userData')
  }

  getFullPath() {
    return path.join(this.getUserDataPath(), this.dataPath)
  }

  checkCorrectness(): boolean {
    if (!this.data && !this.data.random) {
      throw new Error(
        'Data has to be initialized before calling this function.',
      )
    }

    try {
      const decrypted = this.decrypt(this.data.random)
      if (decrypted) {
        return true
      }

      throw new Error('There`s no random key attached to this database...')
    } catch (e) {
      return false
    }
  }

  getValue(namespace: string): any | undefined {
    this.checkCorrectness()
    if (!this.data || !this.data[namespace]) {
      return undefined
    }

    return this.decrypt(this.data[namespace])
  }

  setValue(namespace: string, data: any) {
    this.checkCorrectness()
    if (this.data) {
      this.data[namespace] = this.encrypt(data)
    }

    this.saveToDisk()
  }

  decrypt(data: string): any {
    if (typeof data !== 'string') {
      throw new Error('Data to decrypt should be string')
    }

    log.info('Deciphering data with given key')
    const decipher = createDecipher(ALGORITHM, this.key)
    const raw = decipher.update(data, 'base64', 'utf8') + decipher.final('utf8')
    return JSON.parse(raw)
  }

  encrypt(data: any): string {
    log.info('Ciphering data with given key')
    const cipher = createCipher(ALGORITHM, this.key)
    return (
      cipher.update(JSON.stringify(data), 'utf8', 'base64') +
      cipher.final('base64')
    )
  }

  private fileExists(): boolean {
    return fs.existsSync(this.getFullPath())
  }
  private readFromDisk() {
    if (this.fileExists()) {
      this.data = JSON.parse(fs.readFileSync(this.getFullPath(), 'utf8'))
    } else {
      try {
        const newFileData = {
          random: this.encrypt(randomBytes(512).toString('hex')),
        }
        fs.writeFileSync(this.getFullPath(), JSON.stringify(newFileData))
        this.data = newFileData
      } catch (e) {
        throw new Error(
          `Couldn't create a new database file under: ${this.getFullPath}`,
        )
      }
    }
  }

  private saveToDisk() {
    if (this.fileExists()) {
      fs.writeFileSync(this.getFullPath(), JSON.stringify(this.data))
    } else {
      throw new Error('The database file should already exists at this level!')
    }
  }
}
