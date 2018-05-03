import { observable, action, computed } from 'mobx'
import { Client } from 'verge-node-typescript'

class TransactionStore {
	@observable transactions = []

	@action
	addTransaction = transaction => {
		this.transactions.push(transaction)
	}

	@action
	addTransactions = transactions => {
		this.transactions = [...this.transactions, ...transactions]
	}

	@computed
	get getTransactionCount() {
		return this.transaction.lenght
	}
}

const store = new TransactionStore()

const client = new Client({ user: 'kyon', pass: 'lolcat' })
	.getTransactionList()
	.then(transactions => {
		store.addTransactions(transactions)
	})

export default store
