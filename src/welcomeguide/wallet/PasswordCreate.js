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
  font-weight: 400;
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

const PasswordField = styled.input`
  width: 600px;
  height: 78px;
  border-radius: 4px;
  background-color: #ffffff;
  color: #9ba8ab;
  font-family: 'Avenir Next';
  font-size: 28px;
  font-style: italic;
  line-height: 78px;
  padding-left: 40px;
  padding-top: 30px;
  padding-bottom: 30px;
  margin-right: 30px;
`

const PasswordHelper = styled.div`
  display: flex;
  margin-left: 190px;
  margin-top: 30px;
`

const Tip = styled.span`
  color: #506f89;
  font-size: 16px;
  font-style: italic;
  margin-left: 11px;
  margin-right: 30px;
`

const checkLength = pass => pass.length >= 8

const checkUpperLowerCase = pass => /[a-z]+/.test(pass) && /[A-Z]+/.test(pass)

const checkForSpecial = pass =>
  /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(pass)

const checkedOrNot = (func, pass) =>
  func(pass) ? (
    <CheckCircle width="24px" height="24px" />
  ) : (
    <CrossCircle width="24px" height="24px" />
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
        history={this.props.history}
      >
        <div>
          <PasswordField
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
              <NewButton>Contiune</NewButton>
            </Link>
          ) : (
            <DisabledButton>Contiune</DisabledButton>
          )}
        </div>
        <PasswordHelper>
          {checkedOrNot(checkLength, this.state.password)}
          <Tip>min. 8 characters</Tip>
          {checkedOrNot(checkUpperLowerCase, this.state.password)}
          <Tip>Uppercase and lowercase characters</Tip>
          {checkedOrNot(checkForSpecial, this.state.password)}
          <Tip>Special character (!.,-#€%&+#)</Tip>
        </PasswordHelper>
      </Step>
    )
  }
}
