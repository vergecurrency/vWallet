import { VergeLightClient } from '../../src/crypto/Wallet'
import * as Client from 'bitcore-wallet-client'
import settings from '../../src/settings'

const exampleBackend = new Client({
  baseUrl: settings.BITPAY_WALLET.BWS_INSTANCE_URL,
  verbose: settings.BITPAY_WALLET.VERBOSE,
  doNotVerifyPayPro: true,
})

it('should fail if passphrase is empty', () => {
  const client = new VergeLightClient({})
  expect(() => client.createNewWallet('')).toThrowError(
    'No Empty passphrase allowed',
  )
})

it('should fail if passphrase is empty', async () => {
  const client = new VergeLightClient(exampleBackend)

  const data = await client.createNewWallet('mypass')
  expect(data).toBeDefined()
  expect(data.mnemonic).toBeDefined()
  expect(typeof data.mnemonic).toBe('string')
})
