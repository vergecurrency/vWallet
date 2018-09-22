import * as React from 'react'
import { translate, Trans } from 'react-i18next'
import * as moment from 'moment'
import * as styled from 'styled-components'
const { clipboard, shell } = require('electron')
import { Tooltip } from 'reactstrap'
import settings from '../../settings'
import { inject, observer } from 'mobx-react'

import ArrowDown from '../../icons/ArrowDown'
import ArrowPop from '../../icons/ArrowPop'
import ArrowUp from '../../icons/ArrowUp'
import Blockchain from '../../icons/Blockchain'
import CheckBadge from '../../icons/CheckBadge'
import { SettingsStore } from '../../stores/SettingsStore'
import Timer from '../../icons/Timer'
import { TransactionStore } from '../../stores/TransactionStore'
import { fadeIn } from 'react-animations'
import { i18n } from '../../../node_modules/@types/i18next'
import Copy from '../../icons/Copy'

const TextContainer = styled.default.div`
  color: ${props => (props.theme.light ? '#999999;' : '#7193ae;')};
`

const TransactionIcon = styled.default.div`
  display: inline-flex;
  padding: 7px;
  border-radius: 52%;
  height: 32px;
  width: 32px;
  background-color: ${(props: any) => (!props.up ? '#00917a' : '#dc2b3d')};
  .arrow-down,
  .arrow-up {
    stroke-width: 3px;
  }
`

const CenterDiv = styled.default.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const fadeInAnimation = styled.keyframes`
  ${fadeIn};
`

const ContainerClicky = styled.default.div`
  cursor: pointer;
  animation: 1s ${fadeInAnimation};
`

const TransactionDetails = styled.default.div`
  animation: 1s ${fadeInAnimation};
  padding-left: 8px;
  margin: 10px 0px;
  font-weight: normal;
  font-size: 80%;
`

const TransactionDetailsHeader = styled.default.div`
  font-size: 14px;
  font-style: 500;
`
const TransactionDetailsFooter = styled.default.div`
  font-size: 12px;
`

const TransactionDetailsMoney = styled.default.div`
  margin-top: 2px;
  margin-bottom: 2px;
  font-size: 18px;
  color: #000;
`

const SubTransactionDetails = styled.default.div`
  margin-top: 5px;
  padding-top: 5px;
  border-top: 1px solid rgba(100, 100, 100, 0.07);
  padding-left: 23px;
  padding-right: 15px;
  margin-left: -23px;
  margin-right: -15px;
  text-align: left;
`

const SubTransactionFurtherDetails = styled.default.div`
  padding-top: 5px;
  border-bottom: 1px solid rgba(100, 100, 100, 0.07);
  padding-left: 23px;
  padding-right: 15px;
  margin-left: -23px;
  margin-right: -15px;
  text-align: left;
  background-color: rgba(100, 100, 100, 0.07);
  margin-bottom: -10px;
`

const TransactionDetailProp = styled.default.div`
  padding: 0px !important;
  display: inline-flex;
  align-items: center;
`

const ExternalLinks = styled.default.a`
  margin-right: 5px;
  margin-left: 5px;
`

const RoundedTransaction = styled.default.div`
  padding: 6px 10px;
  border-bottom: 1px solid rgba(100, 100, 100, 0.07);
  &:hover {
    background-color: hsla(207, 48%, 95%, 0.8);
  }
`

interface Props {
  amount: number
  account: string
  address: string
  fee: number
  blockhash: string
  category: 'receive' | 'send'
  confirmations: number
  time: number
  timereceived: number
  txid: string
  hide: boolean
  TransactionStore: TransactionStore
  SettingsStore: SettingsStore
  i18n?: i18n
}

class Transaction extends React.Component<Props> {
  state: { tooltip: boolean; copied: boolean } = {
    tooltip: false,
    copied: false,
  }

  private xvgFormatter: Intl.NumberFormat = new Intl.NumberFormat(
    this.props.SettingsStore.getLocale,
    {
      minimumSignificantDigits: 1,
      minimumFractionDigits: 2,
      maximumFractionDigits: 4,
    },
  )

  getType(amount: number, category: string, fee) {
    if (amount !== 0) {
      return category.includes('receive')
        ? this.props.i18n!.t('transaction.item.receive')
        : this.props.i18n!.t('transaction.item.sent')
    }

    if ((!amount || amount === 0) && fee < 0) {
      return this.props.i18n!.t('transaction.item.fee')
    }

    return this.props.i18n!.t('transaction.item.unknown')
  }

  isNew() {
    return this.props.time + 90 * 60 - moment().unix() > 0
  }

  setTooltip() {
    this.setState({ tooltip: !this.state.tooltip })
  }

  copyAddressToClipboard() {
    clipboard.writeText(this.props.address)
    this.setState({ copied: true })

    setTimeout(() => {
      this.setState({ copied: false })
    }, 750)
  }

