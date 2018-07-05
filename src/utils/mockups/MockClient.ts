import { Transaction } from 'verge-node-typescript/dist/Transaction'
import { Client } from 'verge-node-typescript'
import { Peer } from 'verge-node-typescript/dist/Peer'
import { WalletInfo } from 'verge-node-typescript/dist/WalletInfo'
import MockWalletInfo from './MockWalletInfo'
const faker = require('faker')

function generateTransaction() {
  const time = Math.trunc(faker.date.recent(12).getTime() / 1000)
  return {
    txid: faker.random.alphaNumeric(64),
    vout: faker.random.alphaNumeric(64),
    account: 'my account',
    address: faker.finance.bitcoinAddress(),
    category: faker.random.boolean() ? 'receive' : 'send',
    amount: 123.456789 * faker.random.number(100, 1),
    confirmations: faker.random.number(),
    blockhash: faker.random.alphaNumeric(64),
    blockindex: faker.random.alphaNumeric(64),
    blocktime: time,
    time: time + 10000,
    timereceived: time + 5000,
  }
}

const { mockClient: mockClient } = require('../../dev-config.json')
const transactions = Array(mockClient.transactions).fill(null).map(() => generateTransaction())

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
      const walletInfo = new MockWalletInfo()
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
