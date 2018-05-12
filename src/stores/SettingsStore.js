import { observable, action, computed } from 'mobx'
const ElectronStore = require('electron-store')
const electronStore = new ElectronStore({
  encryptionKey: new Buffer('vergecurrency'),
})

class SettingsStore {
  @observable
  settings = {
    name: electronStore.get('name', 'English'),
    currency: electronStore.get('currency', 'USD'),
    locale: electronStore.get('locale', 'en-US'),
    localeId: electronStore.get('localeId', 'en'),
  }

  @action
  setSettingOption = option => {
    electronStore.set(option.key, option.value)
    this.settings[option.key] = option.value
  }

  @computed
  get getName() {
    return this.settings.name
  }

  @computed
  get getCurrency() {
    return this.settings.currency
  }

  @computed
  get getLocaleId() {
    return this.settings.localeId
  }

  @computed
  get getLocale() {
    return this.settings.locale
  }
}

const store = new SettingsStore()
export default store
