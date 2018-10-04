export interface Address {
  version: string
  createdOn: number
  address: string
  walletId: string
  isChange: boolean
  path: string
  publicKeys: string[]
  coin: string
  network: string
  type: string
  _id: string
}
