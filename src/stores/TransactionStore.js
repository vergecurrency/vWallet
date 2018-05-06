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
			this.transactions.set(transaction.txid, transaction)
		})
	}

	@computed
	get getTransactionCount() {
		return this.transactions.size
	}

	@computed
	get getTransactionList() {
		return Array.from(this.transactions.values())
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
}, 5000)

export default store
