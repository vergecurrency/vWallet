import * as React from 'react'
import * as moment from 'moment'

import { inject, observer } from 'mobx-react'

import { CoinStatsStore } from '../stores/CoinStatsStore'
import * as ReactHighcharts from 'react-highcharts'
const tr = require('tor-request')

tr.setTorAddress('localhost', 9089)

interface PriceUpdaterProps {
  CoinStatsStore?: CoinStatsStore
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
          console.error(err)
        }
      },
    )
  }

  render() {
    const config = {
      rangeSelector: {
        selected: 1,
      },
      xAxis: {
        type: 'datetime',
      },
      chart: {
        zoomType: 'x',
      },
      yAxis: {
        title: {
          text: 'Exchange rate (BTC)',
        },
      },
      series: [
        {
          name: 'XVG',
          // type: 'area',
          data: this.state.history,
          tooltip: {
            valueDecimals: 8,
          },
        },
      ],
    }
    return (
      <div
        style={{
          position: 'absolute',
          left: '767px',
          bottom: '0px',
        }}
      >
        {this.props.CoinStatsStore!.loaded ? (
          <ReactHighcharts config={config} />
        ) : (
          <span />
        )}
      </div>
    )
  }
}

export default inject('CoinStatsStore')(observer(PriceUpdater))
