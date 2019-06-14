import * as React from 'react'
import { Col, Row } from 'reactstrap'
import { translate, Trans, Interpolate } from 'react-i18next'
import { inject, observer } from 'mobx-react'
import { SettingsStore } from '../../stores/SettingsStore'
import { AccountInformationStore } from '../../stores/AccountInformationStore'
import { CoinStatsStore } from '../../stores/CoinStatsStore'
import VergeCacheStore from '../../stores/VergeCacheStore'

interface BalanceBarInterface {
  SettingsStore?: SettingsStore
  AccountInformationStore?: AccountInformationStore
  CoinStatsStore?: CoinStatsStore
}

class BalanceBar extends React.Component<BalanceBarInterface> {
  getLocaleId() {
    return this.props.SettingsStore!.getLocale
  }

  getBalance() {
    return this.props.AccountInformationStore!.getBalance
  }

  getPrice() {
    return this.props.CoinStatsStore!.priceWithCurrency
  }

  render() {
    const formatter = new Intl.NumberFormat(
      VergeCacheStore.get('locale', 'en-US'),
      {
        style: 'currency',
        currency: VergeCacheStore.get('currency', 'USD'),
        minimumFractionDigits: 2,
      },
    )

    return (
      <div style={{ marginBottom: '20px' }}>
        <Row>
          <Col md="5">
            <div className="balance-title">
              <Interpolate
                i18nKey={'sendPanel.xvgUSD'}
                currency={this.props.SettingsStore!.getCurrency}
              />
            </div>
            <div className="balance-value">
              {formatter.format(this.getBalance() * this.getPrice())}
            </div>
          </Col>
          <Col md="7">
            <div className="balance-title">
              <Trans i18nKey={'sendPanel.balanceXVG'} />
            </div>
            <div className="balance-value">
              {this.getBalance().toLocaleString(this.getLocaleId())} XVG
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default translate()(
  inject('SettingsStore', 'CoinStatsStore', 'AccountInformationStore')(
    observer(BalanceBar),
  ),
)
