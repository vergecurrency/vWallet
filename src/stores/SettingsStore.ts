import { action, computed, decorate, observable } from 'mobx'

import VergeCacheStore from './VergeCacheStore'

import { remote } from 'electron'
const CURRENT_VERSION = remote.app.getVersion()

export class SettingsStore {
  name: string = VergeCacheStore.get('name', 'English')
  currency: string = VergeCacheStore.get('currency', 'USD')
  locale: string = VergeCacheStore.get('locale', 'en-US')
  localeId: string = VergeCacheStore.get('localeId', 'en')
  darkTheme: boolean = VergeCacheStore.get('darkTheme', false)
  version: string = CURRENT_VERSION

  setSettingOption({ key, value }: { key: string; value: any }) {
    VergeCacheStore.set(key, value)
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

const settingStore = new SettingsStore()
export default settingStore
