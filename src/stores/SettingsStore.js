import { action, computed, observable } from 'mobx'

import ElectronStore from 'electron-store'

const electronStore = new ElectronStore({
  encryptionKey: Buffer.from('vergecurrency'),
})

const CURRENT_VERSION = require('electron').remote.app.getVersion()

class SettingsStore {
  @observable name = electronStore.get('name', 'English')
  @observable currency = electronStore.get('currency', 'USD')
  @observable locale = electronStore.get('locale', 'en-US')
  @observable localeId = electronStore.get('localeId', 'en')
  @observable darkTheme = electronStore.get('darkTheme', false)
  version = CURRENT_VERSION

  @action
  setSettingOption({ key, value }) {
    electronStore.set(key, value)
    this[key] = value
  }

  get appVersion() {
    return this.version
  }

  @computed
  get getDarkTheme() {
    return this.darkTheme
  }

  @computed
  get getName() {
    return this.name
  }

  @computed
  get getCurrency() {
    return this.currency
  }

  @computed
  get getLocaleId() {
    return this.localeId
  }

  @computed
  get getLocale() {
    return this.locale
  }
}

const store = new SettingsStore()
export default store
