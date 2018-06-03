import { action, computed, decorate, observable } from 'mobx'
const ElectronStore = require('electron-store')
const electronStore = new ElectronStore({
  encryptionKey: Buffer.from('vergecurrency'),
})

class SetupStore {
  setupOpen = !electronStore.get('setupOpen', true)

  setSetup = bool => {
    electronStore.set('setupOpen', bool)
    this.setupOpen = bool
  }

  get getSetupStatus() {
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
