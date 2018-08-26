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

  getShortenedName(): string {
    const words = this.name.split(' ')

    // max lenght of avatar name two words
    if (words.length >= 2) {
      return `${words[0]} ${words[1]}`
    }

    // else we can return the normal name :)
    return this.name
  }
}
