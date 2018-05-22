import { action, computed, observable } from 'mobx'
const ElectronStore = require('electron-store')
const electronStore = new ElectronStore({
  encryptionKey: new Buffer('vergecurrency'),
})

class SetupStore {
  @observable setupOpen = !electronStore.get('setupOpen', true)

  @action
  setSetup = bool => {
    electronStore.set('setupOpen', bool)
    this.setupOpen = bool
  }

  @computed
  get getSetupStatus() {
    return this.setupOpen
  }
}

const store = new SetupStore()
export default store
