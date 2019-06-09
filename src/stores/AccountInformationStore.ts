import { computed, observable, action } from 'mobx'

import { WalletInfo } from '../vClient/WalletInfo'

import VergeClient from './VergeClient'
import { logger } from '../utils/Logger'

interface Info extends WalletInfo {
  highestBlock: number
  unlocked?: boolean
  loadingProgress: number
  isReady: boolean
  isunlocked: boolean
}

export class AccountInformationStore {
  @observable.struct
  info: Info = {} as Info

  @observable
  notifications: INotification[] = []

  constructor() {
    setInterval(() => {
      VergeClient.getInfo()
        .then((info: WalletInfo) => {
          this.info = {
            ...this.info,
            ...info,
            balance: info.balance,
          }

          this.info.isReady = true
        })
        .catch(e => logger.error(e.message))
    },          2500)
  }

  sendTransaction(vergeAddress: string, amount: number) {
    return VergeClient.sendToAddress(vergeAddress, amount)
  }

  @action
  async unlockWallet(password) {
    const unlocked = await VergeClient.unlockWallet(password)
    if (unlocked) {
      this.info = { ...this.info, unlocked, isunlocked: unlocked }
    }

    return unlocked
  }

  @action
  lockWallet() {
    VergeClient.walletLock().then(() => {
      this.info.unlocked = false
      this.info.isunlocked = false
    })

    return true
  }

  get resolveLastFourNotifications(): INotification[] {
    if (this.notifications.length <= 4) {
      return this.notifications
    }

    return (this.notifications && this.notifications.slice(0, 3)) || []
  }

  @computed
  get getUpdatedInfo() {
    return this.info
  }

  @computed
  get getBalance() {
    return this.info.balance || 0
  }

  @computed
  get unlocked(): boolean {
    return !this.info.isunlocked || false
  }

  @computed
  get debugPanelInformation() {
    const keys = Object.keys(this.info)
    const values = keys.map(key => ({ key, value: this.info[key] }))
    return values
  }

  receiveNewAddress(): Promise<String> {
    return VergeClient.getNewAddress()
  }

  isPrepared(): boolean {
    return true // Always prep'd
  }
}

const store = new AccountInformationStore()

export default store
