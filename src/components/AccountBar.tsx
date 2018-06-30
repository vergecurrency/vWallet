import * as React from 'react'

import { inject, observer } from 'mobx-react'

import { AccountInformationStore } from '../stores/AccountInformationStore'
import { CoinStatsStore } from '../stores/CoinStatsStore'
import Send from 'react-material-icon-svg/dist/SendIcon'
import Receive from 'react-material-icon-svg/dist/ArrowDownIcon'
import SendPanel from './modal/SendPanel'
import { SettingsStore } from '../stores/SettingsStore'
import { Tooltip } from 'reactstrap'
import VergeCacheStore from '../stores/VergeCacheStore'
import i18nReact from 'i18n-react'
import styledComponents from 'styled-components'
import ReceivePanel from './modal/ReceivePanel'

const AccountBarContainer = styledComponents.div`
  max-height: 200px;
  min-height: 200px;
  padding-top: 35px;
  ${props =>
    props.theme.light
      ? `
   background-color: #00b8dc;
   background-image: linear-gradient(
    -86deg,
    #1db6dc 0%,
    #1db6dc 20%,
    #25c5ed 46%,
    #0fa2c6 75%,
    #0fa2c6 100%
  );`
      : 'background-color: #0d1f2d;'};
`

interface AccountBarProps {
  SettingsStore?: SettingsStore
  AccountInformationStore?: AccountInformationStore
  CoinStatsStore?: CoinStatsStore
}

interface AccountBarState {
  sendOpen: boolean
  tooltipSendOpen: boolean
  tooltipReceiveOpen: boolean
  receiveOpen: boolean
}

class AccountBar extends React.Component<AccountBarProps, AccountBarState> {
  constructor(props) {
    super(props)
    this.state = {
      sendOpen: false,
      tooltipSendOpen: false,
      tooltipReceiveOpen: false,
      receiveOpen: false,
    }

    this.toggleSend = this.toggleSend.bind(this)
    this.toggleReceive = this.toggleReceive.bind(this)
    this.toggleSendTooltip = this.toggleSendTooltip.bind(this)
    this.toggleReceiveTooltip = this.toggleReceiveTooltip.bind(this)
  }

  toggleSend() {
    this.setState({ sendOpen: !this.state.sendOpen })
  }

  toggleReceive() {
    this.setState({ receiveOpen: !this.state.receiveOpen })
  }

  toggleSendTooltip() {
    this.setState({
      tooltipSendOpen: !this.state.tooltipSendOpen,
    })
  }

  toggleReceiveTooltip() {
    this.setState({
      tooltipReceiveOpen: !this.state.tooltipReceiveOpen,
    })
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

    const formatterPrice = new Intl.NumberFormat(
      VergeCacheStore.get('locale', 'en-US'),
      {
        style: 'currency',
        currency: VergeCacheStore.get('currency', 'USD'),
        minimumFractionDigits: 5,
      },
    )

    const XVGformatter = new Intl.NumberFormat(
      VergeCacheStore.get('locale', 'en-US'),
      {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 3,
      },
    )

    return (
      <AccountBarContainer className="container-fluid account-bar-container">
        <SendPanel open={this.state.sendOpen} toggle={this.toggleSend} />
        <ReceivePanel
          open={this.state.receiveOpen}
          toggle={this.toggleReceive}
        />
        <div className="row">
          <div className="col-md-3 account-bar-label">
            <span className="account-bar-title">
              {i18nReact.translate('accountbar.xvgbalance')}
            </span>
            <h4>
              {XVGformatter.format(
                this.props.AccountInformationStore!.getBalance,
              )}{' '}
              XVG
            </h4>
          </div>
          <div className="col-md-2 account-bar-label">
            <span className="account-bar-title">
              {i18nReact.translate('accountbar.xvgusd', {
                currency: this.props.SettingsStore!.getCurrency,
              })}
            </span>
            <h4>
              {formatter.format(
                this.props.AccountInformationStore!.getBalance *
                  this.props.CoinStatsStore!.priceWithCurrency,
              )}
            </h4>
          </div>
          <div className="col-md-3 account-bar-label">
            <span className="account-bar-title">
              {i18nReact.translate('accountbar.xvgprice')}
            </span>
            <h4>
              {formatterPrice.format(
                this.props.CoinStatsStore!.priceWithCurrency,
              )}
            </h4>
          </div>
          <div
            className="col-md-4"
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              ...(this.props.AccountInformationStore!.unlocked
                ? {}
                : { opacity: 0.5 }),
            }}
          >
            {!this.props.AccountInformationStore!.unlocked ? (
              <Tooltip
                placement="top"
                isOpen={this.state.tooltipSendOpen}
                target="sending"
                toggle={this.toggleSendTooltip}
              >
                Unlock your wallet!
              </Tooltip>
            ) : null}
            <div
              id="sending"
              className="account-bar-big-button send"
              onClick={
                this.props.AccountInformationStore!.unlocked
                  ? this.toggleSend
                  : () => {}
              }
            >
              <Send
                width={18}
                height={18}
                style={{ fill: '#fff', marginRight: '5px' }}
              />
              {i18nReact.translate('account-bar.send')}
            </div>
            {!this.props.AccountInformationStore!.unlocked ? (
              <Tooltip
                placement="top"
                isOpen={this.state.tooltipReceiveOpen}
                target="receiving"
                toggle={this.toggleReceiveTooltip}
              >
                Unlock your wallet!
              </Tooltip>
            ) : null}
            <div
              id="receiving"
              className="account-bar-big-button receive"
              onClick={
                this.props.AccountInformationStore!.unlocked
                  ? this.toggleReceive
                  : () => {}
              }
            >
              <Receive
                width={18}
                height={18}
                style={{ fill: '#fff', marginRight: '5px' }}
              />
              {i18nReact.translate('account-bar.receive')}
            </div>
          </div>
        </div>
      </AccountBarContainer>
    )
  }
}

export default inject(
  'SettingsStore',
  'AccountInformationStore',
  'CoinStatsStore',
)(observer(AccountBar))
