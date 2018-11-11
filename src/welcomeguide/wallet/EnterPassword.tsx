import * as React from 'react'
import * as styled from 'styled-components'
import Step from '../Step'

import { inject } from 'mobx-react'
import { AccountInformationStore } from '../../stores/AccountInformationStore'
import { Link } from 'react-router-dom'

const NewButton = styled.default.button`
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

const PasswordHint = styled.default.div`
  color: #506f89;
  font-size: 16px;
  font-style: italic;
  font-weight: 100;
  line-height: 30px;
  margin-top: 30px;
`

class EnterPassword extends React.Component<{
  AccountInformationStore?: AccountInformationStore
}> {
  state: { confirm: string } = {
    confirm: '',
  }

  constructor(props) {
    super(props)
  }

  updateConfirm(e) {
    this.setState({ confirm: e.target.value })
  }

  render() {
    return (
      <Step title={'Welcome!'} subtitle={' '} small>
        <div>
          <input
            className="tour-input"
            type="password"
            placeholder="Enter your password"
            value={this.state.confirm}
            onChange={this.updateConfirm.bind(this)}
          />
          <Link
            to="/#"
            onClick={async () => {
              await this.props.AccountInformationStore!.unlockWallet(
                this.state.confirm,
              )
            }}
          >
            <NewButton>Login</NewButton>
          </Link>
        </div>
        <PasswordHint>
          This password has been set while creating your wallet. <br />
          We cannot restore your password, nor your private keys. (keep it safe)
        </PasswordHint>
      </Step>
    )
  }
}

export default inject('AccountInformationStore')(EnterPassword)
