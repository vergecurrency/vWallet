// @ts-check
import React, { Component } from 'react'
import uuidv1 from 'uuid/v1'
import Transaction from './Transaction'
import { inject, observer } from 'mobx-react'
import T from 'i18n-react'
import styled from 'styled-components'
import { Z_DEFAULT_COMPRESSION, Z_DEFAULT_STRATEGY } from 'zlib'

const TransactionListContainer = styled.div`
  position: relative;
  bottom: 50px;
  left: 40px;
  width: 670px;
  height: 450px;
  border-radius: 7px;
  color: #003b54 !important;
  ${props =>
    props.theme.light
      ? 'background-color: #ffffff;'
      : 'background-color: #152b3d;'};
`

const ItemContainer = styled.div`
  padding: 10px;
  border-bottom: 1px solid ${props =>
    props.theme.light ? 'rgba(0, 0, 0, 0.1);' : 'rgba(238, 238, 238, 0.03);'}
  :nth-child(even) {
    ${props =>
      props.theme.light
        ? 'background-color: #f9f9f9;'
        : 'background-color: rgba(238, 238, 238, 0.01);'};
  }
`

const TransactionTitle = styled.div`
  font-size: 30px;
  height: 45px;
  padding-bottom: 59px;
  ${props => (props.theme.light ? '' : 'color: #fff;')};
`

const Seperator = styled.hr`
  ${props =>
    props.theme.light ? '' : 'background-color: rgba(238, 238, 238, 0.05);'};
  margin: 0px 0px;
`

@inject('TransactionStore')
@observer
export default class TransactionList extends Component {
  render() {
    return (
      <TransactionListContainer>
        <div className="trans-counter">
          {this.props.TransactionStore.getTransactionCount}
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <TransactionTitle
                className="trans-title"
                style={{ paddingLeft: '10px' }}
              >
                {T.translate('transaction.list')}:
              </TransactionTitle>
            </div>
          </div>
        </div>
        <Seperator />
        <div
          className="scrollbar scrollbar-primary transaction-list-top"
          style={{
            overflowY: 'auto',
            maxHeight: '340px',
            minHeight: '340px',
          }}
        >
          <div className="container">
            {Array.from(this.props.TransactionStore.getTransactionList.values())
              .sort((a, b) => b.time - a.time)
              .map(transaction => (
                <ItemContainer className="row" key={uuidv1()}>
                  <Transaction {...transaction} />
                </ItemContainer>
              ))}
          </div>
        </div>
      </TransactionListContainer>
    )
  }
}
