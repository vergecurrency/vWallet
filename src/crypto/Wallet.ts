import * as Client from '../../bitcore/packages/bitcore-wallet-client/'
import settings from '../settings'
import { randomBytes } from 'crypto'
import { Balance } from './Balance'
import { Address } from './Address'
import { WalletTransaction } from './Transaction'
import { OutgoingTransaction } from './OutgoingTransaction'
import VergeCacheStore from '../stores/VergeCacheStore'
import { BWSNotification } from './BWSNotification'
import { logger } from '../utils/Logger'
import { Constants } from '../Constanst'
const invariant = require('invariant')

const client = new Client({
  baseUrl: settings.BITPAY_WALLET.BWS_INSTANCE_URL,
  verbose: settings.BITPAY_WALLET.VERBOSE,
  doNotVerifyPayPro: true,
})

interface CreatedWalletData {
  mnemonic: string
}

export class VergeLightClient {
  private readonly client: any
  private readonly KEY: string = 'WALLET'
  private password: string
  private scannedErrors: number[] = []
  private isScanning: boolean = true

  constructor(client) {
    this.client = client

    if (this.isWalletAlreadyExistent()) {
      this.client.import(VergeCacheStore.get(this.KEY))
    }
  }

  /**
   * Checks if the wallet that is being used
   * is ready for full usage!
   *
   * (best check for start up a wallet)
   */
  public isWalletReady(): boolean {
    return Boolean(this.client.isComplete())
  }

  /**
   * Checks if the currently used wallet is encrypted
   *
   * Kinda like a locked/unlocked check
   */
  public isWalletLocked(): boolean {
    return Boolean(this.client.isPrivKeyEncrypted())
  }

