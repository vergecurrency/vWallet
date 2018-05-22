import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import styled, { keyframes } from 'styled-components'

import Loading from '../icons/Loading'
import T from 'i18n-react'
import { fadeIn } from 'react-animations'
import price from '../assets/images/price.png'
import priceLight from '../assets/images/price-light.png'
import tr from 'tor-request'

tr.setTorAddress('localhost', 9089)

const StatisticContainer = styled.div`
  position: absolute;
  top: 243px;
  left: 755px;
  height: 450px;
  width: 400px !important;
  ${props =>
    props.theme.light
      ? 'background-color: #fff;'
      : 'background-color: #152b3d;'} ${props =>
    props.theme.light ? '' : 'color: #fff!important;'}
  border-radius: 7px;
`
const fadeInAnimation = keyframes`${fadeIn}`
const StatItem = styled.div`
  line-height: 3em;
  padding-left: 12px;
  animation: 1s ${fadeInAnimation};
  border-bottom: ${props =>
      props.theme.light ? '#f2f2f2' : 'rgba(242,242,242, 0.05)'}
    solid 1px;
  ${props =>
    props.theme.light ? 'color: #476b84;' : 'color: #7193ae;'} .info {
    font-weight: 700;
  }
`

const StatChartItem = styled.div`
  line-height: 3em;
  padding-left: 12px;
  animation: 1s ${fadeInAnimation};
  border-bottom: ${props =>
      props.theme.light ? '#f2f2f2' : 'rgba(242,242,242, 0.05)'}
    solid 1px;
  ${props =>
    props.theme.light ? 'color: #476b84;' : 'color: #7193ae;'} .info {
    font-weight: 700;
  }
  border-bottom: none;
`

const TopContainer = styled.div`
  border-bottom: ${props =>
      props.theme.light ? '#f2f2f2' : 'rgba(238,238,238, 0.05)'}
    solid 1px;
`

const TransactionTitle = styled.div`
  display: flex;
  align-content: center;
  font-size: 26px;
  height: 45px;
  padding-bottom: 59px;
  ${props => (props.theme.light ? '' : 'color: #fff;')};
  :before {
    content: url(${props => (props.theme.light ? price : priceLight)});
    padding-right: 15px;
  }
`

const LoadingContainer = styled.div`
  text-align: center;
  padding-top: 35%;
`

class Statistics extends Component {
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
      <StatisticContainer className="container">
        <TopContainer className="row">
          <div
            className="col-md-12"
            style={{ marginTop: '25px', marginLeft: '15px' }}
          >
            <TransactionTitle>
              {T.translate('statistics.title')}
            </TransactionTitle>
          </div>
        </TopContainer>
        {this.props.CoinStatsStore.loaded ? (
          <div>
            {' '}
            <StatItem className="row">
              <div className="col-md-5">
                XVG/{this.props.SettingsStore.getCurrency}{' '}
                {T.translate('statistics.price')}
              </div>
              <div className="col-md-7 info">
                {formatter.format(
                  this.props.CoinStatsStore.getUpdatedStats.price
                )}
              </div>
            </StatItem>
            <StatItem className="row">
              <div className="col-md-5">{T.translate('statistics.cap')}</div>
              <div className="col-md-7 info">
                {bigNumber.format(
                  this.props.CoinStatsStore.getUpdatedStats.cap
                )}
              </div>
            </StatItem>
            <StatItem className="row">
              <div className="col-md-5">
                {T.translate('statistics.hourchange')}
              </div>
              <div className="col-md-7 info">
                {this.props.CoinStatsStore.getUpdatedStats.hourChange} %
              </div>
            </StatItem>
            <StatItem className="row">
              <div className="col-md-5">
                {T.translate('statistics.daychange')}
              </div>
              <div className="col-md-7 info">
                {this.props.CoinStatsStore.getUpdatedStats.dayChange} %
              </div>
            </StatItem>
            <StatItem className="row">
              <div className="col-md-5">{T.translate('statistics.cmc')}</div>
              <div className="col-md-7 info">
                {this.props.CoinStatsStore.getUpdatedStats.rank}.
              </div>
            </StatItem>
            <StatChartItem className="row">
              <div className="col-md-5">{T.translate('statistics.chart')}</div>
            </StatChartItem>
          </div>
        ) : (
          <LoadingContainer>
            <Loading text="loading statistics..." />
          </LoadingContainer>
        )}
      </StatisticContainer>
    )
  }
}

export default inject('SettingsStore', 'CoinStatsStore')(observer(Statistics))
