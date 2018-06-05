import * as moment from 'moment';

import { action, computed, decorate, observable } from 'mobx';

import { Client } from 'verge-node-typescript';
import { Transaction } from 'verge-node-typescript/dist/Transaction';

const hash = (transaction: TransactionView) =>
  `${transaction.txid}#${transaction.category}#${transaction.address}#${
    transaction.timereceived
  }`;

const client = new Client({ user: 'kyon', pass: 'lolcat' });

interface TransactionView extends Transaction {
  hide?: boolean;
  fee?: number;
}

export class TransactionStore {
  transactions: Map<string, TransactionView> = new Map();
  loadingFinished: boolean = false;
  search: string = '';

  addTransactions = (transactions: Transaction[] = []) => {
    transactions.forEach((transaction: Transaction) => {
      const oldTransaction = this.transactions.get(hash(transaction));
      this.transactions.set(hash(transaction), {
        hide: true,
        ...oldTransaction,
        ...transaction,
      });
    });
    this.loadingFinished = true;
  };

  setVisibility(txid, category, address, timereceived, hide) {
    const searchedTransaction: Transaction = <Transaction>{
      txid,
      category,
      address,
      timereceived,
    };

    const oldTransaction: TransactionView | undefined = this.transactions.get(
      hash(searchedTransaction),
    );

    if (oldTransaction == null) return;

    const newTransaction: Transaction = <Transaction>{
      txid,
      category,
      address,
      timereceived,
    };

    const updatedTransaction: TransactionView = {
      ...oldTransaction,
      hide,
    };

    this.transactions.set(hash(newTransaction), updatedTransaction);

    this.loadingFinished = true;
  }

  setSearch(e) {
    this.search = e.target.value;
  }

  get getTransactionCount() {
    return this.transactions.size;
  }

  get loaded() {
    return this.loadingFinished;
  }

  get getTransactionList() {
    return this.transactions;
  }

  get searchValue() {
    return this.search;
  }

  get lastTenTransaction() {
    const transactions = Array.from(this.transactions.values());

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
        .slice(0, 9);
    }

    return transactions.sort((a, b) => b.time - a.time).slice(0, 9);
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
      );
  }

  get monthlyIncome() {
    return Array.from(this.transactions.values())
      .filter(
        ({ timereceived, category }) =>
          moment.unix(timereceived).isSame(new Date(), 'month') &&
          category.includes('receive'),
      )
      .reduce((sum, { amount }) => sum + amount, 0.0);
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
});

const store = new TransactionStore();

client.getTransactionList(100).then(transactions => {
  store.addTransactions(transactions);
});

setInterval(() => {
  client.getTransactionList(100).then(transactions => {
    store.addTransactions(transactions);
  });
}, 10000);

export default store;
