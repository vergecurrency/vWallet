import * as React from 'react'
import styledComponents from 'styled-components'
import Step from '../Step'
import { Link } from 'react-router-dom'
import * as crypto from 'crypto'
import Wallet from '../../crypto/Wallet'
import { PrimaryButton } from '../../base-components/PrimaryButton'
import { DisabledButton } from '../../base-components/DisabledButton'

const PasswordHint = styledComponents.div`
  color: #506f89;
  font-size: 16px;
  font-style: italic;
  font-weight: 100;
  line-height: 30px;
  margin-top: 30px;
`

export default class ConfirmPassword extends React.Component<
  {},
  { confirm: string; password: string }
> {
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
                pathname: '/wallet/mnemonic',
              }}
              onClick={async () => {
                if (fullfillsRequirements) {
                  await Wallet.createNewWallet(this.state.confirm)
                }
              }}
            >
              <PrimaryButton>Continue</PrimaryButton>
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
