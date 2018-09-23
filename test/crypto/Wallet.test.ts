import { VergeLightClient } from '../../src/crypto/Wallet'
import { bwsClientMock } from '../mocks/BWSClientMock'

it('should fail if passphrase is empty', () => {
  const client = new VergeLightClient({})
  expect(() => client.createNewWallet('')).toThrowError(
    'No Empty passphrase allowed',
  )
})

it('should fail if passphrase is empty', async () => {
  const client = new VergeLightClient(bwsClientMock)

  const data = await client.createNewWallet('mypass')
  expect(data).toBeDefined()
  expect(data.mnemonic).toBeDefined()
  expect(typeof data.mnemonic).toBe('string')
})
