export interface Address {
  address: string
  result: string
  error: string
}

export interface Sync {
  result: string
  error: string
}

export interface BWSNotification {
  version: string
  createdOn: number
  id: number
  type: string
  data: Address | Sync
  walletId: string
  creatorId: string
}
