import WalletManagement from '../../src/crypto/WalletManagement'
import * as fs from 'fs'
import * as path from 'path'

const EXMAPLE_PASSWORD = 'p@ssw0rd'

test('create new WalletManagement', () => {
  const manager = new WalletManagement('db.json', EXMAPLE_PASSWORD)

  expect(manager).toBeDefined()
})

test('create new WalletManagement without path', () => {
  expect(() => {
    new WalletManagement(' ', EXMAPLE_PASSWORD)
  }).toThrow('Database Name is not allowed to be emtpy (use i.e. db.json)')
})

test('Test that key and input returns being the same', () => {
  const manager = new WalletManagement('db.json', EXMAPLE_PASSWORD)

  const encryptedData = manager.encrypt({ test: 'xxx', num: -10141 })
  const decryptedData = manager.decrypt(encryptedData)

  expect(decryptedData.test).toBe('xxx')
  expect(decryptedData.num).toBe(-10141)
})

test('Throws when  decryption key was wrong', () => {
  const manager = new WalletManagement('db.json', 'some other password')
  expect(manager.checkCorrectness()).toBe(false)

  const managerTwo = new WalletManagement('db.json', EXMAPLE_PASSWORD)
  expect(managerTwo.checkCorrectness()).toBe(true)
})

test('gets correct User path', () => {
  const manager = new WalletManagement('db.json', EXMAPLE_PASSWORD)

  expect(manager.getUserDataPath()).toBeDefined()
  expect(manager.getUserDataPath()).toContain('test/assets')
})

test('gets correct fullPath with given name', () => {
  const randomName = (Math.random() * 100_000_000_000)
    .toString(16)
    .replace('.', '')
  const manager = new WalletManagement(
    `test${randomName}.json`,
    EXMAPLE_PASSWORD,
  )

  expect(manager.getFullPath()).toBeDefined()
  expect(manager.getFullPath()).toContain(`assets/test${randomName}.json`)

  const randomPath = path.resolve(__dirname, `../assets/test${randomName}.json`)
  fs.unlinkSync(randomPath)
})

test('gets sets and gets data correctly with a given key', () => {
  const randomName = (Math.random() * 100_000_000_000)
    .toString(16)
    .replace('.', '')
  const manager = new WalletManagement(
    `test${randomName}.json`,
    EXMAPLE_PASSWORD,
  )

  manager.setValue('testValue', 'ILoveMyMum')

  const managerTwo = new WalletManagement(
    `test${randomName}.json`,
    EXMAPLE_PASSWORD,
  )
  expect(managerTwo.getValue('testValue')).toBe('ILoveMyMum')

  const randomPath = path.resolve(__dirname, `../assets/test${randomName}.json`)
  fs.unlinkSync(randomPath)
})
