import { computed, decorate, observable, action } from 'mobx'

import { WalletInfo } from 'verge-node-typescript/dist/WalletInfo'
import electronLog from 'electron-log'
import { remote } from 'electron'
import VergeClient from './VergeClient'

const getAccountInfo = () =>
  VergeClient.getInfo()
    .then(info =>
      VergeClient.getPeerInfo().then(peers => {
        const highestBlock = Math.max(...peers.map(peer => peer.startingheight))
        return VergeClient.unlockWallet('a')
          .then(() => ({ ...info, highestBlock, unlocked: true }))
          .catch(e => {
            return {
              ...info,
              highestBlock,
              unlocked: e.includes('already unlocked'),
            }
          })
      }),
    )
    .catch(electronLog.error)

interface Info extends WalletInfo {
  highestBlock: number
  unlocked?: boolean
  loadingProgress: number
}

export class AccountInformationStore {
  info: Info = <Info>{}

  constructor() {
    setInterval(() => {
      getAccountInfo()
        .then(info => {
          this.info = {
            ...this.info,
            ...info,
            loadingProgress: remote.getGlobal('sharedObj').loadingProgress,
          }
          localStorage.info = JSON.stringify(this.info)
          electronLog.log('Updated wallet information successfully.')
        })
        .catch(() => {
          this.info = {
            ...this.info,
            loadingProgress: remote.getGlobal('sharedObj').loadingProgress,
          }
          electronLog.warn('Couldn`t fetch wallet information')
        })
    }, 10000)
  }

  sendTransaction(vergeAddress, amount) {
    return VergeClient.sendToAddress(vergeAddress, amount)
  }

  unlockWallet(password) {
    return VergeClient.unlockWallet(password)
  }

  lockWallet() {
    return VergeClient.walletLock()
  }

  addOldInfo(info: Info) {
    this.info = info
  }

  get getUpdatedInfo() {
    return this.info
  }

  get getBalance() {
    return this.info.balance || 0
  }

  get unlocked() {
    return this.info.unlocked || false
  }

  get debugPanelInformation() {
    const keys = Object.keys(this.info)
    const values = keys.map(key => ({ key, value: this.info[key] }))
    return values
  }

  receiveNewAddress(): Promise<String> {
    return VergeClient.getNewAddress()
  }
}

decorate(AccountInformationStore, {
  info: observable.struct,
  addOldInfo: action,
  getUpdatedInfo: computed,
  getBalance: computed,
  unlocked: computed,
})

const store = new AccountInformationStore()

try {
  store.addOldInfo(JSON.parse(localStorage.info) || {})
} catch (e) {}

export default store
