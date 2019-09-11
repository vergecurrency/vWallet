import * as React from 'react'
import { Link } from 'react-router-dom'
import Step from '../Step'
import * as crypto from 'crypto'
import styledComponents from 'styled-components'

import CheckCircle from '../../icons/CheckCircle'
import CrossCircle from '../../icons/CrossCircle'
import { PrimaryButton } from '../../base-components/PrimaryButton'
import { DisabledButton } from '../../base-components/DisabledButton'

const PasswordHelper = styledComponents.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  margin-top: 30px;
`

const Hint = styledComponents.span`
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

export default class PasswordCreate extends React.Component {
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
              <PrimaryButton>Continue</PrimaryButton>
            </Link>
          ) : (
            <DisabledButton>Continue</DisabledButton>
          )}
        </div>
        <PasswordHelper>
          {checkedOrNot(checkLength, this.state.password)}
          <Hint>Min. 8 characters</Hint>
          {checkedOrNot(checkUpperLowerCase, this.state.password)}
          <Hint>Uppercase and lowercase characters</Hint>
          {checkedOrNot(checkForSpecial, this.state.password)}
          <Hint>Special character (!.,-#€%&+#)</Hint>
        </PasswordHelper>
      </Step>
    )
  }
}
