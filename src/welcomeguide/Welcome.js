import React from 'react'
import Step from './Step'
import { Link } from 'react-router-dom'

const title = () => {
  return (
    <span>
      Hello <span style={{ color: 'white' }}>fella.</span>
    </span>
  )
}

export default props => {
  return (
    <Step title={title()} subtitle={'Lets set up your XVG wallet.'} step="/welcome">
      <div>
        <Link to="/wallet/create">
          <button className="tour-primary-button">Create new wallet</button>
        </Link>
        <Link to="/wallet/restore">
          <button className="tour-secondary-button">Restore your wallet</button>
        </Link>
      </div>
    </Step>
  )
}
