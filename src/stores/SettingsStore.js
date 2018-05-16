import { observable, action, computed } from 'mobx'
import ElectronStore from 'electron-store'
const electronStore = new ElectronStore({
  encryptionKey: new Buffer('vergecurrency'),
})

class SettingsStore {
  @observable name = electronStore.get('name', 'English')
  @observable currency = electronStore.get('currency', 'USD')
  @observable locale = electronStore.get('locale', 'en-US')
  @observable localeId = electronStore.get('localeId', 'en')
  @observable darkTheme = electronStore.get('darkTheme', false)

  @action
  setSettingOption({ key, value }) {
    electronStore.set(key, value)
    this[key] = value
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
