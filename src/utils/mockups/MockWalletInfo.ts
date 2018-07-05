import { WalletInfo } from 'verge-node-typescript/dist/WalletInfo'

class MockWalletInfo implements WalletInfo {
  balance: number
  blocks: number
  connections: number
  difficulty: number
  difficulty_blake: number
  difficulty_groestl: number
  difficulty_lyra2re: number
  difficulty_scrypt: number
  difficulty_x17: number
  errors: string
  ip: string
  keypoololdest: number
  keypoolsize: number
  moneysupply: number
  newmint: number
  paytxfee: number
  pow_algo: string
  pow_algo_id: number
  protocolversion: number
  proxy: string
  stake: number
  testnet: boolean
  version: string
  walletversion: number
}

export default MockWalletInfo
