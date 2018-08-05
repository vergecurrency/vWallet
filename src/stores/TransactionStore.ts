import * as moment from 'moment'

import { action, computed, decorate, observable } from 'mobx'

import VergeClient from './VergeClient'
import { Transaction } from 'verge-node-typescript/dist/Transaction'
import electronLog from 'electron-log'
import VergeCacheStore from './VergeCacheStore'
import IContact from './addressbook/IContact'

const hash = (transaction: TransactionView) =>
  `${transaction.txid}#${transaction.category}#${transaction.address}#${
    transaction.timereceived
  }`

interface TransactionView extends Transaction {
  hide?: boolean
  fee?: number
}

export class TransactionStore {
  transactions: Map<string, TransactionView> = new Map()
  loadingFinished: boolean = false
  search: string = ''
  receivedTransactions: boolean = VergeCacheStore.get(
    'receivedTransactions',
    false,
  )

  constructor() {
    // Force no transactions shown...
    // VergeCacheStore.set('receivedTransactions', false)
  }

  addTransactions = (transactions: Transaction[] = []) => {
    transactions.forEach((transaction: Transaction) => {
      const oldTransaction = this.transactions.get(hash(transaction))
      this.transactions.set(hash(transaction), {
        hide: true,
        ...oldTransaction,
        ...transaction,
      })
    })
    this.loadingFinished = true
  }

  setReceivedTransactions = (bool: boolean) => {
    VergeCacheStore.set('receivedTransactions', bool)
    this.receivedTransactions = bool
  }

  setVisibility(txid, category, address, timereceived, hide) {
    const searchedTransaction: Transaction = <Transaction>{
      txid,
      category,
      address,
      timereceived,
    }

    const oldTransaction: TransactionView | undefined = this.transactions.get(
      hash(searchedTransaction),
    )

    if (oldTransaction == null) return

    const newTransaction: Transaction = <Transaction>{
      txid,
      category,
      address,
      timereceived,
    }

    const updatedTransaction: TransactionView = {
      ...oldTransaction,
      hide,
    }

    this.transactions.set(hash(newTransaction), updatedTransaction)

    this.loadingFinished = true
  }

  setSearch(e) {
    this.search = e.target.value
  }

  setTransactions(transactionMap: Map<string, TransactionView>) {
    electronLog.log(`Successfully loaded ${transactionMap.size} transactions`)
    this.transactions = transactionMap

    if (this.transactions.size > 0) {
      this.loadingFinished = true
    }
  }

  get getReceivedTransactionsStatus(): boolean {
    return this.receivedTransactions
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
            .includes(this.search.toLocaleLowerCase()),
        )
        .sort((a: Transaction, b: TransactionView) => b.time - a.time)
        .slice(0, 9)
    }

    return transactions.sort((a, b) => b.time - a.time).slice(0, 9)
  }

  get monthlyOutput() {
    return Array.from(this.transactions.values())
      .filter(
        ({ timereceived, category }) =>
          moment.unix(timereceived).isSame(new Date(), 'month') &&
          category.includes('send'),
      )
      .reduce(
        (sum, { amount, fee }) => (fee ? sum + amount + fee : sum + amount),
        0.0,
      )
  }

  get monthlyIncome() {
    return Array.from(this.transactions.values())
      .filter(
        ({ timereceived, category }) =>
          moment.unix(timereceived).isSame(new Date(), 'month') &&
          category.includes('receive'),
      )
      .reduce((sum, { amount }) => sum + amount, 0.0)
  }

  transactionsForContact(contact: IContact) {
    return []
  }
}

decorate(TransactionStore, {
  transactions: observable,
  loadingFinished: observable,
  search: observable,
  addTransactions: action,
  setVisibility: action,
  setSearch: action,
  setTransactions: action,
  getTransactionCount: computed,
  loaded: computed,
  getTransactionList: computed,
  searchValue: computed,
  lastTenTransaction: computed,
  monthlyOutput: computed,
  monthlyIncome: computed,
  receivedTransactions: observable,
  setReceivedTransactions: action,
  getReceivedTransactionsStatus: computed,
  transactionsForContact: action,
})

const store = new TransactionStore()
try {
  store.setTransactions(
    (new Map(JSON.parse(localStorage.myMap)) as Map<string, TransactionView>) ||
      (new Map() as Map<string, TransactionView>),
  )
} catch (e) {}

setInterval(() => {
  VergeClient.getTransactionList(1000)
    .then(transactions => {
      store.addTransactions(transactions)
      electronLog.log('Fetched new transactions')
    })
    .catch(() => {
      electronLog.warn('Failed fetching new transactions')
    })
}, 10000)

setInterval(() => {
  localStorage.transactions = JSON.stringify(
    Array.from(store.getTransactionList),
  )
  electronLog.log('Saved newly transactions into localstorage')
}, 10000)
export default store
