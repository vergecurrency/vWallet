import { VergeLightClient } from '../../src/crypto/Wallet'
import { bwsClientMock } from '../mocks/BWSClientMock'
import * as fs from 'fs'
import * as path from 'path'

const TEST_WALLET_PATH = path.resolve(__dirname, '../assets/wallet.dat')

describe('[Component] Wallet management system', () => {
  beforeEach(() => {
    if (fs.existsSync(TEST_WALLET_PATH)) fs.unlinkSync(TEST_WALLET_PATH)
  })

  test('should fail if passphrase is empty', () => {
    const client = new VergeLightClient({})
    expect(() => client.createNewWallet('')).toThrowError(
      'No Empty passphrase allowed',
    )
  })

  test('Wallet creation should work and return a valid mnemonic', async () => {
    const client = new VergeLightClient(bwsClientMock())

    expect(client.isWalletReady()).toBe(false)
    expect(client.isWalletLocked()).toBe(false)
    expect(client.isWalletAlreadyExistent()).toBe(false)

    const data = await client.createNewWallet('mypass')

    expect(data).toBeDefined()
    expect(data.mnemonic).toBeDefined()
    expect(typeof data.mnemonic).toBe('string')
    expect(fs.existsSync(TEST_WALLET_PATH)).toBe(true)
  })

  test('should fail if passphrase is empty', async () => {
    const client = new VergeLightClient(bwsClientMock())

    expect(client.isWalletReady()).toBe(false)
    expect(client.isWalletLocked()).toBe(false)
    expect(client.isWalletAlreadyExistent()).toBe(false)

    const data = await client.createNewWallet('mypass')

    expect(client.isWalletReady()).toBe(true)
    expect(client.isWalletLocked()).toBe(false)
    expect(client.isWalletAlreadyExistent()).toBe(true)
  })
})
