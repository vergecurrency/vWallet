import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import ReactDOM from 'react-dom'
// import ReactHighstock from 'react-highcharts/ReactHighstock.src'
import ReactHighcharts from 'react-highcharts'
import moment from 'moment'
import { observe } from 'mobx'
import tr from 'tor-request'

tr.setTorAddress('localhost', 9089)

class PriceUpdater extends Component {
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
          const startObject = {
            datasets: [
              {
                data: [],
                fillColor: 'rgba(220,220,220,0.2)',
                label: 'My First dataset',
                pointColor: 'rgba(220,220,220,1)',
                pointHighlightFill: '#fff',
                pointHighlightStroke: 'rgba(220,220,220,1)',
                pointStrokeColor: '#fff',
                strokeColor: 'rgba(220,220,220,1)',
              },
            ],
            labels: [],
          }
          const mappedHist = result['7200'].reduce((hist, data, index) => {
            if (index % 10 == 0) {
              return {
                ...hist,
                labels: [...hist.labels, data[0]],
                datasets: [
                  {
                    data: [...hist.datasets[0].data, data[4]],
                    fillColor: 'rgba(220,220,220,0.0)',
                    label: 'My First dataset',
                    pointColor: 'rgba(220,220,220,0)',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(220,220,220,0)',
                    pointStrokeColor: '#fff',
                    strokeColor: 'rgba(220,220,220,1)',
                  },
                ],
              }
            } else {
              return hist
            }
          }, startObject)

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
    if (this.state.history == null) {
      return <span />
    }
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
        {this.props.CoinStatsStore.loaded ? (
          <ReactHighcharts config={config} />
        ) : null}
      </div>
    )
  }
}

export default inject('CoinStatsStore')(observer(PriceUpdater))
