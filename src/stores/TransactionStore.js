import { action, computed, observable } from 'mobx'

import { Client } from 'verge-node-typescript'
import crypto from 'crypto'
import moment from 'moment'

const hash = transaction =>
  `${transaction.txid}#${transaction.category}#${transaction.address}`

class TransactionStore {
  @observable transactions = new Map()
  @observable loadingFinished = false
  @observable search = ''

  @action
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

  @action
  setVisibility(txid, category, address, hide) {
    const oldTransaction = this.transactions.get(
      hash({ txid, category, address })
    )
    this.transactions.set(hash({ txid, category, address }), {
      ...oldTransaction,
      hide,
    })
    this.loadingFinished = true
  }

  @action
  setSearch(e) {
    this.search = e.target.value
  }

  @computed
  get getTransactionCount() {
    return this.transactions.size
  }

  @computed
  get loaded() {
    return this.loadingFinished
  }

  @computed
  get getTransactionList() {
    return this.transactions
  }

  @computed
  get searchValue() {
    return this.search
  }

  @computed
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

  @computed
  get monthlyOutput() {
    return Array.from(this.transactions.values())
      .filter(
        ({ time, category }) =>
          moment.unix(time).isSame(new Date(), 'month') &&
          category.includes('send')
      )
      .reduce((sum, { amount, fee }) => sum + amount + fee, 0.0)
  }

  @computed
  get monthlyIncome() {
    return Array.from(this.transactions.values())
      .filter(
        ({ time, category }) =>
          moment.unix(time).isSame(new Date(), 'month') &&
          category.includes('receive')
      )
      .reduce((sum, { amount, fee }) => sum + amount, 0.0)
  }
}

const store = new TransactionStore()
const client = new Client({ user: 'kyon', pass: 'lolcat' })

client.getTransactionList(100).then(transactions => {
  store.addTransactions(transactions)
})

setInterval(() => {
  client.getTransactionList(100).then(transactions => {
    store.addTransactions(transactions)
  })
}, 5000)

export default store
