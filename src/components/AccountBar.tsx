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
import styledComponents from 'styled-components'
import ReceivePanel from './modal/ReceivePanel'
import { Trans, translate } from 'react-i18next'
import { i18n } from '../../node_modules/@types/i18next'

const AccountBarContainer = styledComponents.div`
  max-height: 190px;
  min-height: 190px;
  padding-top: 28px;
  ${props =>
    props.theme.light
      ? `
   background-color: #00b8dc;
   background-image: linear-gradient(
    -86deg,
    #1db5db 0%,
    #1db5db 20%,
    #25c5ed 46%,
    #0ea1c6 75%,
    #0ea1c6 100%
  );`
      : 'background-color: #0d1f2d;'};
`

interface AccountBarProps {
  SettingsStore?: SettingsStore
  AccountInformationStore?: AccountInformationStore
  CoinStatsStore?: CoinStatsStore
  i18n?: i18n
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
              <Trans i18nKey={'accountbar.xvgbalance'} />
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
              {this.props.i18n!.t('accountbar.xvgusd', {
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
              <Trans i18nKey={'accountbar.xvgprice'} />
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
                <Trans i18nKey={'accountbar.unlock'} />
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
              <Trans i18nKey={'account-bar.send'} />
            </div>
            {!this.props.AccountInformationStore!.unlocked ? (
              <Tooltip
                placement="top"
                isOpen={this.state.tooltipReceiveOpen}
                target="receiving"
                toggle={this.toggleReceiveTooltip}
              >
                <Trans i18nKey={'accountbar.unlock'} />
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
              <Trans i18nKey={'account-bar.receive'} />
            </div>
          </div>
        </div>
      </AccountBarContainer>
    )
  }
}

export default translate('translations')(
  inject('SettingsStore', 'AccountInformationStore', 'CoinStatsStore')(
    observer(AccountBar),
  ),
)
