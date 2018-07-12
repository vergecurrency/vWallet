import { action, computed, decorate, observable } from 'mobx'

import VergeCacheStore from './VergeCacheStore'

export class SetupStore {
  setupOpen: boolean = VergeCacheStore.get('setupOpen', true)

  constructor() {
    // Force wallet welcome...
    // VergeCacheStore.set('setupOpen', true)
  }

  setSetup = (bool: boolean) => {
    VergeCacheStore.set('setupOpen', bool)
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
