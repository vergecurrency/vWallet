import { computed, decorate, observable } from 'mobx'

import VergeCacheStore from '../stores/VergeCacheStore'
import { logger } from '../utils/Logger'

const torRequest = require('tor-request')

torRequest.setTorAddress('localhost', 9090)

interface CoinStats {
  price: number
  price_btc: number
  rank: number
  cap: number
  hourChange: number
  dayChange: number
}

export class CoinStatsStore {
  loadingFinished: boolean = false

  info: CoinStats = {
    price: 0,
    price_btc: 0,
    rank: 1,
    cap: 0,
    hourChange: 0,
    dayChange: 0,
  }

  constructor() {
    this.getCoinStats()
      .then(info => {
        this.info = { ...this.info, ...info }
        this.loadingFinished = true
      })
      .catch(logger.error)

    setInterval(() => {
      this.getCoinStats()
        .then(info => {
          this.info = { ...this.info, ...info }
          this.loadingFinished = true
        })
        .catch(logger.error)
    },          30000)
  }

  getCoinStats(): Promise<CoinStats | null> {
    return new Promise((resolve, reject) =>
      torRequest.request(
        `https://api.coinmarketcap.com/v1/ticker/verge/?convert=${VergeCacheStore.get(
          'currency',
          'USD',
        )}`,
        (err, res, body) => {
          if (!err && res.statusCode === 200) {
            const [resJson] = JSON.parse(body)
            const currency = VergeCacheStore.get('currency', 'USD')
            return resolve(<CoinStats>{
              price: Number(`${resJson[`price_${currency.toLowerCase()}`]}`),
              price_btc: Number(resJson.price_btc),
              rank: Number(resJson.rank),
              cap: Number(resJson[`market_cap_${currency.toLowerCase()}`]),
              hourChange: Number(resJson.percent_change_1h),
              dayChange: Number(resJson.percent_change_24h),
            })
          }

          return reject(err)
        },
      ),
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
  loadingFinished: observable,
})

const coinStore = new CoinStatsStore()
export default coinStore
