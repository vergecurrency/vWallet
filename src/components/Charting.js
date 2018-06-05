import { Area, AreaChart, CartesianGrid, YAxis } from 'recharts'
import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import moment from 'moment'
import tr from 'tor-request'

tr.setTorAddress('localhost', 9089)

class Charting extends Component {
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
              (hist, data) => [...hist, { name: data[0], value: data[4] }],
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
    if (this.state.history == null) {
      return <span />
    }

    return (
      <AreaChart
        width={400}
        height={100}
        style={{
          bottom: '145px',
          left: '755px',
          position: 'absolute',
          borderRadius: '7px',
        }}
        data={this.state.history}
        margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
      >
        <Area type="monotone" dataKey="value" stroke="#1dc9f3" fill="#1dc9f3" />
      </AreaChart>
    )
  }
}

export default inject('CoinStatsStore')(observer(Charting))
