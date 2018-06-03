import { action, computed, decorate, observable } from 'mobx'

import { Client } from 'verge-node-typescript'
import crypto from 'crypto'
import moment from 'moment'

const hash = transaction =>
  `${transaction.txid}#${transaction.category}#${transaction.address}#${
    transaction.timereceived
  }`

const client = new Client({ user: 'kyon', pass: 'lolcat' })

class TransactionStore {
  transactions = new Map()
  loadingFinished = false
  search = ''

  addTransactions = (transactions = []) => {
    transactions.forEach(transaction => {
      const oldTransaction = this.transactions.get(hash(transaction))
      this.transactions.set(hash(transaction), {
        hide: true,
        ...oldTransaction,
        ...transaction,
      })
    })
    this.loadingFinished = true
  }

  setVisibility(txid, category, address, timereceived, hide) {
    const oldTransaction = this.transactions.get(
      hash({ txid, category, address, timereceived })
    )
    this.transactions.set(hash({ txid, category, address, timereceived }), {
      ...oldTransaction,
      hide,
    })
    this.loadingFinished = true
  }

  setSearch(e) {
    this.search = e.target.value
  }

  get getTransactionCount() {
    return this.transactions.size
  }

  get loaded() {
    return this.loadingFinished
  }

  get getTransactionList() {
    return this.transactions
  }

  get searchValue() {
    return this.search
  }

  get lastTenTransaction() {
    const transactions = Array.from(this.transactions.values())

    if (this.search) {
      return transactions
        .filter(transaction =>
          [
            transaction.address,
            transaction.amount,
            transaction.account,
            transaction.category,
          ]
            .join('-')
            .toLocaleLowerCase()
            .includes(this.search.toLocaleLowerCase())
        )
        .sort((a, b) => b.time - a.time)
        .slice(0, 9)
    }

    return transactions.sort((a, b) => b.time - a.time).slice(0, 9)
  }

  get monthlyOutput() {
    return Array.from(this.transactions.values())
      .filter(
        ({ timereceived, category }) =>
          moment.unix(timereceived).isSame(new Date(), 'month') &&
          category.includes('send')
      )
      .reduce((sum, { amount, fee }) => sum + amount + fee, 0.0)
  }

  get monthlyIncome() {
    return Array.from(this.transactions.values())
      .filter(
        ({ timereceived, category }) =>
          moment.unix(timereceived).isSame(new Date(), 'month') &&
          category.includes('receive')
      )
      .reduce((sum, { amount, fee }) => sum + amount, 0.0)
  }
}

decorate(TransactionStore, {
  transactions: observable,
  loadingFinished: observable,
  search: observable,
  addTransactions: action,
  setVisibility: action,
  setSearch: action,
  getTransactionCount: computed,
  loaded: computed,
  getTransactionList: computed,
  searchValue: computed,
  lastTenTransaction: computed,
  monthlyOutput: computed,
  monthlyIncome: computed,
})

const store = new TransactionStore()

client.getTransactionList(100).then(transactions => {
  store.addTransactions(transactions)
})

setInterval(() => {
  client.getTransactionList(100).then(transactions => {
    store.addTransactions(transactions)
  })
}, 5000)

export default store
