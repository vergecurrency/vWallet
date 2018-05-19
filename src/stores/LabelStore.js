import { action, computed, decorate, observable } from 'mobx'

import ElectronStore from 'electron-store'

const electronStore = new ElectronStore({
  encryptionKey: new Buffer('vergecurrency'),
})

class LabelStore {
  constructor() {
    /**
     * Mapped address with their according labels.
     *
     * { "ABCDEFGHIJ-ADDRESS": [mom,monthly,saving] }
     */
    this.labeledAddresses = electronStore.get('labeledAddresses', {})

    /**
     * All lables with their different colors and names.
     *
     * { "labelId": { color, name, description } }
     */
    this.labels = electronStore.get('labels', {})
  }

  addLabelsForAddress(address, labels) {
    this.labeledAddresses = { ...this.labeledAddresses, [address]: labels }
  }

  get labels() {
    return this.labels
  }
}

decorate(LabelStore, {
  labeledAddresses: observable,
  addLabelsForAddress: action,
  labels: computed,
})

const store = new LabelStore()
export default store
