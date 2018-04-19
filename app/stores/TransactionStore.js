import { observable, action, computed } from 'mobx';

class TransactionStore {
  @observable transactions = [];

  @action
  addTransaction = transaction => {
    this.transactions.push(transaction);
  };

  @action
  addTransactions = transactions => {
    this.transactions = [...this.transactions, ...transactions];
  };

  @computed
  get birdCount() {
    return this.transaction.lenght;
  }
}

const store = new TransactionStore();
export default store;
