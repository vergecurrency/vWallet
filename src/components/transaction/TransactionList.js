import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import ScaleBalance from 'react-material-icon-svg/dist/ScaleBalanceIcon'
import ArrowDown from '../../icons/ArrowDown'
import ArrowUp from '../../icons/ArrowUp'
import Loading from '../../icons/Loading'
import Pile from '../../icons/Pile'
import SearchBar from './SearchBar'
import T from 'i18n-react'
import Transaction from './Transaction'
import moment from 'moment'
import styled from 'styled-components'

const TransactionListContainer = styled.div`
  background-color: #ffffff;
`

const ItemContainer = styled.div``

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
  getMonthlyOuputFormatted(XVGSummaryFormatter) {
    return XVGSummaryFormatter.format(this.props.TransactionStore.monthlyOutput)
  }

  getMonthlyIncomeFormatted(XVGSummaryFormatter) {
    return `+${XVGSummaryFormatter.format(
      this.props.TransactionStore.monthlyIncome,
    )}`
  }

  render() {
    const XVGFormatter = new Intl.NumberFormat(
      this.props.SettingsStore.getLocale,
      {
        style: 'decimal',
        minimumFractionDigits: 3,
      },
    )

    return (
      <TransactionListContainer className="transaction-list-container">
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
              {T.translate('transaction.list')}
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
                  <ItemContainer
                    className="row transaction-list-item"
                    key={`${transaction.txid}#${transaction.category}#${
                      transaction.address
                    }#${transaction.timereceived}`}
                  >
                    <Transaction {...transaction} />
                  </ItemContainer>
                ),
              )}
            </div>
          ) : (
            <Loading text={T.translate('transaction.loading')} />
          )}
        </div>
      </TransactionListContainer>
    )
  }
}

export default inject('TransactionStore', 'SettingsStore')(
  observer(TransactionList),
)
