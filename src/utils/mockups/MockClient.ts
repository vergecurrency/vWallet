import { Transaction } from 'verge-node-typescript/dist/Transaction'
import { Client } from 'verge-node-typescript'
import { Peer } from 'verge-node-typescript/dist/Peer'
import { WalletInfo } from 'verge-node-typescript/dist/WalletInfo'

const { mockData: mockData } = require('../../dev-config.json')

interface Info extends WalletInfo {
  unlocked?: boolean
  isunlocked: boolean
}

class MockClient extends Client {
  info: Info
  unlocked: boolean
  isunlocked: boolean

  constructor(credentials) {
    super(credentials)

    if (localStorage && localStorage.info) {
      const info = JSON.parse(localStorage.info)

      this.unlocked = info.unlocked
      this.isunlocked = info.isunlocked
    }
  }

  unlockWallet(passphrase: any, timeout?: number): Promise<boolean> {
    return new Promise((respond, reject) => {
      if (mockData.passphrase === passphrase) {
        this.info.unlocked = this.unlocked = true
        this.info.isunlocked = this.isunlocked = true
        return respond(this.info.unlocked)
      }

      if (this.info.unlocked) {
        return reject(['already unlocked'])
      }

      reject([])
    })
  }

  getBalance(account?: string): Promise<number> {
    return new Promise<number>((respond, reject) => {
      return respond(mockData.balance)
    })
  }

  getInfo(): Promise<WalletInfo> {
    return new Promise((respond, reject) => {
      this.info = mockData.walletInfo
      this.info.unlocked = this.unlocked
      this.info.isunlocked = this.isunlocked
      return respond(this.info)
    })
  }

  getPeerInfo(): Promise<Array<Peer>> {
    return new Promise((respond, reject) => {
      return respond(mockData.peers)
    })
  }

  getTransactionList(
    count?: number,
    from?: number,
    account?: string,
  ): Promise<Transaction[]> {
    return new Promise((respond, reject) => {
      return respond(mockData.transactions)
    })
  }

  sendToAddress(address: string, amount: number): Promise<Client> {
    return new Promise((respond, reject) => {
      return respond(this)
    })
  }

  walletLock(): Promise<any> {
    return new Promise((respond, reject) => {
      this.info.unlocked = this.unlocked = false
      this.info.isunlocked = this.isunlocked = false
      return respond(this.info.unlocked)
    })
  }

  getNewAddress(): Promise<string> {
    return new Promise((respond, reject) => {
      let text = ''
      const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

      for (let i = 0; i < 34; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
      }

      return respond(text)
    })
  }
}

export default MockClient
