import { action, computed, decorate, observable } from 'mobx'

import VergeClient from './VergeClient'
import { VergeBitpayClient } from './VergeBitpayClient'

export class SetupStore {
  setupOpen: boolean = (VergeClient as VergeBitpayClient)
    .getWallet()
    .isWalletReady()

  constructor() {
    // Force wallet welcome...
    // VergeCacheStore.set('setupOpen', true)
  }

  setSetup = (bool: boolean) => {
    this.setupOpen = bool
  }

  get getSetupStatus(): boolean {
    return this.setupOpen
  }
}

decorate(SetupStore, {
  setupOpen: observable,
  setSetup: action,
  getSetupStatus: computed,
})

const setupStore = new SetupStore()
export default setupStore
