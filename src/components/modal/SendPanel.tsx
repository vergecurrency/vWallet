import { Col, Row } from 'reactstrap'
import { inject, observer } from 'mobx-react'

import Modal from '../Modal'
import Send from 'react-material-icon-svg/dist/SendIcon'
import * as React from 'react'
import i18nReact from 'i18n-react'
import { AccountInformationStore } from '../../stores/AccountInformationStore'
import { CoinStatsStore } from '../../stores/CoinStatsStore'
import { SettingsStore } from '../../stores/SettingsStore'

const FEE = 0.1

interface SendPanelProps {
  address?: string
  AccountInformationStore?: AccountInformationStore
  CoinStatsStore?: CoinStatsStore
  SettingsStore?: SettingsStore
  open: boolean
  toggle: (() => void) & ((event: Event) => void)
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

  render() {
    const props = this.props
    return (
      <Modal
        {...props}
        title={i18nReact.translate('sendPanel.title') as string}
      >
        <label className="form-label">{i18nReact.translate('sendPanel.recipient')}</label>
        <input
          className="form-input"
          value={this.state.address}
          placeholder={
            i18nReact.translate('sendPanel.xvgAddress') as string
          }
          onChange={e => this.setState({ address: e.target.value })}
          style={{ width: '100%' }}
        />
        <p className="form-input-help">{i18nReact.translate('sendPanel.fundwarning')}</p>
        <label className="form-label">{i18nReact.translate('sendPanel.addressLabel')}</label>
        <input
          className="form-input"
          placeholder={
            i18nReact.translate('sendPanel.labelPlaceholder') as string
          }
          value={this.state.label}
          onChange={e => this.setState({ label: e.target.value })}
          style={{ width: '100%' }}
        />
        <p className="form-input-help">{i18nReact.translate('sendPanel.labelInfo')}</p>
        <label className="form-label">{i18nReact.translate('sendPanel.amount')}</label>
        <div className="form-input-group">
          <input
            className="form-input"
            value={this.state.amount}
            onChange={e => {
              const input = parseFloat(e.target.value) || 0
              input <= this.getBalance() && input >= 0
                ? this.setState({ amount: parseFloat(e.target.value) })
                : null
            }}
            placeholder={
              i18nReact.translate('sendPanel.amountplaceholder') as string
            }
            type="number"
            style={{ width: '100%' }}
          />
          <div className="form-input-group-append">XVG</div>
        </div>
        <p className="form-input-helpers">
          <div>
            {i18nReact.translate('sendPanel.amountInfo')}
          </div>
          <div>
            {i18nReact.translate('sendPanel.walletAfterTransaction')}
            {' '}
            <b>
              {(this.getBalance() - this.state.amount - FEE).toLocaleString(
                this.getLocaleId(),
              )}{' '}
              XVG
            </b>
          </div>
        </p>
        <div className="form-separator" />
        <div style={{ marginBottom: '20px' }}>
          <Row>
            <Col md="5">
              <div className="balance-title">
                {i18nReact.translate('sendPanel.xvgUSD')}
              </div>
              <div className="balance-value">
                ${(this.getBalance() * this.getPrice()).toLocaleString(
                this.getLocaleId(),
              )}
              </div>
            </Col>
            <Col md="7">
              <div className="balance-title">
                {i18nReact.translate('sendPanel.balanceXVG')}
              </div>
              <div className="balance-value">
                {this.getBalance().toLocaleString(this.getLocaleId())} XVG
              </div>
            </Col>
          </Row>
        </div>
        <button className="send-button" onClick={() => this.sendTransaction()}>
          <Send
            width={22}
            height={22}
            style={{ fill: '#fff', marginRight: '5px' }}
          />
          {this.state.status === SendState.OPEN &&
          `${i18nReact.translate('sendPanel.sendButton')}${' '}
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
          i18nReact.translate('sendPanel.sending')}
          {this.state.status === SendState.ERROR && this.state.error}
          {this.state.status === SendState.DONE &&
          i18nReact.translate('sendPanel.sent')}
        </button>
        <p className="form-input-help send-disclaimer">
          {i18nReact.translate('sendPanel.sendWarning')}
        </p>
      </Modal>
    )
  }
}

export default inject(
  'SettingsStore',
  'CoinStatsStore',
  'AccountInformationStore',
)(observer(SendPanel))
