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

  public createNewWallet(passphrase: string): Promise<CreatedWalletData> {
    invariant(!!passphrase, 'No Empty passphrase allowed')

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

          fs.writeFileSync(this.walletPath, this.client.export())
          return resolve({
            mnemonic: this.client.credentials.mnemonic,
          })
        },
      )
    })
  }
}

export default new VergeLightClient(client)
