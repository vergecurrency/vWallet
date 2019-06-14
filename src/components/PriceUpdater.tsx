import * as React from 'react'
import * as moment from 'moment'

import { inject, observer } from 'mobx-react'

import { CoinStatsStore } from '../stores/CoinStatsStore'
import { Line as LineChart } from 'react-chartjs-2'
import { logger } from '../utils/Logger'

const tr = require('tor-request')

tr.setTorAddress('localhost', 9090)

interface PriceUpdaterProps {
  CoinStatsStore?: CoinStatsStore
}

const COIN_MULTIPLIER = 100000000000

const createDataset = function(entries) {
  if (!entries) {
    return {}
  }
  return {
    labels: entries.map(entry => entry[0]),
    datasets: [
      {
        fill: false,
        borderWidth: 2,
        borderColor: 'rgba(29,181,219,1)',
        data: entries.map(([_, price]) => Math.trunc(price * COIN_MULTIPLIER)),
      },
    ],
  }
}

class PriceUpdater extends React.Component<PriceUpdaterProps> {
  state = {
    history: null,
  }

  componentDidMount() {
    tr.request(
      `https://api.cryptowat.ch/markets/binance/xvgbtc/ohlc?periods=7200&after=${moment()
        .subtract(7, 'days')
        .unix()}`,
      (err, res, body) => {
        if (!err && res.statusCode === 200) {
          const { result } = JSON.parse(body)

          this.setState({
            history: result['7200'].reduce(
              (hist, data) => [...hist, [data[0], data[4]]],
              [],
            ),
          })
        } else {
          logger.error(err)
        }
      },
    )
  }

  render() {
    const config = {
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            display: false,
          },
        ],
        xAxes: [
          {
            display: false,
          },
        ],
      },
      elements: {
        point: {
          radius: 0,
        },
      },
      tooltips: {
        enabled: false,
      },
      legend: {
        display: false,
      },
    }
    const data = createDataset(this.state.history)
    return (
      <div className="statistics-chart-container chart-container">
        <LineChart data={data} options={config} height={90} />
      </div>
    )
  }
}

export default inject('CoinStatsStore')(observer(PriceUpdater))
