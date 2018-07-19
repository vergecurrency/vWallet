import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { translate, Trans } from 'react-i18next'
import { SettingsStore } from '../../stores/SettingsStore'
import { AccountInformationStore } from '../../stores/AccountInformationStore'
import { i18n } from '../../../node_modules/@types/i18next/index'
import Fee from '../../utils/Fee'

interface AmountInputInterface {
  amount: number
  amountChanged: (amount: number) => void
  SettingsStore?: SettingsStore
  AccountInformationStore?: AccountInformationStore
  i18n?: i18n
}

interface AmountInputState {
  amount: number
}

class AmountInput extends React.Component<AmountInputInterface, AmountInputState> {
  state: {
    amount: 0,
  }

  getLocaleId() {
    return this.props.SettingsStore!.getLocale
  }

  getBalance() {
    return this.props.AccountInformationStore!.getBalance
  }

  getBalanceAfterTransaction() {
    return Math.abs(this.getBalance() - (this.props.amount || 0) - Fee)
  }

  sendMax() {
    this.props.amountChanged(this.getBalance() - Fee)
  }

  amountChanged(e) {
    const input = parseFloat(e.target.value) || 0
    if (input <= (this.getBalance() - Fee) && input >= 0) {
      this.props.amountChanged(parseFloat(e.target.value))
    }
  }

  render() {
    return (
      <div>
        <label className="form-label">
          <Trans i18nKey={'sendPanel.amount'} />
        </label>
        <div className="form-input-group">
          <div className="form-input-group-prepend">XVG</div>
          <div className="form-input-group-max-section">
            <button
              className="form-input-group-max-button"
              type="button"
              onClick={this.sendMax.bind(this)}
            >
              <Trans i18nKey={'sendPanel.sendMax'} />
            </button>
          </div>
          <input
            className="form-input"
            value={this.props.amount}
            onChange={this.amountChanged.bind(this)}
            placeholder={
              this.props.i18n!.t('sendPanel.amountplaceholder') as string
            }
            type="number"
          />
        </div>
        <div
          className="form-input-helpers"
          style={{
            marginBottom: '1rem',
          }}
        >
          <div>
            <Trans i18nKey={'sendPanel.amountInfo'} />
          </div>
          <div>
            <Trans i18nKey={'sendPanel.walletAfterTransaction'} />{' '}
            <b>
              {this.getBalanceAfterTransaction().toLocaleString(
                this.getLocaleId(),
              )}{' '}
              XVG
            </b>
          </div>
        </div>
      </div>
    )
  }
}

export default translate()(
  inject('SettingsStore', 'CoinStatsStore', 'AccountInformationStore')(
    observer(AmountInput),
  ),
)
