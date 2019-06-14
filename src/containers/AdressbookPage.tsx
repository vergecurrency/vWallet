import * as React from 'react'

import AddressList from '../components/addressbook/AddressList'
import AbstractPage from './AbstractPage'

class Addressbook extends React.Component {
  render() {
    return (
      <AbstractPage>
        <div className="container-fluid panel">
          <AddressList />
        </div>
      </AbstractPage>
    )
  }
}

export default Addressbook
