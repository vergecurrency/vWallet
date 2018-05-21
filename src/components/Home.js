// @flow
import React, { Component } from 'react'

import Footer from './Footer'
import PriceUpdater from './PriceUpdater'
import Statistics from './Statistics'
import TransactionList from './transaction/TransactionList'

export default class Home extends Component {
  render() {
    return (
      <div>
        <TransactionList />
        <Statistics />
        <PriceUpdater />
        <Footer />
      </div>
    )
  }
}
