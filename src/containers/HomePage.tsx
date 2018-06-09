import * as React from 'react'

import Footer from '../components/Footer'
import PriceUpdater from '../components/PriceUpdater'
import Statistics from '../components/Statistics'
import TransactionList from '../components/transaction/TransactionList'

class HomePage extends React.Component {
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

export default HomePage
