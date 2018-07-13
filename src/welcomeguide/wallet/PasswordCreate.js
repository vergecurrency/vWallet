import React, { Component } from 'react'

import CheckCircle from '../../icons/CheckCircle'
import CrossCircle from '../../icons/CrossCircle'
import { Link } from 'react-router-dom'
import Step from '../Step'
import crypto from 'crypto'
import styled from 'styled-components'

const NewButton = styled.button`
  width: 192px;
  height: 95px;
  border-radius: 4px;
  background-color: #00b8dc;
  color: #fff;
  border: none;
  height: 78px;
  font-size: 27px;
  font-weight: 500;
  line-height: 33.78px;
`

const DisabledButton = styled.button`
  width: 192px;
  height: 95px;
  border-radius: 4px;
  background-color: #e9ecef;
  color: #2f363d;
  border: none;
  height: 78px;
  font-size: 27px;
  font-weight: 400;
  line-height: 33.78px;
`

const PasswordHelper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  margin-top: 30px;
`

const Tip = styled.span`
  color: #506f89;
  font-size: 13px;
  font-style: italic;
  font-weight: 100;
  margin-left: 11px;
  margin-right: 30px;
`

const checkLength = pass => pass.length >= 8

const checkUpperLowerCase = pass => /[a-z]+/.test(pass) && /[A-Z]+/.test(pass)

const checkForSpecial = pass =>
  /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(pass)

const checkedOrNot = (func, pass) =>
  func(pass) ? (
    <CheckCircle width="20px" height="20px" />
  ) : (
    <CrossCircle width="20px" height="20px" />
  )

export default class PasswordCreate extends Component {
  state = { password: '' }

  updatePassword(e) {
    this.setState({ password: e.target.value })
  }

  render() {
    const fullfillsRequirements =
      checkLength(this.state.password) &&
      checkUpperLowerCase(this.state.password) &&
      checkForSpecial(this.state.password)
    return (
      <Step
        title={'Create a password.'}
        subtitle={'Choose a password to secure your wallet.'}
        small
        step="/wallet/create"
      >
        <div>
          <input
            className="tour-input"
            type="password"
            placeholder="Enter a strong password"
            value={this.state.password}
            onChange={this.updatePassword.bind(this)}
          />
          {fullfillsRequirements ? (
            <Link
              to={{
                pathname: '/wallet/create/confirm',
                state: {
                  password: crypto
                    .createHash('sha256')
                    .update(this.state.password)
                    .digest('base64'),
                },
              }}
            >
              <NewButton>Continue</NewButton>
            </Link>
          ) : (
            <DisabledButton>Continue</DisabledButton>
          )}
        </div>
        <PasswordHelper>
          {checkedOrNot(checkLength, this.state.password)}
          <Tip>Min. 8 characters</Tip>
          {checkedOrNot(checkUpperLowerCase, this.state.password)}
          <Tip>Uppercase and lowercase characters</Tip>
          {checkedOrNot(checkForSpecial, this.state.password)}
          <Tip>Special character (!.,-#€%&+#)</Tip>
        </PasswordHelper>
      </Step>
    )
  }
}
