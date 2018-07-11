import React from 'react'
import styled from 'styled-components'
import Step from './Step'
import { Link } from 'react-router-dom'

const NewButton = styled.button`
  border-radius: 4px;
  background-color: #00b8dc;
  box-shadow: none;
  color: #fff;
  border: none;
  width: 374px;
  height: 72px;
  font-size: 26px;
  font-weight: 500;
  line-height: 33.78px;
  margin-right: 50px;
`

const RestoreButton = styled.button`
  border-radius: 4px;
  border: 3px solid #ffffff;
  background-color: transparent;
  box-shadow: none;
  color: #fff;
  width: 374px;
  height: 72px;
  font-size: 26px;
  font-weight: 500;
  line-height: 33.78px;
`

const title = () => {
  return (
    <span>
      Hello <span style={{ color: 'white' }}>fella.</span>
    </span>
  )
}

export default props => {
  return (
    <Step title={title()} subtitle={'Lets set up your XVG wallet.'}>
      <div>
        <Link to="/wallet/create">
          <NewButton>Create new wallet</NewButton>
        </Link>
        <Link to="/wallet/restore">
          <RestoreButton>Restore your wallet</RestoreButton>
        </Link>
      </div>
    </Step>
  )
}
