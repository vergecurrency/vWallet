import IContact from './IContact'
import { computed, action, observable } from 'mobx'

export default class Contact implements IContact {
  @observable name: string
  @observable address: string

  constructor(name: string, address: string) {
    this.name = name
    this.address = address
  }

  @computed
  get id() {
    return btoa(this.address + this.name)
  }
  @computed
  get fullname() {
    return `${this.name}`
  }

  @action
  setName(name: string) {
    this.name = name
  }

  @action
  setAddress(address: string) {
    this.address = address
  }
}
