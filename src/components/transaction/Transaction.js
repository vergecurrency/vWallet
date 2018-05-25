import React, { Component } from 'react'
import { fadeIn, fadeInDown } from 'react-animations'
import { inject, observer } from 'mobx-react'
import styled, { keyframes } from 'styled-components'

import ArrowDown from '../../icons/ArrowDown'
import ArrowUp from '../../icons/ArrowUp'
import T from 'i18n-react'
import arrowdown from '../../assets/images/arrowdown.png'
import incoming from '../../assets/images/incoming.png'
import { isNull } from 'util'
import moment from 'moment'
import outgoing from '../../assets/images/outgoing.png'
import { shell } from 'electron'

const TextContainer = styled.div`
  color: ${props => (props.theme.light ? '#999999;' : '#7193ae;')};
`

const TransactionIcon = styled.div`
  display: inline-flex;
  padding: 7px;
  border-radius: 52%;
  height: 32px;
  width: 32px;
  background-color: ${props => (!props.up ? '#00917a' : '#dc2b3d')};
  .arrow-down,
  .arrow-up {
    stroke-width: 3px;
  }
`

const CenterDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const NewSign = styled.div`
  border: 1px solid #7193ae;
  border-radius: 1.4em;
  text-align: center;
  text-transform: uppercase;
  font-size: 0.7em;
  height: auto;
  width: 90px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
const fadeInAnimation = keyframes`${fadeIn}`

const ContainerClicky = styled.div`
  cursor: pointer;
  animation: 1s ${fadeInAnimation};
`

const TransactionDetails = styled.div`
  animation: 1s ${fadeInAnimation};
  padding-left: 8px;
`

const RoundedTransaction = styled.div`
  border-radius: 0.5em;
  padding: 6px 10px;
  &:hover {
    background-color: hsla(207, 48%, 95%, 0.8);
  }
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
      <ContainerClicky
        className="container"
        onClick={() => {
          this.props.TransactionStore.setVisibility(
            txid,
            category,
            address,
            !hide
          )
        }}
      >
        <RoundedTransaction className="row">
          <div
            className="col-md-1"
            style={{
              textAlign: 'center',
              fontWeight: '500',
              fontSize: '13px',
              paddingTop: '5px',
            }}
          >
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
                lineHeight: '1.0',
                color: '#cacaca',
              }}
            >
              {moment.unix(timereceived).format('DD')}
            </TextContainer>
          </div>
          <CenterDiv className="col-md-1">
            {category.includes('receive') ? (
              <TransactionIcon>
                <ArrowUp width={18} height={18} />
              </TransactionIcon>
            ) : (
              <TransactionIcon up>
                <ArrowDown width={18} height={18} />
              </TransactionIcon>
            )}
          </CenterDiv>
          {this.isNew() ? (
            <TextContainer className="col-md-1">
              <NewSign>new</NewSign>
            </TextContainer>
          ) : (
            isNull
          )}
          <div
            className={this.isNew() ? 'col-md-8' : 'col-md-9'}
            style={{
              fontWeight: 'bold',
              color: category.includes('receive') ? '#00917a' : '#dc2b3d',
              textAlign: 'right',
              letterSpacing: '1px',
              fontSize: '22px',
            }}
          >
            <div>
              <font
                style={{
                  verticalAlign: 'super',
                  fontSize: '10px',
                  fontWeight: 500,
                }}
              >
                XVG
              </font>
              <font
                style={{
                  fontSize: '20px',
                  fontWeight: 400,
                }}
              >
                {Math.abs(amount + fee)
                  .toFixed(2)
                  .toLocaleString(this.props.SettingsStore.getLocale)}{' '}
                {category.includes('receive') ? '+' : '-'}
              </font>
            </div>
            <TextContainer
              style={{
                fontSize: '12px',
                fontWeight: '500',
                letterSpacing: '1px',
              }}
            >
              <font>{this.getType()}</font>
            </TextContainer>
          </div>
          {blockhash ? (
            <div
              className="col-md-1"
              style={{
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src={arrowdown}
                style={{
                  transform: `rotate(${hide ? 0 : 180}deg)`,
                }}
              />
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
        </RoundedTransaction>
        {!hide ? (
          <TransactionDetails className="trans-details">
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
            <div
              className="row"
              style={{
                marginTop: '5px',
              }}
            >
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
          </TransactionDetails>
        ) : null}
      </ContainerClicky>
    )
  }
}

export default inject('TransactionStore', 'SettingsStore')(
  observer(Transaction)
)
