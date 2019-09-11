import * as React from 'react'
import styledComponents from 'styled-components'
import Step from '../Step'
import Wallet from '../../crypto/Wallet'

const MnemonicDiv = styledComponents.div`
    text-align: center;
    font-size: 32px;
    font-family: monospace;
    font-style: normal;
    margin: 30px 30%;
    color: white;
    background-color: rgba(0, 0, 0, 0.5);
    box-shadow: inset 0 0 10px #000000;
    border-radius: 10px;
    padding: 20px;
`

export default class Mnemonic extends React.Component<
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
    return (
      <Step
        title={'Save your mnemonic'}
        subtitle={'Please write this one down!'}
        small
        step="/wallet/mnemonic"
      >
        <MnemonicDiv>{Wallet.getMnemonic()}</MnemonicDiv>
      </Step>
    )
  }
}
