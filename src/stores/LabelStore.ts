import { action, computed, decorate, observable } from 'mobx'

import VergeCacheStore from './VergeCacheStore'

interface Label {
  color: string
  name: string
  description: string
}

interface AddressLabels {
  address: string
  labels?: Label[]
}

export class LabelStore {
  /**
   * Mapped address with their according labels.
   *
   * { "ABCDEFGHIJ-ADDRESS": [mom,monthly,saving] }
   */
  labeledAddresses: AddressLabels[] = VergeCacheStore.get(
    'labeledAddresses',
    [],
  )

  /**
   * All lables with their different colors and names.
   *
   * { "labelId": { color, name, description } }
   */
  labels: Label[] = VergeCacheStore.get('labels', [])

  addLabelsForAddress(address: string, labels: Label) {
    this.labeledAddresses = { ...this.labeledAddresses, [address]: labels }
  }

  getLabelsForAddress(address: string) {
    return this.labeledAddresses.find(
      addressedLabels => addressedLabels.address === address,
    )
  }

  removeLabelFromAddress(address: string, name: string) {}
}

decorate(LabelStore, {
  labeledAddresses: observable,
  addLabelsForAddress: action,
  labels: computed,
})

const labelStore = new LabelStore()
export default labelStore
