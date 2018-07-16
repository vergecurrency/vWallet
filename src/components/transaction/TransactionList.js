import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { shell } from 'electron'

import ScaleBalance from 'react-material-icon-svg/dist/ScaleBalanceIcon'
import ArrowDown from '../../icons/ArrowDown'
import ArrowUp from '../../icons/ArrowUp'
import Loading from '../../icons/Loading'
import Pile from '../../icons/Pile'
import NoTransactions from '../../assets/images/no-transactions.svg'
import SearchBar from './SearchBar'
import { translate, Trans, Interpolate } from 'react-i18next'
import Transaction from './Transaction'
import moment from 'moment'
import styled from 'styled-components'
import ReceivePanel from './../modal/ReceivePanel'
import { Tooltip } from 'reactstrap'

const TransactionTitle = styled.div`
  display: flex;
  align-content: center;
  align-items: center;
  justify-items: center;
  font-size: 21px;
  padding-left: 30px !important;
`

const MonthlySummary = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  text-align: right;
`

const MonthSummary = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  background: whitesmoke;
  padding: 7px 9px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
`

const SpendSummary = styled.div`
  font-size: 12px;
  width: auto;
  align-items: center;
  display: inline-flex;
  padding: 7px 9px;
  background-color: rgb(222, 222, 222);
  border-left: 1px solid white;
  color: #003b54;
  .arrow-down {
    stroke: #003b54;
  }
`

const ReceivedSummary = styled.div`
  font-size: 12px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  width: auto;
  align-items: center;
  display: inline-flex;
  padding: 7px 9px;
  background-color: #009178;
  border-left: 1px solid white;
  color: #fff;
`

const Seperator = styled.hr`
  margin: 0px 0px;
  height: 0px;
`

class TransactionList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      receiveOpen: false,
      tooltipReceiveOpen: false,
    }
  }

  getMonthlyOuputFormatted(XVGSummaryFormatter) {
    return XVGSummaryFormatter.format(this.props.TransactionStore.monthlyOutput)
  }

  getMonthlyIncomeFormatted(XVGSummaryFormatter) {
    return `+${XVGSummaryFormatter.format(
      this.props.TransactionStore.monthlyIncome,
    )}`
  }

  openBuyGuide() {
    shell.openExternal('https://vergecurrency.com/get-started/')
  }

  toggleReceive() {
    if (this.props.AccountInformationStore.unlocked) {
      this.setState({ receiveOpen: !this.state.receiveOpen })
    }
  }

  toggleReceiveTooltip() {
    this.setState({
      tooltipReceiveOpen: !this.state.tooltipReceiveOpen,
    })
  }

  showTransactionsList() {
    return this.props.TransactionStore.getReceivedTransactionsStatus
      || this.props.TransactionStore.getTransactionCount > 0
  }

  render() {
    const XVGFormatter = new Intl.NumberFormat(
      this.props.SettingsStore.getLocale,
      {
        style: 'decimal',
        minimumFractionDigits: 3,
      },
    )

    if (this.showTransactionsList()) {
      this.props.TransactionStore.setReceivedTransactions(true)

      return (
        <div className="transaction-list-container">
          <div className="transaction-list-counter">
            {this.props.TransactionStore.getTransactionCount > 999
              ? '999+'
              : this.props.TransactionStore.getTransactionCount}
          </div>
          <div className="container-fluid transaction-list-title-container">
            <div className="row">
              <TransactionTitle className="col-md-6">
                <Pile
                  width={30}
                  height={30}
                  style={{ fill: '#003b54', marginRight: '10px' }}
                />{' '}
                <Trans i18nKey={'transaction.list'} />
              </TransactionTitle>
              <MonthlySummary className="col-md-6">
                <MonthSummary>
                  <ScaleBalance
                      width={14}
                      height={14}
                      style={{ marginRight: '5px' }}
                  />
                  {moment().format('MMMM')}
                </MonthSummary>
                <SpendSummary>
                  <ArrowDown
                    width={14}
                    height={14}
                    style={{ marginRight: '5px' }}
                  />
                  {this.getMonthlyOuputFormatted(XVGFormatter)}
                </SpendSummary>
                <ReceivedSummary>
                  <ArrowUp
                    width={14}
                    height={14}
                    style={{ marginRight: '5px' }}
                  />
                  {this.getMonthlyIncomeFormatted(XVGFormatter)}
                </ReceivedSummary>
              </MonthlySummary>
            </div>
          </div>
          <Seperator />
          <div
            style={{
              ...(this.props.TransactionStore.loaded
                ? {}
                : {
                    textAlign: 'center',
                    display: 'block',
                    paddingTop: '25%',
                  }),
              overflowY: 'auto',
            }}
          >
            {this.props.TransactionStore.loaded ? (
              <div className="container-fluid">
                <SearchBar />
                {this.props.TransactionStore.lastTenTransaction.map(
                  transaction => (
                    <div
                      className="row transaction-list-item"
                      key={`${transaction.txid}#${transaction.category}#${
                        transaction.address
                      }#${transaction.timereceived}`}
                    >
                      <Transaction {...transaction} />
                    </div>
                  ),
                )}
              </div>
            ) : (
              <Loading text={translate('transaction.loading')} />
            )}
          </div>
        </div>
      )
    }

    let buyGuide = (
      <a href="#" onClick={this.openBuyGuide.bind(this)}>
        <Trans i18nKey={'transaction.buyXvgGuide'} />
      </a>
    )

    let receiveXvg = (
      <a id="receive-xvg" href="#" onClick={this.toggleReceive.bind(this)}>
        <Trans i18nKey={'transaction.receiveXvg'} />
      </a>
    )

    return (
      <div className="transaction-list-container no-transactions-container">
        <ReceivePanel
          open={this.state.receiveOpen}
          toggle={this.toggleReceive.bind(this)}
        />
        <div className="no-transactions-panel">
          <img src={NoTransactions} className="no-transactions-img"/>
          <p className="no-transactions-title">
            <Trans i18nKey={'transaction.noTransactionsTitle'} />
          </p>
          {!this.props.AccountInformationStore.unlocked &&
            <Tooltip
              placement="top"
              isOpen={this.state.tooltipReceiveOpen}
              target="receive-xvg"
              toggle={this.toggleReceiveTooltip.bind(this)}
            >
              <Trans i18nKey={'unlock.title'} />
            </Tooltip>
          }
          <Interpolate
            className="no-transactions-subtitle"
            i18nKey={'transaction.noTransactionsSubtitle'}
            buyGuide={buyGuide}
            receive={receiveXvg}
          />
        </div>
      </div>
    )
  }
}

export default translate()(
  inject('TransactionStore', 'AccountInformationStore', 'SettingsStore')(observer(TransactionList)),
)
