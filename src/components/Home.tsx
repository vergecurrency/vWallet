// @flow
import * as React from 'react'

import Footer from './Footer'
import PriceUpdater from './PriceUpdater'
import Statistics from './Statistics'
import TransactionList from './transaction/TransactionList'

const Home = () => (
  <div>
    <TransactionList />
    <Statistics />
    <PriceUpdater />
    <Footer />
  </div>
)

export default Home
