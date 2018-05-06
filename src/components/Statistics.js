import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import tr from 'tor-request'
import PriceUpdater from './PriceUpdater'
tr.setTorAddress('localhost', 9089)

@inject('SettingsStore', 'CoinStatsStore')
@observer
export default class Statistics extends Component {
  render() {
    const formatter = new Intl.NumberFormat(
      this.props.SettingsStore.getLocale,
      {
        style: 'currency',
        currency: this.props.SettingsStore.getCurrency,
        minimumFractionDigits: 6,
        // the default value for minimumFractionDigits depends on the currency
        // and is usually already 2
      }
    )

    const bigNumber = new Intl.NumberFormat(
      this.props.SettingsStore.getLocale,
      {
        style: 'currency',
        currency: this.props.SettingsStore.getCurrency,
        minimumFractionDigits: 2,
        // the default value for minimumFractionDigits depends on the currency
        // and is usually already 2
      }
    )
    return (
      <div className="container statistic">
        <div className="row" style={{ borderBottom: '#f2f2f2 solid 1px' }}>
          <div
            className="col-md-12"
            style={{ marginTop: '25px', marginLeft: '15px' }}
          >
            <div className="trans-title" style={{ color: '#003b54' }}>
              Price Statistics
            </div>
          </div>
        </div>
        <div className="row stats-item">
          <div className="col-md-5">
            XVG/{this.props.SettingsStore.getCurrency} Price
          </div>
          <div className="col-md-7 info">
            {formatter.format(this.props.CoinStatsStore.getUpdatedStats.price)}
          </div>
        </div>
        <div className="row stats-item">
          <div className="col-md-5">Market Cap</div>
          <div className="col-md-7 info">
            {bigNumber.format(this.props.CoinStatsStore.getUpdatedStats.cap)}
          </div>
        </div>
        <div className="row stats-item">
          <div className="col-md-5">1 hour change</div>
          <div className="col-md-7 info">
            {this.props.CoinStatsStore.getUpdatedStats.hourChange} %
          </div>
        </div>
        <div className="row stats-item">
          <div className="col-md-5">24 hour change</div>
          <div className="col-md-7 info">
            {this.props.CoinStatsStore.getUpdatedStats.dayChange} %
          </div>
        </div>
        <div className="row stats-item">
          <div className="col-md-5">CMC Postion</div>
          <div className="col-md-7 info">
            {this.props.CoinStatsStore.getUpdatedStats.rank}.
          </div>
        </div>
        <div className="row stats-item chart">
          <div className="col-md-5">7-days Chart</div>
        </div>
      </div>
    )
  }
}
