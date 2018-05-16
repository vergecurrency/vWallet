import { observable, action, computed } from 'mobx'
import { Client } from 'verge-node-typescript'

class TransactionStore {
  @observable transactions = new Map()

  @action
  addTransaction = transaction => {
    this.transactions.set(transaction.txid, transaction)
  }

  @action
  addTransactions = transactions => {
    transactions.forEach(transaction => {
      const oldTransaction = this.transactions.get(transaction.txid)
      this.transactions.set(transaction.txid, {
        hide: true,
        ...oldTransaction,
        ...transaction,
      })
    })
  }

  @action
  setVisibility(txid, hide) {
    const oldTransaction = this.transactions.get(txid)
    this.transactions.set(txid, {
      ...oldTransaction,
      hide,
    })
  }

  @computed
  get getTransactionCount() {
    return this.transactions.size
  }

  @computed
  get getTransactionList() {
    return this.transactions
  }
}

const store = new TransactionStore()
const client = new Client({ user: 'kyon', pass: 'lolcat' })

client.getTransactionList().then(transactions => {
  store.addTransactions(transactions)
})

setInterval(() => {
  client.getTransactionList().then(transactions => {
    store.addTransactions(transactions)
  })
}, 1000)

export default store
