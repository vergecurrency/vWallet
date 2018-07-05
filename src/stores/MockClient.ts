import { Transaction } from 'verge-node-typescript/dist/Transaction'
import { Client } from 'verge-node-typescript'
import { Peer } from 'verge-node-typescript/dist/Peer'
import { WalletInfo } from 'verge-node-typescript/dist/WalletInfo'
const faker = require('faker')

class Info implements WalletInfo {
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

function generateTransaction() {
  const time = Math.trunc(faker.date.recent(12).getTime() / 1000)
  return {
    txid: faker.random.alphaNumeric(64),
    vout: faker.random.alphaNumeric(64),
    account: 'my account',
    address: faker.finance.bitcoinAddress(),
    category: faker.random.boolean() ? 'receive' : 'send',
    amount: faker.finance.amount(),
    confirmations: faker.random.number(),
    blockhash: faker.random.alphaNumeric(64),
    blockindex: faker.random.alphaNumeric(64),
    blocktime: time,
    time: time + 10000,
    timereceived: time + 5000,
  }
}

const { mockClient: mockClient } = require('../dev-config.json')
const transactions = Array(mockClient.transactions)
  .fill(null)
  .map(() => generateTransaction())

class MockClient extends Client {
  unlockWallet(passphrase: any, timeout?: number): Promise<boolean> {
    return new Promise((respond, reject) => {
      return respond(true)
    })
  }
  getBalance(account?: string): Promise<number> {
    return new Promise<number>((respond, reject) => {
      return respond(20202)
    })
  }
  getInfo(): Promise<WalletInfo> {
    return new Promise((respond, reject) => {
      const walletInfo = new Info()
      return respond(walletInfo)
    })
  }
  getPeerInfo(): Promise<Array<Peer>> {
    return new Promise((respond, reject) => {
      return respond([])
    })
  }
  getTransactionList(
    count?: number,
    from?: number,
    account?: string,
  ): Promise<Transaction[]> {
    return new Promise((respond, reject) => {
      return respond(transactions)
    })
  }
  sendToAddress(address: string, amount: number): Promise<Client> {
    return new Promise((respond, reject) => {
      return respond(this)
    })
  }
  walletLock(): Promise<any> {
    return new Promise((respond, reject) => {
      return respond(false)
    })
  }
  getNewAddress(): Promise<string> {
    return new Promise((respond, reject) => {
      return respond(faker.finance.bitcoinAddress())
    })
  }
}

export default MockClient
