export interface Output {
  amount: number
  toAddress: string
  message?: any
  encryptedMessage?: any
}

export interface ChangeAddress {
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
  hasActivity?: any
  _id: string
}

export interface Input {
  txid: string
  vout: number
  address: string
  scriptPubKey: string
  satoshis: number
  confirmations: number
  locked: boolean
  path: string
  publicKeys: string[]
}

export interface Action {
  version: string
  createdOn: number
  copayerId: string
  type: string
  signatures: string[]
  xpub: string
  comment: string
  copayerName: string
}

export interface OutgoingTransaction {
  version: number
  createdOn: number
  id: string
  walletId: string
  creatorId: string
  coin: string
  network: string
  outputs: Output[]
  amount: number
  message?: any
  payProUrl?: any
  changeAddress: ChangeAddress
  inputs: Input[]
  walletM: number
  walletN: number
  requiredSignatures: number
  requiredRejections: number
  status: string
  txid: string
  broadcastedOn: number
  inputPaths: string[]
  actions: Action[]
  outputOrder: number[]
  fee: number
  feeLevel?: any
  feePerKb: number
  excludeUnconfirmedUtxos: boolean
  addressType: string
  customData?: any
  proposalSignature: string
  proposalSignaturePubKey?: any
  proposalSignaturePubKeySig?: any
  derivationStrategy: string
  creatorName: string
  raw: string
  encryptedMessage?: any
  hasUnconfirmedInputs: boolean
}
