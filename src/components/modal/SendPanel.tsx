import { Col, Container, Row } from 'reactstrap'
import { inject, observer } from 'mobx-react'

import Modal from '../Modal'
import * as React from 'react'
import i18nReact from 'i18n-react'
import styledComponents from 'styled-components'
import { AccountInformationStore } from '../../stores/AccountInformationStore'
import { CoinStatsStore } from '../../stores/CoinStatsStore'
import { SettingsStore } from '../../stores/SettingsStore'

const Title = styledComponents.p`
  color: #476b84;
  font-size: 18px;
  font-weight: 400;
  line-height: 20px;
`

const SubTitle = styledComponents.p`
  color: #909090;
  font-family: 'Avenir Next';
  font-size: 12px;
  font-weight: 400;
  line-height: 30px;
`

const InputHandler = styledComponents.input`
  box-shadow: inset 0 1px 4px rgba(0, 0, 0, 0.09);
  border-radius: 3px;
  border: 1px solid #dcdcdc;
  color: #9e9e9e;
  font-size: 14px;
  font-style: italic;
  height: 45px;
  padding: 15px;
`

const InputContainer = styledComponents.div`
  display: inline-flex;
`

const Marker = styledComponents.span`
  color: #000;
  position: absolute;
  left: 423px;
  height: 43px;
  padding-top: 11px;
  bottom: 313px;
  padding-left: 10px;
  border-left: 1px solid #dcdcdc;
  font-weight: 400;
  color: #5e5e5e;
`

const BalanceTitle = styledComponents.div`
  text-shadow: 0 0 73px rgba(255, 255, 255, 0.1);
  color: #476b84;
  font-size: 8px;
  font-weight: 400;
  line-height: 10.53px;
  text-transform: uppercase;
  letter-spacing: 2.12px;
`

const Balance = styledComponents.div`
  text-shadow: 0 0 73px rgba(255, 255, 255, 0.1);
  color: #476b84;
  font-size: 20px;
  font-weight: 400;
  line-height: 20.54px;
`

const SendButton = styledComponents.button`
  width: 460px;
  height: 62px;
  border-radius: 4px;
  background-color: #00b8dc;
  border: 0;
  box-shadow: none;
  color: #ffffff;
  font-size: 18px;
  font-weight: 400;
  line-height: 29.02px;
`

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
        <Title>{i18nReact.translate('sendPanel.recipient')}</Title>
        <InputContainer>
          <InputHandler
            value={this.state.address}
            name="address"
            id="passpharse"
            placeholder="Verge Address"
            onChange={e => this.setState({ address: e.target.value })}
            style={{ width: '460px' }}
          />
        </InputContainer>
        <SubTitle>{i18nReact.translate('sendPanel.fundwarning')}</SubTitle>
        <Title>{i18nReact.translate('sendPanel.addressLabel')}</Title>
        <InputHandler
          placeholder={
            i18nReact.translate('sendPanel.labelPlaceholder') as string
          }
          value={this.state.label}
          onChange={e => this.setState({ label: e.target.value })}
          style={{ width: '460px' }}
        />
        <SubTitle>{i18nReact.translate('sendPanel.labelInfo')}</SubTitle>
        <Title>{i18nReact.translate('sendPanel.amount')}</Title>
        <InputHandler
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
          style={{ width: '460px' }}
        />
        <Marker>XVG</Marker>
        <SubTitle>{i18nReact.translate('sendPanel.amountInfo')}</SubTitle>
        <hr />
        <Container style={{ marginBottom: '20px' }}>
          <Row>
            <Col md="5">
              <BalanceTitle>
                {i18nReact.translate('sendPanel.xvgUSD')}
              </BalanceTitle>
              <Balance>
                ${(this.getBalance() * this.getPrice()).toLocaleString(
                  this.getLocaleId(),
                )}
              </Balance>
            </Col>
            <Col md="7">
              <BalanceTitle>
                {i18nReact.translate('sendPanel.balanceXVG')}
              </BalanceTitle>
              <Balance>
                {this.getBalance().toLocaleString(this.getLocaleId())} XVG
              </Balance>
            </Col>
          </Row>
        </Container>
        <SendButton onClick={() => this.sendTransaction()}>
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
        </SendButton>

        <SubTitle style={{ textAlign: 'center', color: '#476b84' }}>
          {i18nReact.translate('sendPanel.walletAfterTransaction')}
          <b>
            {(this.getBalance() - this.state.amount - FEE).toLocaleString(
              this.getLocaleId(),
            )}{' '}
            XVG
          </b>
        </SubTitle>
        <hr />
        <SubTitle
          style={{
            textAlign: 'center',
            marginTop: '20px',
            fontSize: '12px',
            fontWeight: 400,
            lineHeight: '19px',
          }}
        >
          {i18nReact.translate('sendPanel.sendWarning')}
        </SubTitle>
      </Modal>
    )
  }
}

export default inject(
  'SettingsStore',
  'CoinStatsStore',
  'AccountInformationStore',
)(observer(SendPanel))
