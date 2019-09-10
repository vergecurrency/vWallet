export interface Output {
  amount: number
  address: string
  message?: any
}

export class WalletTransaction {
  txid: string
  action: 'sent' | 'received'
  amount: number
  fees: number
  time: number
  addressTo: string
  confirmations: number
  feePerKb: number
  outputs: Output[]
  message?: any
  creatorName: string
  hasUnconfirmedInputs: boolean
}

export const didPayFee = (tx: WalletTransaction) => tx.action !== 'received'
