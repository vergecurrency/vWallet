import * as Client from 'bitcore-wallet-client'
import settings from '../settings'
import * as fs from 'fs'
import * as torRequest from 'tor-request'
import * as path from 'path'
import { app } from 'electron'
import { randomBytes } from 'crypto'
const invariant = require('invariant')

const getUserDataPath = () => {
  if (!app) {
    return path.resolve(__dirname, '../../test/assets')
  }

  return app.getPath('userData')
}

const client = new Client({
  baseUrl: settings.BITPAY_WALLET.BWS_INSTANCE_URL,
  verbose: settings.BITPAY_WALLET.VERBOSE,
  doNotVerifyPayPro: true,
  request: torRequest,
})

interface CreatedWalletData {
  mnemonic: string
}

export class VergeLightClient {
  private readonly client: any
  private readonly walletPath: string

  constructor(client) {
    this.client = client
    this.walletPath = path.join(getUserDataPath(), settings.WALLET_PATH_NAME)
  }

  /**
   * Checks if the wallet that is being used
   * is ready for full usage!
   *
   * (best check for start up a wallet)
   */
  public isWalletReady(): boolean {
    return this.client.isComplete()
  }

  /**
   * Checks if the currently used wallet is encrypted
   *
   * Kinda like a locked/unlocked check
   */
  public isWalletLocked(): boolean {
    return this.client.isPrivKeyEncrypted()
  }

  public isWalletAlreadyExistent(): boolean {
    return fs.existsSync(this.walletPath)
  }

  /**
   * Creates OR overrides a wallet
   * @param passphrase
   */
  public createNewWallet(passphrase: string): Promise<CreatedWalletData> {
    invariant(!!passphrase, 'No Empty passphrase allowed')
    // check that we aren't mindlessly overwriting wallets
    invariant(
      !this.isWalletAlreadyExistent(),
      'Existing wallet can`t be overriden!',
    )
    // creates a new wallet with all data (privKey,Mnemonic ...)
    this.client.seedFromRandomWithMnemonic({
      passphrase,
      coin: settings.COIN,
      network: settings.NETWORK,
      account: 0, // account zero, we won't support multiple acc
    })

    return new Promise(resolve => {
      this.client.createWallet(
        'wallet',
        // removing names because of tracking
        randomBytes(128).toString('hex'),
        1, // N
        1, // M
        { network: settings.NETWORK },
        err => {
          // check if we received errors
          invariant(!err, `Error happend while creating wallet: ${err}`)

          this.exportEncryptedWalletToFile(passphrase)

          return resolve({
            mnemonic: this.client.credentials.mnemonic,
          })
        },
      )
    })
  }

  exportEncryptedWalletToFile(passphrase: string) {
    // when encryption is off for now, then keep state the same after wards
    if (!this.client.isPrivKeyEncrypted()) {
      this.client.encryptPrivateKey(passphrase)
      fs.writeFileSync(this.walletPath, this.client.export())
      this.client.decryptPrivateKey(passphrase)
    } else {
      // otherwise just write it and keep it locked.
      fs.writeFileSync(this.walletPath, this.client.export())
    }
  }

  /**
   * Restores a wallet with a given mnmoic
   * Basic restoring of keys and additional information
   *
   * No transactions or Balances or used Addresses
   * Those have to be synced afterwards manually.
   */
  public restoreWalletFromMnemoic(
    mnemonic: string,
    passphrase: string,
  ): Promise<CreatedWalletData> {
    invariant(!!mnemonic, `Mnemonic is required and can't be emtpy`)
    invariant(!!passphrase, `Passphrase is required and can't be emtpy`)
    // check that we aren't mindlessly overwriting wallets
    invariant(
      !this.isWalletAlreadyExistent(),
      'Existing wallet can`t be overriden!',
    )

    // TODO: TO BE IMPLEMENTED
    return Promise.resolve({} as CreatedWalletData)
  }
}

export default new VergeLightClient(client)
