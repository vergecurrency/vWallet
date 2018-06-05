import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import { Client } from 'verge-node-typescript'
import CurrencySymbol from './CurrencySymbol'
import ElectronStore from 'electron-store'
import MoneyIn from '../icons/MoneyIn'
import MoneyOut from '../icons/MoneyOut'
import SendPanel from './modal/SendPanel'
import T from 'i18n-react'
import { Tooltip } from 'reactstrap'
import receive from '../assets/images/receive.png'
import send from '../assets/images/send.png'
import styled from 'styled-components'

const electronStore = new ElectronStore({
  encryptionKey: Buffer.from('vergecurrency'),
})

const AccountBarContainer = styled.div`
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

class AccountBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sendOpen: false,
      tooltipSendOpen: false,
      tooltipReceiveOpen: false,
    }

    this.toggleSend = this.toggleSend.bind(this)
    this.toggleSendTooltip = this.toggleSendTooltip.bind(this)
    this.toggleReceiveTooltip = this.toggleReceiveTooltip.bind(this)
  }

  toggleSend() {
    this.setState({ sendOpen: !this.state.sendOpen })
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
      electronStore.get('locale', 'en-US'),
      {
        style: 'currency',
        currency: electronStore.get('currency', 'USD'),
        minimumFractionDigits: 2,
      },
    )

    const formatterPrice = new Intl.NumberFormat(
      electronStore.get('locale', 'en-US'),
      {
        style: 'currency',
        currency: electronStore.get('currency', 'USD'),
        minimumFractionDigits: 5,
      },
    )

    const XVGformatter = new Intl.NumberFormat(
      electronStore.get('locale', 'en-US'),
      {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 3,
      },
    )

    return (
      <AccountBarContainer className="container-fluid">
        <SendPanel open={this.state.sendOpen} toggle={this.toggleSend} />
        <div className="row">
          <div
            className="col-md-3"
            style={{
              textAlign: 'left',
              fontWeight: 'bold',
              paddingTop: '10px',
              paddingLeft: '5%',
            }}
          >
            <font
              style={{
                color: '#fff',
                letterSpacing: '3px',
                fontSize: '10px',
              }}
            >
              {T.translate('accountbar.xvgbalance')}
            </font>
            <h4 style={{ color: '#fff' }}>
              {XVGformatter.format(
                this.props.AccountInformationStore.getBalance,
              )}{' '}
              XVG {/*<CurrencySymbol fontSize={18} color={'#fff'} />*/}
            </h4>
          </div>
          <div
            className="col-md-2"
            style={{
              textAlign: 'left',
              fontWeight: 'bold',
              paddingTop: '10px',
              paddingLeft: '5%',
            }}
          >
            <font
              style={{
                color: '#fff',
                letterSpacing: '3px',
                fontSize: '10px',
              }}
            >
              {T.translate('accountbar.xvgusd', {
                currency: this.props.SettingsStore.getCurrency,
              })}
            </font>
            <h4 style={{ color: '#fff' }}>
              {formatter.format(
                this.props.AccountInformationStore.getBalance *
                  this.props.CoinStatsStore.priceWithCurrency,
              )}
            </h4>
          </div>
          <div
            className="col-md-3"
            style={{
              textAlign: 'left',
              fontWeight: 'bold',
              paddingTop: '10px',
              paddingLeft: '5%',
            }}
          >
            <font
              style={{
                color: '#fff',
                letterSpacing: '3px',
                fontSize: '10px',
              }}
            >
              {T.translate('accountbar.xvgprice')}
            </font>
            <h4 style={{ color: '#fff' }}>
              {formatterPrice.format(
                this.props.CoinStatsStore.priceWithCurrency,
              )}
            </h4>
          </div>
          <div
            className="col-md-2"
            style={{
              textAlign: 'center',
              display: 'flex',
              justifyContent: 'center',
              ...(this.props.AccountInformationStore.unlocked
                ? {}
                : { opacity: 0.5 }),
            }}
          >
            {!this.props.AccountInformationStore.unlocked ? (
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
              className="big-button send"
              id="sending"
              style={{
                alignSelf: 'center',
                display: 'flex-inline',
                alignItems: 'center',
                justifyItems: 'center',
                display: 'inline-flex',
                justifyContent: 'center',
              }}
              onClick={
                this.props.AccountInformationStore.unlocked
                  ? this.toggleSend
                  : () => {}
              }
            >
              <MoneyOut
                width={16}
                height={16}
                style={{ fill: '#fff', marginRight: '10px' }}
              />
              {T.translate('account-bar.send')}
            </div>
          </div>
          <div
            className="col-md-2"
            style={{
              textAlign: 'center',
              display: 'flex',
              justifyContent: 'center',
              ...(this.props.AccountInformationStore.unlocked
                ? {}
                : { opacity: 0.5 }),
            }}
          >
            {!this.props.AccountInformationStore.unlocked ? (
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
              className="big-button receive"
              style={{
                display: 'flex-inline',
                justifyItems: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                marginRight: '40px',
                display: 'inline-flex',
                justifyContent: 'center',
              }}
              onClick={
                this.props.AccountInformationStore.unlocked
                  ? this.toggleSend
                  : () => {}
              }
            >
              <MoneyIn
                width={16}
                height={16}
                style={{ fill: '#fff', marginRight: '10px' }}
              />
              {T.translate('account-bar.receive')}
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
