import { computed, decorate, observable } from 'mobx'

import ElectronStore from 'electron-store'
import tr from 'tor-request'

const electronStore = new ElectronStore({
  encryptionKey: new Buffer('vergecurrency'),
})
tr.setTorAddress('localhost', 9089)

class CoinStatsStore {
  info = {
    price: '',
    price_btc: '',
    rank: '',
    cap: '',
    hourChange: '',
    dayChange: '',
  }

  @observable loadingFinished = false

  constructor() {
    this.getCoinStats()
      .then(info => {
        this.info = { ...this.info, ...info }
        this.loadingFinished = true
      })
      .catch(console.error)

    setInterval(() => {
      this.getCoinStats()
        .then(info => {
          this.info = { ...this.info, ...info }
          this.loadingFinished = true
        })
        .catch(console.error)
    }, 30000)
  }

  getCoinStats() {
    return new Promise((resolve, reject) =>
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
              price: Number(`${resJson[`price_${currency.toLowerCase()}`]}`),
              price_btc: resJson.price_btc,
              rank: resJson.rank,
              cap: Number(resJson[`market_cap_${currency.toLowerCase()}`]),
              hourChange: resJson.percent_change_1h,
              dayChange: resJson.percent_change_24h,
            })
          } else {
            return reject(err)
          }
        }
      )
    )
  }

  get loaded() {
    return this.loadingFinished
  }

  get getUpdatedStats() {
    return this.info
  }

  get priceWithCurrency() {
    return this.info.price || 0
  }
}

decorate(CoinStatsStore, {
  info: observable.struct,
  getUpdatedStats: computed,
  priceWithCurrency: computed,
})

const store = new CoinStatsStore()
export default store
