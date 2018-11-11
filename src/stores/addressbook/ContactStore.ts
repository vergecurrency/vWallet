import { action, computed, observable } from 'mobx'

import VergeCacheStore from '../VergeCacheStore'
import IContact from './IContact'
import { IObservableArray } from 'mobx/lib/types/observablearray'
import Contact from './Contact'

export class ContactStore {
  contacts: IObservableArray<IContact> = observable.array(
    VergeCacheStore.get('contacts', []).map(Contact.dezerializeJSON),
    { deep: true },
  )

  @observable
  filterText: string = ''

  constructor() {}

  @action
  addContact(newContact: IContact): void {
    this.contacts.push(newContact)
  }

  @action
  removeContact(removeContact: IContact): void {
    this.contacts.remove(removeContact)
  }

  @action
  getContactById(id: string): IContact | undefined {
    return this.contacts.find(contact => contact.id === id)
  }

  @action
  setSearchTerm(searchTerm: string) {
    this.filterText = searchTerm
  }

  @computed
  get filterTerm() {
    return this.filterText
  }

  @computed
  get allContacts(): IContact[] {
    VergeCacheStore.set('contacts', this.contacts)
    if (!this.filterText) {
      return this.contacts
    }

    return this.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.filterText.toLowerCase()),
    )
  }
}

const contactStore = new ContactStore()
export default contactStore
