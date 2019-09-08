import { WalletInfo } from 'verge-node-typescript/dist/WalletInfo'
import Wallet, { VergeLightClient } from '../crypto/Wallet'
import { Peer } from 'verge-node-typescript/dist/Peer'
import { Transaction } from 'verge-node-typescript/dist/Transaction'
import { logger } from '../utils/Logger'

export class VergeBitpayClient {
  async unlock(
    passphrase: any,
    timeout?: number,
  ): Promise<{ unlocked: boolean }> {
    try {
      const unlocked = await Wallet.unlock(passphrase)
      return {
        unlocked,
      }
    } catch (e) {
      return { unlocked: false }
    }
  }

  async getBalance(account?: string): Promise<number> {
    const balance = await Wallet.getBalance()
    return balance.totalAmount
  }

  getWallet(): VergeLightClient {
    return Wallet
  }

  getInfo(): Promise<WalletInfo> {
    return new Promise((respond, reject) => {
      return {}
    })
  }

  getPeerInfo(): Promise<Peer[]> {
    return new Promise((respond, reject) => {
      return respond([])
    })
  }

  async getTransactionList(
    count?: number,
    from?: number,
    account?: string,
  ): Promise<Transaction[]> {
    try {
      const transationHistory = await Wallet.getTransactionHistory(count)
      return transationHistory.reduce((allTransactions, transaction) => {
        return [
          ...allTransactions,
          ...transaction.outputs.map(
            txOutput =>
              ({
                txid: transaction.txid,
                /**
                 * the output number
                 */
                vout: '',
                account: transaction.creatorName,
                address: txOutput.address,
                category: transaction.action,
                amount: txOutput.amount / 100000000,
                confirmations: transaction.confirmations,
                blockhash: '',
                blocktime: 0,
                blockindex: 0,
                time: transaction.time,
                timereceived: transaction.time,
              } as Transaction),
          ),
        ]
      },                              [])
    } catch (e) {
      logger.error(e)
      return []
    }
  }

  async sendToAddress(
    address: string,
    amount: number,
  ): Promise<VergeBitpayClient> {
    await Wallet.sendTransaction(address, amount)
    return this
  }

  async getNewAddress(): Promise<string> {
    try {
      return (await Wallet.getAddress()).address
    } catch (e) {
      logger.error(e)
      return 'Error loading address ...'
    }
  }
}

export default new VergeBitpayClient()