  public isWalletAlreadyExistent(): boolean {
    return typeof VergeCacheStore.get(this.KEY) === 'string'
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
      account: settings.DEFAULT_ACCOUNT, // account zero, we won't support multiple acc
    })

    return new Promise(resolve => {
      this.client.createWallet(
        'wallet',
        // removing names because of tracking
        randomBytes(128).toString('hex'),
        1, // N
        1, // M
        { network: settings.NETWORK, coin: settings.COIN },
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
      VergeCacheStore.set(this.KEY, this.client.export())
      this.client.decryptPrivateKey(passphrase)
    } else {
      // otherwise just write it and keep it locked.
      VergeCacheStore.set(this.KEY, this.client.export())
    }
  }

  async unlock(passphrase: string): Promise<boolean> {
    try {
      // when encryption is off for now, then keep state the same after wards
      if (this.client.isPrivKeyEncrypted()) {
        this.client.decryptPrivateKey(passphrase)
        this.password = passphrase
        return !this.client.isPrivKeyEncrypted()
      }
    } catch (e) {
      return false
    }

    return true
  }

  lock() {
    if (!this.client.isPrivKeyEncrypted()) {
      this.client.encryptPrivateKey(this.password)
      delete this.password
    }
  }

  public getBalance(): Promise<Balance> {
    return new Promise((resolve, reject) => {
      if (this.isScanning) {
        reject('Scanning wallet.')
      }
      // no options needed for our wallet
      client.getBalance({}, (err, balance: Balance) => {
        if (err) reject(err)

        resolve(balance)
      })
    })
  }

  public getAddress(): Promise<Address> {
    return new Promise((resolve, reject) => {
      if (this.isScanning) {
        reject('Scanning wallet.')
      }

      client.createAddress(
        { ignoreMaxGap: true },
        (error, address: Address) => {
          if (error) {
            logger.error(error)
            reject(error)
          }
          return resolve(address)
        },
      )
    })
  }

  public getTransactionHistory(
    limit: number = 10,
  ): Promise<WalletTransaction[]> {
    return new Promise((resolve, reject) => {
      if (this.isScanning) {
        reject('Scanning wallet.')
      }

      client.getTxHistory({ limit }, (err, history) => {
        if (err) return reject(err)

        resolve(history as WalletTransaction[])
      })
    })
  }

  public checkIfReady(): Promise<{
    isReady: boolean
    notifications: BWSNotification[]
  }> {
    return new Promise((resolve, reject) => {
      client.getNotifications(
        {},
        (errors, notifications: BWSNotification[]) => {
          if (errors) {
            return reject(errors)
          }

          const notificationsfiltered = notifications.filter(
            notification =>
              notification.type === 'ScanFinished' &&
              !this.scannedErrors.includes(notification.id),
          )

          this.scannedErrors = [
            ...this.scannedErrors,
            ...notificationsfiltered.map(n => n.id),
          ]

          if (
            notificationsfiltered.length > 0 &&
            notificationsfiltered[0] &&
            notificationsfiltered[0].data &&
            notificationsfiltered[0].data.result === 'error'
          ) {
            client.startScan({}, () => {})
            this.isScanning = true
            resolve({
              isReady: false,
              notifications: this.filterShownNotifications(notifications),
            })
            return
          }

          resolve({
            notifications: this.filterShownNotifications(notifications),
            isReady: true,
          })
          this.isScanning = false
        },
      )
    })
  }

  private filterShownNotifications(
    notifications: BWSNotification[],
  ): BWSNotification[] {
    return notifications.filter(
      notification =>
        !notification.type.includes('NewBlock') ||
        (!notification.type.includes('ScanFinished') ||
          notification.data.result !== 'error'),
    )
  }

  /**
   * Creates, proposes and broadcasts a transaction when requesting it
   * @param passphrase your personal passphrase
   * @param address the crypto address to send your address to
   * @param amount the amount of your transaction in XVG (will be multiplied to sats automatically)
   */
  sendTransaction(
    address: string,
    amount: number,
  ): Promise<OutgoingTransaction> {
    invariant(
      this.password,
      'Something wrong, you should be unlocked by now already ...',
    )

    return new Promise((resolve, reject) => {
      if (this.isScanning) {
        reject('Scanning wallet.')
      }

      this.client.createTxProposal(
        {
          outputs: [
            {
              toAddress: address,
              amount: amount * Constants.satoshiDivider,
              message: '', // not used. bullshit. we are a currency not a note transfer :)
            },
          ],
        },
        (createError, txp) => {
          if (createError) {
            return reject(createError)
          }

          // SIGN PROPOSAL
          //
          client.publishTxProposal({ txp }, (publishError, processedTxp) => {
            if (publishError) {
              return reject(publishError)
            }

            if (!publishError) {
              // BROADCAST PROPOSAL
              client.signTxProposal(
                processedTxp,
                this.password,
                (signingError, stxp) => {
                  if (signingError) {
                    return reject(signingError)
                  }

                  client.broadcastTxProposal(
                    processedTxp,
                    (boradcastErr, tx) => {
                      if (boradcastErr) {
                        return reject(boradcastErr)
                      }
                      return resolve(tx as OutgoingTransaction)
                    },
                  )
                },
              )
            }
          })
        },
      )
    })
  }

  public async rescanWallet() {
    client.getStatus((error, status) => {
      if (error && error.code && error.code.includes('NOTAUTHORIZED')) {
        client.recreateWallet(err => {
          if (err) {
            logger.error(err)
          } else {
            client.getStatus((statusErr, status) => {
              if (statusErr) {
                logger.error(statusErr)
              } else {
                logger.info('Status: ', status)
                client.startScan({}, () => {
                  logger.info('Scan triggered')
                  this.isScanning = true
                })
              }
            })
          }
        })
      } else {
        /*client.startScan({}, () => {
          logger.info('Scan triggered')
          this.isScanning = true
        })*/
      }
    })
  }

  public getStatus(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.isScanning) {
        reject('Scanning wallet.')
      }
      client.getStatus((error, status) => {
        if (error) {
          return reject(error)
        }

        return resolve(status)
      })
    })
  }

  /**
   * Restores a wallet with a given mnmoic
   * Basic restoring of keys and additional information
   *
   * No transactions or Balances or used Addresses
   * Those have to be synced afterwards manually.
   */
  public async restoreWalletFromMnemoic(
    mnemonic: string,
    passphrase: string,
  ): Promise<boolean> {
    invariant(!!mnemonic, 'Mnemonic is required and can´t be emtpy')
    invariant(!!passphrase, 'Passphrase is required and can´t be emtpy')
    // check that we aren't mindlessly overwriting wallets
    invariant(
      !this.isWalletAlreadyExistent(),
      'Existing wallet can`t be overriden!',
    )

    try {
      await client.seedFromMnemonic(mnemonic, {
        passphrase,
        account: settings.DEFAULT_ACCOUNT,
        network: settings.NETWORK,
      })
      return true
    } catch (e) {
      throw new Error(
        'Your mnemonic/passphrase wasn`t recognized correctly.\n' +
          'Either it is in a wrong language or you have left our some words.\n' +
          'Please also check your passphrase.',
      )
    }
  }

  public getMnemonic(): string {
    return this.client.credentials.mnemonic
  }
}

export default new VergeLightClient(client)
