import { inject, observer } from 'mobx-react'

import Modal from '../Modal'
import AmountInput from '../transaction/AmountInput'
import BalanceBar from '../transaction/BalanceBar'
import SendTransactionButton from '../transaction/SendTransactionButton'
import SendIcon from 'react-material-icon-svg/dist/SendIcon'
import ScaleBalanceIcon from 'react-material-icon-svg/dist/ScaleBalanceIcon'
import * as React from 'react'
import { translate, Trans } from 'react-i18next'
import { AccountInformationStore } from '../../stores/AccountInformationStore'
import { CoinStatsStore } from '../../stores/CoinStatsStore'
import { SettingsStore } from '../../stores/SettingsStore'
import { i18n } from '../../../node_modules/@types/i18next'
import SendState from '../../utils/SendState'
import Fee from '../../utils/Fee'

const FEE = Fee

interface SendPanelProps {
  address?: string
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

class SendPanel extends React.Component<SendPanelProps, SendPanelState> {
  state = {
    amount: 0,
    address: this.props.address || '',
    label: '',
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

  sendTransaction() {
    const { address, amount } = this.state
    const { AccountInformationStore } = this.props

    if (!address || !amount || !AccountInformationStore) return

    this.setState({ status: SendState.SENDING, error: null })
    setTimeout(() => {
      AccountInformationStore.sendTransaction(address, amount)
        .then(() => {
          setTimeout(() => {
            this.setState({ status: SendState.DONE })
            setTimeout(() => {
              this.props.toggle()
              this.setState({
                amount: 0,
                address: '',
                label: '',
                status: SendState.OPEN,
              })
            }, 1000)
          }, 500)
        })
        .catch(e => {
          this.setState({
            status: SendState.ERROR,
            error: JSON.parse(e).error.message,
          })
          setTimeout(() => {
            this.setState({
              status: SendState.OPEN,
              error: null,
            })
          }, 2500)
        })
    }, 1000)
  }

  balanceToLow() {
    return (this.getBalance() - FEE) <= 0
  }

  render() {
    const props = this.props

    if (this.balanceToLow()) {
      return (
        <Modal
          {...props}
          title={this.props.i18n!.t('sendPanel.title') as string}
          className="send-modal send-modal-balance-to-low"
        >
          <ScaleBalanceIcon
            width={100}
            height={100}
            fill="#d6dee2"
          />
          <p className="no-balance-title">{this.props.i18n!.t('sendPanel.notEnoughBalance')}</p>
          <p className="no-balance-subtitle">
            {this.props.i18n!.t('sendPanel.notEnoughBalanceDescription')}
          </p>
        </Modal>
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
          onClick={this.sendTransaction.bind(this)}
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
