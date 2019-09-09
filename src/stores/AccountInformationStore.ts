import { computed, observable, action } from 'mobx'

import { WalletInfo } from 'verge-node-typescript/dist/WalletInfo'

import VergeClient from './VergeClient'
import Wallet from '../crypto/Wallet'
import { Balance } from '../crypto/Balance'
import { BWSNotification } from '../crypto/BWSNotification'
import { logger } from '../utils/Logger'
import { Constants } from '../Constanst'

interface Info extends WalletInfo {
  highestBlock: number
  unlocked?: boolean
  loadingProgress: number
  isReady: boolean
  isunlocked: boolean
}

const checkReadiness: (acccountInfo: AccountInformationStore) => void = (
  acccountInfo: AccountInformationStore,
) => {
  Wallet.checkIfReady()
    .then(({ isReady, notifications }) => {
      acccountInfo.info.isReady = isReady
      acccountInfo.notifications = acccountInfo.mapNotifications(notifications)
    })
    .catch(e => logger.error(e.message))
}

const checkBalances: (acccountInfo: AccountInformationStore) => void = (
  acccountInfo: AccountInformationStore,
) => {
  Wallet.getBalance()
    .then((status: Balance) => {
      acccountInfo.info = {
        ...acccountInfo.info,
        balance: status.availableAmount / Constants.satoshiDivider,
      }
    })
    .catch(e => logger.error(e.message))
}

export class AccountInformationStore {
  @observable.struct
  info: Info = {} as Info

  @observable
  notifications: INotification[] = []

  constructor() {
    checkBalances(this)
    checkReadiness(this)

    setInterval(() => {
      checkBalances(this)
    }, Constants.walletBalanceFetchInterval)
    setInterval(() => {
      checkReadiness(this)
    }, Constants.walletNotificationFetchInterval)
  }

  sendTransaction(vergeAddress: string, amount: number) {
    return Wallet.sendTransaction(vergeAddress, amount)
  }

  mapNotifications(notifications: BWSNotification[]): INotification[] {
    return notifications
      .map(notification => ({
        type: notification.type,
        title: notification.type,
        timeOfOccurance: notification.createdOn,
        inner: notification.data.result,
      }))
      .sort((a, b) => a.timeOfOccurance - b.timeOfOccurance)
  }

  @action
  async unlockWallet(password) {
    const unlocked = await Wallet.unlock(password)
    if (unlocked) {
      this.info = { ...this.info, unlocked, isunlocked: unlocked }

      Wallet.rescanWallet()
    }

    return unlocked
  }

  @action
  lockWallet() {
    if (!Wallet.isWalletLocked()) {
      Wallet.lock()
      this.info.unlocked = false
      this.info.isunlocked = false
    }

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
    return !Wallet.isWalletLocked() || false
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
    return Wallet.isWalletAlreadyExistent()
  }
}

const store = new AccountInformationStore()

export default store
