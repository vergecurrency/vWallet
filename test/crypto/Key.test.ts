import * as bip39 from 'bip39'
import * as bip32 from 'bip32'
import * as crypto from '../../src/crypto/Key'
import Network from '../../src/crypto/Network'

const generateAddressFromPubKey = pubKey => {
  const pubKeyHash = crypto.getPublicKeyHash(pubKey)
  return crypto.createAddress(pubKeyHash, Network.verge.pubKeyHash)
}

test('generate an address without using BIPS', () => {
  const privateKeyBuffer = crypto.generateRandomSeed()
  const pubKeyBuffer = crypto.getPublicKeyFromPrivateKey(
    privateKeyBuffer,
    'compressed',
  )
  const pubKeyHash = crypto.getPublicKeyHash(pubKeyBuffer)
  // pubKeyHash (number): 0x1e
  const address = crypto.createAddress(pubKeyHash, Network.verge.pubKeyHash)
  console.log(address)
})

test('generates the correct seed lengths', () => {
  expect(crypto.generateRandomSeed().length).toBe(32)
})

test('penetration test on buffer random lenght', () => {
  expect(crypto.generateRandomSeed(5000).length).toBe(5000)
})

test('bip39 mnemonic should reverse into the intial seed', () => {
  bip39
    .mnemonicToSeed(
      'differ device enforce defy dove ice rebuild million escape sea wash rigid',
    )
    .then(seed => {
      // Root Node
      const node = bip32.fromSeed(seed)
      // first child
      const keySet = node.derivePath('m/0/0')
      // 10th children
      const keySetTwo = node.derivePath('m/0/10')

      expect(generateAddressFromPubKey(keySet.publicKey)).toBe(
        'DHbLUf28dQo3qkFBzp3WmtJFVQXMB7irif',
      )

      expect(generateAddressFromPubKey(keySetTwo.publicKey)).toBe(
        'D7fTZyn2TunQrMqZKyS7377v7ySypjMKTe',
      )
    })
})

test('Generate Mnemonic from random secure seed', () => {
  const sixteenSecret = crypto.generateRandomSeed(16)
  const twentySecret = crypto.generateRandomSeed(20)
  const twentyFourSecret = crypto.generateRandomSeed(24)

  const mnemonicSixteen = bip39.entropyToMnemonic(sixteenSecret)
  const mnemonicTwenty = bip39.entropyToMnemonic(twentySecret)
  const mnemonicTwentyfour = bip39.entropyToMnemonic(twentyFourSecret)

  expect(mnemonicSixteen.split(' ').length).toBe(12)
  expect(mnemonicTwenty.split(' ').length).toBe(15)
  expect(mnemonicTwentyfour.split(' ').length).toBe(18)

  expect(bip39.mnemonicToEntropy(mnemonicSixteen)).toBe(
    sixteenSecret.toString('hex'),
  )
  expect(bip39.mnemonicToEntropy(mnemonicTwenty)).toBe(
    twentySecret.toString('hex'),
  )
  expect(bip39.mnemonicToEntropy(mnemonicTwentyfour)).toBe(
    twentyFourSecret.toString('hex'),
  )
})
