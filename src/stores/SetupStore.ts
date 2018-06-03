import { action, computed, decorate, observable } from 'mobx'
const ElectronStore = require('electron-store')
const electronStore = new ElectronStore({
  encryptionKey: Buffer.from('vergecurrency'),
})

export class SetupStore {
  setupOpen: boolean = !electronStore.get('setupOpen', true)

  setSetup = (bool: boolean) => {
    electronStore.set('setupOpen', bool)
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

const store = new SetupStore()
export default store
