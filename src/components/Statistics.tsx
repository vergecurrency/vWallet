import * as React from 'react'

import { inject, observer } from 'mobx-react'
import styledComponents, { keyframes } from 'styled-components'

import { CoinStatsStore } from '../stores/CoinStatsStore'
import Loading from '../icons/Loading'
import { SettingsStore } from '../stores/SettingsStore'
import { translate, Trans } from 'react-i18next'
import { fadeIn } from 'react-animations'
import PriceUpdater from '../components/PriceUpdater'
import ChartLineIcon from 'react-material-icon-svg/dist/ChartLine'
const tr = require('tor-request')

tr.setTorAddress('localhost', 9090)

const StatisticContainer = styledComponents.div`
  ${props =>
    props.theme.light
      ? 'background-color: #fff;'
      : 'background-color: #152b3d;'} ${props =>
  props.theme.light ? '' : 'color: #fff!important;'};
`
const fadeInAnimation = keyframes`${fadeIn}`
const StatItem = styledComponents.div`
  display: flex;
  font-weight: normal;
  line-height: 3em;
  padding-left: 12px;
  animation: 1s ${fadeInAnimation};
  border-bottom: ${props =>
    props.theme.light ? '#f2f2f2' : 'rgba(242,242,242, 0.05)'}
    solid 1px;
  ${props =>
    props.theme.light ? 'color: #476b84;' : 'color: #7193ae;'} .info {
    font-weight: 500;
  }
`

const StatChartItem = styledComponents.div`
  display: flex;
  font-weight: normal;
  line-height: 3em;
  padding-left: 12px;
  animation: 1s ${fadeInAnimation};
  border-bottom: ${props =>
    props.theme.light ? '#f2f2f2' : 'rgba(242,242,242, 0.05)'}
    solid 1px;
  ${props =>
    props.theme.light ? 'color: #476b84;' : 'color: #7193ae;'} .info {
    font-weight: 500;
  }
  border-bottom: none;
`

const TopContainer = styledComponents.div``

const TransactionTitle = styledComponents.div`
  display: flex;
  align-content: center;
  align-items: center;
  justify-items: center;
  font-size: 21px;
  padding-left: 30px !important;
`

const LoadingContainer = styledComponents.div`
  text-align: center;
  padding-top: 35%;
`

const Seperator = styledComponents.hr`
  margin: 0px 0px;
  height: 1px;
`

interface StatisticsProps {
  SettingsStore?: SettingsStore
  CoinStatsStore?: CoinStatsStore
}

class Statistics extends React.Component<StatisticsProps> {
  render() {
    const formatter = new Intl.NumberFormat(
      this.props.SettingsStore!.getLocale,
      {
        style: 'currency',
        currency: this.props.SettingsStore!.getCurrency,
        minimumFractionDigits: 6,
        // the default value for minimumFractionDigits depends on the currency
        // and is usually already 2
      },
    )

    const bigNumber = new Intl.NumberFormat(
      this.props.SettingsStore!.getLocale,
      {
        style: 'currency',
        currency: this.props.SettingsStore!.getCurrency,
        minimumFractionDigits: 2,
        // the default value for minimumFractionDigits depends on the currency
        // and is usually already 2
      },
    )
    return (
      <StatisticContainer className="statistic-container">
        <div className="statistic-title-container">
          <TopContainer className="row">
            <TransactionTitle>
              <ChartLineIcon
                width={30}
                height={30}
                style={{ fill: '#003b54', marginRight: '10px' }}
              />{' '}
              <Trans i18nKey={'statistics.title'} />
            </TransactionTitle>
          </TopContainer>
        </div>
        <Seperator />
        {this.props.CoinStatsStore!.loaded ? (
          <div>
            {' '}
            <StatItem>
              <div className="col-md-5">
                XVG/
                {this.props.SettingsStore!.getCurrency}{' '}
                <Trans i18nKey={'statistics.price'} />
              </div>
              <div className="col-md-7 info">
                {formatter.format(
                  this.props.CoinStatsStore!.getUpdatedStats.price,
                )}
              </div>
            </StatItem>
            <StatItem>
              <div className="col-md-5">
                <Trans i18nKey={'statistics.cap'} />
              </div>
              <div className="col-md-7 info">
                {bigNumber.format(
                  this.props.CoinStatsStore!.getUpdatedStats.cap,
                )}
              </div>
            </StatItem>
            <StatItem>
              <div className="col-md-5">
                <Trans i18nKey={'statistics.hourchange'} />
              </div>
              <div className="col-md-7 info">
                {this.props.CoinStatsStore!.getUpdatedStats.hourChange} %
              </div>
            </StatItem>
            <StatItem>
              <div className="col-md-5">
                <Trans i18nKey={'statistics.daychange'} />
              </div>
              <div className="col-md-7 info">
                {this.props.CoinStatsStore!.getUpdatedStats.dayChange} %
              </div>
            </StatItem>
            <StatItem>
              <div className="col-md-5">
                <Trans i18nKey={'statistics.cmc'} />
              </div>
              <div className="col-md-7 info">
                {this.props.CoinStatsStore!.getUpdatedStats.rank}.
              </div>
            </StatItem>
            <StatChartItem>
              <div className="col-md-5">
                <Trans i18nKey={'statistics.chart'} />
              </div>
              <div className="col-md-7">
                <PriceUpdater />
              </div>
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

export default translate()(
  inject('SettingsStore', 'CoinStatsStore')(observer(Statistics)),
)
