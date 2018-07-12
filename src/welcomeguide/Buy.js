import React from 'react'
import styled from 'styled-components'
import Step from './Step'
import { Link } from 'react-router-dom'
import { shell } from 'electron'

const LinkInfo = styled.div`
  color: #456884;
  font-size: 14px;
  font-weight: 400;
  line-height: 33.78px;
  padding-right: 402px;
  margin-top: 10px;
`

export default props => {
  return (
    <Step
      title={'Buy and deposit XVG'}
      subtitle={'See our `Get Started` guide on how to buy XVG.'}
      small
      step="/buyhelp"
    >
      <div>
        <button
          className="tour-primary-button"
          onClick={() =>
            shell.openExternal('https://vergecurrency.com/get-started/')
          }
        >
          Open the Guide
        </button>

        <Link to="/finalize">
          <button className="tour-secondary-button">Continue</button>
        </Link>
        <LinkInfo>Opens a new link in your browser</LinkInfo>
      </div>
    </Step>
  )
}