  render() {
    const {
      address = '',
      amount = 0,
      fee = 0,
      category = '',
      confirmations = 0,
      timereceived = 0,
      time = 0,
      txid = '',
      hide = false,
      blockhash = '',
      TransactionStore,
    }: Props = this.props

    return (
      <ContainerClicky className="container-fluid">
        <RoundedTransaction
          className="row"
          onClick={() => {
            TransactionStore.setVisibility(
              txid,
              category,
              address,
              timereceived,
              !hide,
            )
          }}
        >
          <div
            className="col-md-1"
            style={{
              fontWeight: 500,
              fontSize: '13px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'column',
              justifyContent: 'center',
            }}
          >
            <TextContainer>
              {moment
                .unix(time)
                .format('MMM')
                .toUpperCase()}
            </TextContainer>
            <TextContainer
              style={{
                fontWeight: 300,
                fontSize: '22px',
                lineHeight: '1.0',
                color: '#cacaca',
              }}
            >
              {moment.unix(time).format('DD')}
            </TextContainer>
          </div>
          <CenterDiv className="col-md-1">
            {category.includes('receive') ? (
              <TransactionIcon>
                <ArrowUp width={18} height={18} />
              </TransactionIcon>
            ) : (
              <TransactionIcon {...{ up: true }}>
                <ArrowDown width={18} height={18} />
              </TransactionIcon>
            )}
          </CenterDiv>
          <div
            className={'col-md-9'}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              justifyContent: 'center',
              fontWeight: 500,
              color: category.includes('receive') ? '#00917a' : '#dc2b3d',
              letterSpacing: '1px',
              paddingTop: '7px',
              paddingBottom: '7px',
            }}
          >
            <div>
              <span
                style={{
                  fontSize: '20px',
                  fontWeight: 500,
                }}
              >
                {category.includes('receive') ? '+' : '-'}
                {this.xvgFormatter.format(Math.abs(amount + fee))} XVG
              </span>
            </div>
            <TextContainer>
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 'normal',
                  letterSpacing: '1px',
                }}
              >
                {this.getType(amount, category, fee)}
              </span>
            </TextContainer>
          </div>

          <div
            className="col-md-1"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ArrowPop height={36} hide={hide} />
          </div>
        </RoundedTransaction>

        {!hide ? (
          <TransactionDetails className="trans-details">
            <TransactionDetailsHeader className="Row">
              {this.getType(amount, category, fee)} transaction{' · '}
              {moment.unix(time).fromNow()}
            </TransactionDetailsHeader>
            <TransactionDetailsMoney className="Row">
              XVG {this.xvgFormatter.format(Math.abs(amount + fee))}{' '}
              {category.includes('receive') ? '+' : '-'}
            </TransactionDetailsMoney>
            <TransactionDetailsFooter className="Row">
              {category.includes('receive') ? 'to' : 'from'} {address}{' '}
              <Copy
                id={txid}
                height={15}
                width={15}
                style={{ fill: 'rgba(100,100,100, 0.5)', paddingTop: '4px' }}
                onClick={this.copyAddressToClipboard.bind(this)}
              />
              <Tooltip
                placement="top"
                isOpen={this.state.tooltip}
                target={txid}
                toggle={this.setTooltip.bind(this)}
              >
                {this.state.copied ? (
                  <Trans i18nKey="transaction.item.copied" />
                ) : (
                  <Trans i18nKey="transaction.item.copy" />
                )}
              </Tooltip>
            </TransactionDetailsFooter>
            <SubTransactionDetails className="Row">
              <TransactionDetailProp className="col-md-6">
                <CheckBadge
                  height={15}
                  width={15}
                  style={{ fill: 'rgba(100,100,100, 0.5)', marginRight: '7px' }}
                />{' '}
                {confirmations > 0
                  ? `${confirmations} ${this.props.i18n!.t(
                      'transaction.item.confirmations',
                    )}`
                  : this.props.i18n!.t('transaction.item.outofsync')}
              </TransactionDetailProp>
              <TransactionDetailProp className="col-md-6">
                <Timer
                  height={15}
                  width={15}
                  style={{
                    fill: 'rgba(100,100,100, 0.75)',
                    marginRight: '7px',
                  }}
                />{' '}
                {moment.unix(time).format('MMMM Do YYYY, h:mm:ss a')}
              </TransactionDetailProp>
            </SubTransactionDetails>
            <SubTransactionFurtherDetails className="Row">
              <TransactionDetailProp className="col-md-12">
                <Blockchain
                  height={15}
                  width={15}
                  style={{ fill: 'rgba(100,100,100, 0.7)', marginRight: '7px' }}
                />{' '}
                <Trans i18nKey={'transaction.item.more'} />
                <ExternalLinks
                  href="#"
                  onClick={() => {
                    shell.openExternal(`${settings.TRANSACTION_LINK}${txid}`)
                  }}
                >
                  <Trans i18nKey={'transaction.item.opentransaction'} />
                </ExternalLinks>
                {' · '}
                <ExternalLinks
                  href="#"
                  onClick={() => {
                    shell.openExternal(`${settings.BLOCK_LINK}${blockhash}`)
                  }}
                >
                  <Trans i18nKey={'transaction.item.openblock'} />
                </ExternalLinks>
              </TransactionDetailProp>
            </SubTransactionFurtherDetails>
          </TransactionDetails>
        ) : null}
      </ContainerClicky>
    )
  }
}

export default translate()(
  inject('TransactionStore', 'SettingsStore')(observer(Transaction)),
)
