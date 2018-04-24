import { observable, computed } from 'mobx'
import { Client } from 'verge-node-typescript'

const vergeConnection = () => new Client({ user: 'kyon', pass: 'lolcat' })

const getAccountInfo = () =>
	vergeConnection()
		.getInfo()
		.then(info =>
			vergeConnection()
				.getPeerInfo()
				.then(peers => {
					const highestBlock = Math.max(
						...peers.map(peer => peer.startingheight)
					)
					return { ...info, highestBlock }
				})
		)
		.catch(console.error)

class AccountInformationStore {
	@observable info = {}

	constructor() {
		setInterval(() => {
			getAccountInfo()
				.then(info => {
					this.info = { ...this.info, info }
				})
				.catch(console.error)
		}, 1000)
	}

	@computed
	get getUpdatedInfo() {
		return this.info
	}
}

const store = new AccountInformationStore()
export default store
