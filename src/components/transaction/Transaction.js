import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import T from 'i18n-react'
import arrowdown from '../../assets/images/arrowdown.png'
import incoming from '../../assets/images/incoming.png'
import moment from 'moment'
import outgoing from '../../assets/images/outgoing.png'
import { shell } from 'electron'
import styled from 'styled-components'

const TextContainer = styled.div`
  color: ${props => (props.theme.light ? '#999999;' : '#7193ae;')};
`

const NewSign = styled.div`
  border: 1px solid #7193ae;
  border-radius: 1.4em;
  text-align: center;
  margin-top: 10px;
  height: auto;
  width: 60px;
`

const ContainerClicky = styled.div`
  cursor: pointer;
`

class Transaction extends Component {
  constructor(props) {
    super(props)
  }

  getType() {
    if (this.props.amount != 0) {
      return this.props.category.includes('receive')
        ? T.translate('transaction.item.receive')
        : T.translate('transaction.item.sent')
    } else if (
      (!this.props.amount || this.props.amount == 0) &&
      this.props.fee < 0
    ) {
      return T.translate('transaction.item.fee')
    }
  }

  isNew() {
    return this.props.timereceived + 90 * 60 - moment().unix() > 0
  }

  render() {
    const XVGformatter = new Intl.NumberFormat(
      this.props.SettingsStore.getLocale,
      {
        style: 'decimal',
        minimumFractionDigits: 5,
      }
    )

    const {
      account,
      address,
      amount,
      fee = 0,
      blockhash,
      category,
      confirmations,
      time,
      timereceived,
      txid,
      hide,
    } = this.props

    return (
      <ContainerClicky className="container" onClick={console.log}>
        <div className="row">
          <div className="col-md-1">
            <TextContainer>
              {moment
                .unix(timereceived)
                .format('MMM')
                .toUpperCase()}
            </TextContainer>
            <TextContainer
              style={{
                fontWeight: '300',
                fontSize: '22px',
                lineHeight: '1.25',
              }}
            >
              {moment.unix(timereceived).format('DD')}
            </TextContainer>
          </div>
          <TextContainer
            className="col-md-1"
            style={{
              fontWeight: 'bold',
              marginTop: '8px',
            }}
          >
            {category.includes('receive') ? (
              <img src={incoming} />
            ) : (
              <img src={outgoing} />
            )}
          </TextContainer>
          {this.isNew() ? (
            <TextContainer className="col-md-1">
              <NewSign>new</NewSign>
            </TextContainer>
          ) : null}
          <div
            className={this.isNew() ? 'col-md-7' : 'col-md-8'}
            style={{
              fontWeight: 'bold',
              color: category.includes('receive') ? '#00917a' : '#dc2b3d',
              textAlign: 'right',
              letterSpacing: '1px',
              fontSize: '22px',
            }}
          >
            <div>
              {category.includes('receive') ? '+' : ''}
              {(amount + fee).toFixed(2).toLocaleString('en-US')} XVG
            </div>
            <TextContainer
              style={{
                fontSize: '12px',
                fontWeight: '400',
                letterSpacing: '1px',
              }}
            >
              <font>{this.getType()}</font>
            </TextContainer>
          </div>
          {blockhash ? (
            <div
              className="col-md-2"
              style={{ textAlign: 'center', cursor: 'pointer' }}
              onClick={() => {
                this.props.TransactionStore.setVisibility(
                  txid,
                  category,
                  address,
                  !hide
                )
              }}
            >
              <div>
                <img
                  src={arrowdown}
                  style={{
                    transform: `rotate(${hide ? 0 : 180}deg)`,
                  }}
                />
              </div>
              <TextContainer style={{ fontSize: '10px' }}>
                {hide
                  ? T.translate('transaction.item.details')
                  : T.translate('transaction.item.close')}
              </TextContainer>
            </div>
          ) : (
            <div
              className="col-md-2"
              style={{ textAlign: 'center', marginTop: '15px' }}
            >
              {' '}
              <TextContainer style={{ fontSize: '10px' }}>
                Out of sync
              </TextContainer>
            </div>
          )}
        </div>
        {!hide ? (
          <div className="trans-details">
            <div className="row">
              <div className="col-md-2" style={{ fontWeight: 'bold' }}>
                {T.translate('transaction.item.address')}:
              </div>{' '}
              <a
                className="col-md-10"
                href="#"
                onClick={() =>
                  shell.openExternal(
                    `https://verge-blockchain.info/address/${address}`
                  )
                }
              >
                {address}
              </a>
            </div>
            <div className="row">
              <div className="col-md-2" style={{ fontWeight: 'bold' }}>
                {T.translate('transaction.item.blockhash')}:
              </div>
              <div className="col-md-10">
                {' '}
                <a
                  href="#"
                  onClick={() =>
                    shell.openExternal(
                      `https://verge-blockchain.info/block/${blockhash}`
                    )
                  }
                >
                  <em>{blockhash.substring(0, 40)}...</em>
                </a>
              </div>
            </div>
            <div className="row">
              <div className="col-md-2" style={{ fontWeight: 'bold' }}>
                {T.translate('transaction.item.txid')}:
              </div>
              <div className="col-md-10">
                {' '}
                <a
                  href="#"
                  onClick={() =>
                    shell.openExternal(
                      `https://verge-blockchain.info/tx/${txid}`
                    )
                  }
                >
                  <em>{txid.substring(0, 40)}...</em>
                </a>
              </div>
            </div>
            {/* Sub division of the table */}
            <div className="row" style={{ marginTop: '5px' }}>
              <div className="col-md-6">
                {T.translate('transaction.item.confirmations')}: {confirmations}
              </div>
              <div className="col-md-6">
                {T.translate('transaction.item.amount')}:{' '}
                {XVGformatter.format(amount)} XVG
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                {T.translate('transaction.item.time')}:{' '}
                {moment.unix(time).format('MM/DD/YYYY hh:mm a')}
              </div>
              <div className="col-md-6">
                {T.translate('transaction.item.timereceived')}:{' '}
                {moment.unix(timereceived).format('MM/DD/YYYY hh:mm a')}
              </div>
            </div>
          </div>
        ) : null}
      </ContainerClicky>
    )
  }
}

export default inject('TransactionStore', 'SettingsStore')(
  observer(Transaction)
)
