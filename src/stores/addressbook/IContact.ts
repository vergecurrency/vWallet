export default interface IContact {
  /**
   * Contacts first name
   */
  name: string

  /**
   * The registered address of the contact
   */
  address: string

  id: string

  setName: (name: string) => void

  setAddress: (address: string) => void
}
