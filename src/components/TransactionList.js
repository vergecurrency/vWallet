// @ts-check
import React, { Component } from 'react'
import uuidv1 from 'uuid/v1'
import Transaction from './Transaction'
import { inject, observer } from 'mobx-react'
import T from 'i18n-react'

@inject('TransactionStore')
@observer
export default class TransactionList extends Component {
  render() {
    return (
      <div className="transaction-list">
        <div className="trans-counter">
          {this.props.TransactionStore.transactions.length}
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="trans-title" style={{ paddingLeft: '10px' }}>
                {T.translate('transaction.list')}:
              </div>
            </div>
          </div>
        </div>
        <hr style={{ margin: '0px 0px' }} />
        <div
          className="scrollbar scrollbar-primary transaction-list-top"
          style={{
            overflowY: 'auto',
            maxHeight: '340px',
            minHeight: '340px',
          }}
        >
          <div className="container">
            {this.props.TransactionStore.transactions
              .sort((a, b) => a.time <= b.time)
              .map(transaction => (
                <div className="row spacer" key={uuidv1()}>
                  <Transaction {...transaction} />
                </div>
              ))}
          </div>
        </div>
      </div>
    )
  }
}
