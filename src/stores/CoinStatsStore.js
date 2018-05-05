import { observable, computed } from 'mobx'
import tr from 'tor-request'
import ElectronStore from 'electron-store'
const electronStore = new ElectronStore({
	encryptionKey: new Buffer('vergecurrency'),
})
tr.setTorAddress('localhost', 9089)

const getCoinStats = () =>
	new Promise((resolve, reject) =>
		tr.request(
			`https://api.coinmarketcap.com/v1/ticker/verge/?convert=${electronStore.get(
				'currency',
				'USD'
			)}`,
			(err, res, body) => {
				if (!err && res.statusCode === 200) {
					const [resJson] = JSON.parse(body)
					const currency = electronStore.get('currency', 'USD')
					return resolve({
						price: Number(
							`${resJson[`price_${currency.toLowerCase()}`]}`
						),
						price_btc: resJson.price_btc,
						rank: resJson.rank,
						cap: Number(
							resJson[`market_cap_${currency.toLowerCase()}`]
						),
						hourChange: resJson.percent_change_1h,
						dayChange: resJson.percent_change_24h,
					})
				} else {
					return reject(err)
				}
			}
		)
	)

class CoinStatsStore {
	@observable
	info = {
		price: '',
		price_btc: '',
		rank: '',
		cap: '',
		hourChange: '',
		dayChange: '',
	}

	constructor() {
		setInterval(() => {
			getCoinStats()
				.then(info => {
					console.log(info)
					this.info = { ...this.info, ...info }
				})
				.catch(console.error)
		}, 5000)
	}

	@computed
	get getUpdatedStats() {
		return this.info
	}
}

const store = new CoinStatsStore()
export default store
