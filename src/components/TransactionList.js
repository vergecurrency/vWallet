// @ts-check
import React, { Component } from 'react'
//import verge from 'node-verge'
import uuidv1 from 'uuid/v1'
import './TransactionList.css'
import Transaction from './Transaction'

import { inject, observer } from 'mobx-react'

//const vergeConnection = () => verge().auth('kyon', 'lolcat')

@inject('TransactionStore')
@observer
export default class TransactionList extends Component {
  componentDidMount() {
    /*vergeConnection().listTransactions((_, transactionList) => {
      this.props.TransactionStore.addTransactions(transactionList)
    })*/
  }

  render() {
    return (
      <div style={{ paddingTop: '5%', paddingBottom: '5%' }}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2 style={{ color: '#fff' }}>Transaction List:</h2>{' '}
            </div>
          </div>
        </div>
        <div className="scrollbar scrollbar-primary transaction-list-top">
          <div
            className="container"
            style={{ overflowY: 'scroll', height: '100%' }}
          >
            {this.props.TransactionStore.transactions
              .sort((a, b) => a.time <= b.time)
              .map(transaction => (
                <div className="row spacer" key={uuidv1()}>
                  <div className="col-md-8">
                    <Transaction {...transaction} />
                  </div>
                  <div className="col-md-4" style={{ textAlign: 'right' }}>
                    <p style={{ color: 'white' }}>{transaction.amount} XVG</p>
                    <p style={{ color: 'white' }}>
                      {transaction.confirmations} confirmations
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    )
  }
}
