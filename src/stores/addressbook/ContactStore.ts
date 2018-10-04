import { action, computed, observable } from 'mobx'

// import VergeCacheStore from '../VergeCacheStore'
import IContact from './IContact'
import Contact from './Contact'
import { IObservableArray } from 'mobx/lib/types/observablearray'

export class ContactStore {
  contacts: IObservableArray<IContact> = observable.array(
    [
      new Contact('Marvin Piekarek', 'DQzawfix9gWQpbhWBwhNgJQCVbtfUkdFYJ'),
      new Contact('Swen van Zanten', 'DPK7q2UHUNEeCphh1vnMjYgpEyawfmNngD'),
      new Contact('Herbert Maier', 'DQzoF2ix9gWQpbhWBwhNgJQCVbtfUkdFYJ'),
      new Contact('Justin Sun', 'DPK7q2UHUNEeafsh1vnMjYnpEyJQfmNngD'),
      new Contact('Justin Sunerok', 'DQzoF2ix9gWQpb1WBwhNgJQCVbtfUkdFYJ'),
    ],
    { deep: true },
  ) // VergeCacheStore.get('contacts', [])

  constructor() {}

  @action
  addContact(newContact: IContact): void {
    this.contacts.push(newContact)
    // VergeCacheStore.set('contacts', this.contacts)
  }

  @action
  removeContact(removeContact: IContact): void {
    this.contacts.remove(removeContact)
    // VergeCacheStore.set('contacts', this.contacts)
  }

  @action
  getContactById(id: string): IContact | undefined {
    return this.contacts.find(contact => contact.id === id)
  }

  @computed
  get allContacts(): IObservableArray<IContact> {
    return this.contacts
  }
}

const contactStore = new ContactStore()
export default contactStore
