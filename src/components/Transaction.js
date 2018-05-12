import React, { Component } from 'react'
import moment from 'moment'
import T from 'i18n-react'
import incoming from '../assets/images/incoming.png'
import outgoing from '../assets/images/outgoing.png'
import arrowdown from '../assets/images/arrowdown.png'
import { renderReporter, propTypes } from 'mobx-react'
import { shell } from 'electron'
import { isStringTextContainingNode } from 'typescript'
import styled from 'styled-components'
const XVGformatter = new Intl.NumberFormat('en-US', {
  style: 'decimal',
  minimumFractionDigits: 5,
})

const TextContainer = styled.div`
  color: ${props => (props.theme.light ? '#999999;' : '#7193ae;')};
`

export default class Transaction extends Component {
  constructor(props) {
    super(props)
    this.state = { hide: true }
  }

  render() {
    const {
      account,
      address,
      amount,
      blockhash,
      category,
      confirmations,
      time,
      timereceived,
      txid,
    } = this.props

    return (
      <div className="container">
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
            className="col-md-2"
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
          <div
            className="col-md-7"
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
              {amount.toFixed(2).toLocaleString('en-US')} XVG
            </div>
            <TextContainer
              style={{
                fontSize: '12px',
                fontWeight: '400',
                letterSpacing: '1px',
              }}
            >
              <font>
                {category.includes('receive')
                  ? T.translate('transaction.item.receive')
                  : T.translate('transaction.item.sent')}
              </font>
            </TextContainer>
          </div>
          {blockhash ? (
            <div
              className="col-md-2"
              style={{ textAlign: 'center', cursor: 'pointer' }}
              onClick={() => {
                this.setState({ hide: !this.state.hide })
              }}
            >
              <div>
                <img
                  src={arrowdown}
                  style={{
                    transform: `rotate(${this.state.hide ? 0 : 180}deg)`,
                  }}
                />
              </div>
              <TextContainer style={{ fontSize: '10px' }}>
                {this.state.hide
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
        {!this.state.hide ? (
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
      </div>
    )
  }
}
