import { action, computed, decorate, observable } from 'mobx';

const electronStore = require('electron-store');

const store = new electronStore({
  encryptionKey: Buffer.from('vergecurrency'),
});

const CURRENT_VERSION = require('electron').remote.app.getVersion();

export class SettingsStore {
  name: string = store.get('name', 'English');
  currency: string = store.get('currency', 'USD');
  locale: string = store.get('locale', 'en-US');
  localeId: string = store.get('localeId', 'en');
  darkTheme: boolean = store.get('darkTheme', false);
  version: string = CURRENT_VERSION;

  setSettingOption({ key, value }: { key: string, value: any }) {
    store.set(key, value);
    this[key] = value;
  }

  get appVersion() {
    return this.version;
  }

  get getDarkTheme() {
    return this.darkTheme;
  }

  get getName() {
    return this.name;
  }

  get getCurrency() {
    return this.currency;
  }

  get getLocaleId() {
    return this.localeId;
  }

  get getLocale() {
    return this.locale;
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
});

const settingStore = new SettingsStore();
export default settingStore;
