import { Col, Row } from 'reactstrap'
import { inject, observer } from 'mobx-react'

import Modal from '../Modal'
import Send from 'react-material-icon-svg/dist/SendIcon'
import ScaleBalance from 'react-material-icon-svg/dist/ScaleBalanceIcon'
import * as React from 'react'
import { translate, Trans } from 'react-i18next'
import { AccountInformationStore } from '../../stores/AccountInformationStore'
import { CoinStatsStore } from '../../stores/CoinStatsStore'
import { SettingsStore } from '../../stores/SettingsStore'
import { i18n } from '../../../node_modules/@types/i18next'

const FEE = 0.1

interface SendPanelProps {
  address?: string
  AccountInformationStore?: AccountInformationStore
  CoinStatsStore?: CoinStatsStore
  SettingsStore?: SettingsStore
  open: boolean
  toggle: (() => void) & ((event: Event) => void)
  i18n?: i18n
}

enum SendState {
  OPEN,
  SENDING,
  DONE,
  ERROR,
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

  amountChanged(e) {
    const input = parseFloat(e.target.value) || 0
    input <= this.getBalance() && input >= 0
      ? this.setState({ amount: parseFloat(e.target.value) })
      : null
  }

  sendMax() {
    this.setState({
      amount: this.props.AccountInformationStore!.getBalance - FEE,
    })
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
          <ScaleBalance
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
            value={this.state.amount}
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
              {(this.getBalance() - this.state.amount - FEE).toLocaleString(
                this.getLocaleId(),
              )}{' '}
              XVG
            </b>
          </div>
        </div>
        <div className="form-separator" />
        <div style={{ marginBottom: '20px' }}>
          <Row>
            <Col md="5">
              <div className="balance-title">
                {this.props.i18n!.t('sendPanel.xvgUSD', {
                  currency: this.props.SettingsStore!.getCurrency,
                })}
              </div>
              <div className="balance-value">
                ${(this.getBalance() * this.getPrice()).toLocaleString(
                  this.getLocaleId(),
                )}
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
        <button className="btn btn-lg" onClick={() => this.sendTransaction()}>
          <Send
            width={22}
            height={22}
            style={{ fill: '#fff', marginRight: '5px' }}
          />
          {this.state.status === SendState.OPEN &&
            `${this.props.i18n!.t('sendPanel.sendButton')}${' '}
          ${
            this.state.amount
              ? `${this.state.amount.toLocaleString(
                  this.getLocaleId(),
                )} XVG ($${(this.state.amount * this.getPrice()).toLocaleString(
                  this.getLocaleId(),
                )}) + ${FEE.toLocaleString(this.getLocaleId())} XVG Fee`
              : ''
          }`}
          {this.state.status === SendState.SENDING &&
            this.props.i18n!.t('sendPanel.sending')}
          {this.state.status === SendState.ERROR && this.state.error}
          {this.state.status === SendState.DONE &&
            this.props.i18n!.t('sendPanel.sent')}
        </button>
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
