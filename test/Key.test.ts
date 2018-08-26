import * as crypto from '../src/crypto/key'

test('generates the correct seed lengths', () => {
  expect(crypto.generateRandomSeed().length).toBe(32)
})

/*test('penetration test on buffer random lenght', () => {
  expect(crypto.generateRandomSeed(429496729).length).toBe(429496729)
})*/

const seed = crypto.generateRandomSeed()
const publicKey = crypto.getPublicKeyFromPrivateKey(seed, 'compressed')
const pubKeyHash = crypto.getPublicKeyHash(publicKey)
const address = crypto.createAddress(pubKeyHash, 0x1e)

console.log('new address generated:', address)
