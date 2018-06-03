import { action, computed, decorate, observable } from 'mobx'

import ElectronStore from 'electron-store'

const electronStore = new ElectronStore({
  encryptionKey: Buffer.from('vergecurrency'),
})

const CURRENT_VERSION = require('electron').remote.app.getVersion()

class SettingsStore {
  name = electronStore.get('name', 'English')
  currency = electronStore.get('currency', 'USD')
  locale = electronStore.get('locale', 'en-US')
  localeId = electronStore.get('localeId', 'en')
  darkTheme = electronStore.get('darkTheme', false)
  version = CURRENT_VERSION

  setSettingOption({ key, value }) {
    electronStore.set(key, value)
    this[key] = value
  }

  get appVersion() {
    return this.version
  }

  get getDarkTheme() {
    return this.darkTheme
  }

  get getName() {
    return this.name
  }

  get getCurrency() {
    return this.currency
  }

  get getLocaleId() {
    return this.localeId
  }

  get getLocale() {
    return this.locale
  }
}

decorate(SettingsStore, {
  name: observable,
  currency: observable,
  locale: observable,
  localeId: observable,
  darkTheme: observable,
  setSettingOption: action,
  getDarkTheme: computed,
  getName: computed,
  getCurrency: computed,
  getLocaleId: computed,
  getLocale: computed,
})

const store = new SettingsStore()
export default store
