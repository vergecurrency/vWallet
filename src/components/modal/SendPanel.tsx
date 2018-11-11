import { inject, observer } from 'mobx-react'

import Modal from '../Modal'
import AmountInput from '../transaction/AmountInput'
import BalanceBar from '../transaction/BalanceBar'
import NoBalancePanel from './NoBalancePanel'
import SendTransactionButton from '../transaction/SendTransactionButton'
import SendIcon from 'react-material-icon-svg/dist/SendIcon'
import * as React from 'react'
import { translate, Trans } from 'react-i18next'
import { AccountInformationStore } from '../../stores/AccountInformationStore'
import { CoinStatsStore } from '../../stores/CoinStatsStore'
import { SettingsStore } from '../../stores/SettingsStore'
import { i18n } from '../../../node_modules/@types/i18next'
import SendState from '../../utils/SendState'
import Fee from '../../utils/Fee'
import ISendPanel from './ISendPanel'

const FEE = Fee

interface SendPanelProps {
  address?: string
  label?: string
  AccountInformationStore?: AccountInformationStore
  CoinStatsStore?: CoinStatsStore
  SettingsStore?: SettingsStore
  open: boolean
  toggle: (() => void) & ((event: Event) => void)
  i18n?: i18n
}

interface SendPanelState {
  amount: number
  address: string
  label: string
  error: string | null
  status: SendState
}

class SendPanel extends ISendPanel<SendPanelProps, SendPanelState> {
  state = {
    amount: 0,
    address: this.props.address || '',
    label: this.props.label || '',
    status: SendState.OPEN,
    error: null,
  }
 
  getLocaleId() {
    return this.props.SettingsStore!.getLocale
  }

  getBalance() {
    return this.props.AccountInformationStore!.getBalance
  }

  getPrice() {
    return this.props.CoinStatsStore!.priceWithCurrency
  }

  amountChanged(amount) {
    this.setState({ amount })
  }

  balanceToLow() {
    return this.getBalance() - FEE <= 0
  }

  render() {
    const props = this.props

    if (this.balanceToLow()) {
      return (
        <NoBalancePanel
          {...props}
          title={this.props.i18n!.t('sendPanel.title') as string}
          className="send-modal"
        />
      )
    }

    return (
      <Modal
        {...props}
        title={this.props.i18n!.t('sendPanel.title') as string}
        className="send-modal"
      >
        <label className="form-label">
          <Trans i18nKey={'sendPanel.recipient'} />
        </label>
        <input
          className="form-input"
          value={this.state.address}
          placeholder={this.props.i18n!.t('sendPanel.xvgAddress') as string}
          onChange={e => this.setState({ address: e.target.value })}
        />
        <p className="form-input-help">
          <Trans i18nKey={'sendPanel.fundwarning'} />
        </p>
        <label className="form-label">
          <Trans i18nKey={'sendPanel.addressLabel'} />
        </label>
        <input
          className="form-input"
          placeholder={
            this.props.i18n!.t('sendPanel.labelPlaceholder') as string
          }
          value={this.state.label}
          onChange={e => this.setState({ label: e.target.value })}
        />
        <p className="form-input-help">
          <Trans i18nKey={'sendPanel.labelInfo'} />
        </p>
        <AmountInput
          amount={this.state.amount}
          amountChanged={this.amountChanged.bind(this)}
        />
        <div className="form-separator" />
        <BalanceBar />
        <SendTransactionButton
          label={this.props.i18n!.t('sendPanel.sendButton')}
          status={this.state.status}
          amount={this.state.amount}
          price={this.getPrice()}
          localeId={this.getLocaleId()}
          error={this.state.error}
          onClick={() => {
            this.sendTransaction(
              this.state.address,
              this.state.amount,
              this.props.AccountInformationStore!,
            )
          }}
        >
          <SendIcon
            width={22}
            height={22}
            style={{ fill: '#fff', marginRight: '5px' }}
          />
        </SendTransactionButton>
        <p className="form-input-help send-disclaimer">
          <Trans i18nKey={'sendPanel.sendWarning'} />
        </p>
      </Modal>
    )
  }
}

export default translate()(
  inject('SettingsStore', 'CoinStatsStore', 'AccountInformationStore')(
    observer(SendPanel),
  ),
)
