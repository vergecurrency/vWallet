import React from 'react'
import Step from './Step'
import { Link } from 'react-router-dom'
import i18nReact from 'i18n-react'
import * as PropTypes from 'prop-types'
import Translate from '../translations/Translate'
const title = () => {
  return (
    <span>
      <Translate text={'tour.welcome.hello'} />{' '}
      <span style={{ color: 'white' }}>fella.</span>
    </span>
  )
}

class Welcome extends React.Component {
  render() {
    return (
      <Step
        title={title()}
        subtitle={'Lets set up your XVG wallet.'}
        step="/welcome"
      >
        <div>
          <Link to="/wallet/create">
            <button className="tour-primary-button">Create new wallet</button>
          </Link>
          <Link to="/wallet/restore">
            <button className="tour-secondary-button">
              Restore your wallet
            </button>
          </Link>
        </div>
      </Step>
    )
  }
}

export default Welcome
