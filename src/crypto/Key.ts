// nodejs module - https://nodejs.org/api/crypto.html
import { createECDH, randomBytes, ECDH, createHmac, createHash } from 'crypto'
import * as Base58 from 'bs58'
// create curve sepcification based on our coin.
const ecdh: ECDH = createECDH('secp256k1')

export const generateRandomSeed = (size: number = 32): Buffer =>
  randomBytes(size)

export const bufferToHexRepresentation = (bufferInput: Buffer): string =>
  Buffer.from(bufferInput).toString('hex')

export const getPublicKeyFromPrivateKey = (
  privateKey: Buffer | string,
  formatType: 'compressed' | 'uncompressed',
): Buffer => {
  if (privateKey instanceof Buffer) {
    ecdh.setPrivateKey(privateKey)
  } else if (typeof privateKey === 'string') {
    ecdh.setPrivateKey(privateKey, 'hex')
  } else {
    throw Error('Cannot parse your private key type.')
  }

  return Buffer.from(ecdh.getPublicKey('hex', formatType))
}

export const getPublicKeyHash = (publicKey: Buffer): Buffer => {
  return createHash('rmd160')
    .update(
      createHash('sha256')
        .update(publicKey)
        .digest(),
    )
    .digest()
}

export const doubleSHA256 = (secret: Buffer): Buffer =>
  createHash('sha256')
    .update(
      createHash('sha256')
        .update(secret)
        .digest(),
    )
    .digest()

export const createAddress = (payload: Buffer, version: number): string => {
  const buffer = Buffer.concat([Buffer.from([version]), payload])
  const checksum = doubleSHA256(buffer).slice(0, 4)

  return Base58.encode(Buffer.concat([buffer, checksum]))
}
