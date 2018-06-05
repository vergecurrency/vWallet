const electronStore = require('electron-store');

import { action, computed, decorate, observable } from 'mobx';

const store = new electronStore({
  encryptionKey: Buffer.from('vergecurrency'),
});

export class SetupStore {
  setupOpen: boolean = !store.get('setupOpen', true);

  setSetup = (bool: boolean) => {
    store.set('setupOpen', bool);
    this.setupOpen = bool;
  };

  get getSetupStatus(): boolean {
    return this.setupOpen;
  }
}

decorate(SetupStore, {
  setupOpen: observable,
  setSetup: action,
  getSetupStatus: computed,
});

const setupStore = new SetupStore();
export default setupStore;
