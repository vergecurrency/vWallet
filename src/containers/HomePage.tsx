import * as React from 'react'

import Footer from '../components/Footer'
import Statistics from '../components/Statistics'
import TransactionList from '../components/transaction/TransactionList'

class HomePage extends React.Component {
  render() {
    return (
      <div className="content-container-wrapper content-container-wrapper-full">
        <div className="content-container-row content-container-row-grow padding-bottom">
          <TransactionList />
          <Statistics />
        </div>
        <div className="content-container-row footer-container">
          <Footer />
        </div>
      </div>
    )
  }
}

export default HomePage
