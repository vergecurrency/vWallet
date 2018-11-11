import React from 'react'
import styled from 'styled-components'
import Step from '../Step'
import { Link } from 'react-router-dom'
import crypto from 'crypto'
import Wallet from '../../crypto/Wallet'

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

const PasswordHint = styled.div`
  color: #506f89;
  font-size: 16px;
  font-style: italic;
  font-weight: 100;
  line-height: 30px;
  margin-top: 30px;
`

export default class ConfirmPassword extends React.Component {
  constructor(props) {
    super(props)
    this.state = { confirm: '', ...props.history.location.state }
  }

  updateConfirm(e) {
    this.setState({ confirm: e.target.value })
  }

  render() {
    const fullfillsRequirements =
      crypto
        .createHash('sha256')
        .update(this.state.confirm)
        .digest('base64') === this.state.password

    return (
      <Step
        title={'Confirm your password.'}
        subtitle={'Enter your password again.'}
        small
        step="/wallet/create/confirm"
      >
        <div>
          <input
            className="tour-input"
            type="password"
            placeholder="Enter a strong password"
            value={this.state.confirm}
            onChange={this.updateConfirm.bind(this)}
          />
          {fullfillsRequirements ? (
            <Link
              to={{
                pathname: '/buyhelp',
              }}
              onClick={async () => {
                if (fullfillsRequirements) {
                  const result = await Wallet.createNewWallet(
                    this.state.confirm,
                  )
                }
              }}
            >
              <NewButton>Continue</NewButton>
            </Link>
          ) : (
            <DisabledButton>Continue</DisabledButton>
          )}
        </div>
        <PasswordHint>
          This password is very important. If you lock your wallet, and you
          forgot your password,
          <br /> you won’t be able to unlock it, which means your funds are
          locked.
        </PasswordHint>
      </Step>
    )
  }
}
