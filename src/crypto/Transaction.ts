export interface Output {
  amount: number
  address: string
  message?: any
}

export interface WalletTransaction {
  txid: string
  action: string
  amount: number
  fees: number
  time: number
  confirmations: number
  feePerKb: number
  outputs: Output[]
  message?: any
  creatorName: string
  hasUnconfirmedInputs: boolean
}
