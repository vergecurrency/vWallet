import * as React from 'react'
import styledComponents from 'styled-components'
import Step from '../Step'
import Wallet from '../../crypto/Wallet'
import { SmallPrimaryButton } from '../../base-components/PrimaryButton'
import { SmallDisabledButton } from '../../base-components/DisabledButton'
import { Link } from 'react-router-dom'

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

const MnemonicWordInput = styledComponents.input`
  font-weight: 500;
  padding: 5px 0;
  margin: 0 10px;
  color: #fff;
  background: none;
  border: none;
  border-bottom: 1px solid #fff;
`

const InputCheckContainer = styledComponents.div`
  margin-top: 5px;
  margin-bottom: 50px;
  font-size: 28px;
`

export default class Mnemonic extends React.Component<
  {},
  {
    checkForMnemonic: boolean
    inputs: string[]
    checkMnemonicWords: number[]
  }
> {
  constructor(props) {
    super(props)
    this.state = {
      checkForMnemonic: false,
      inputs: Array(3).fill(''),
      checkMnemonicWords: [],
    }
  }

  checkMnemonicStatus() {
    return this.state.inputs.every((inputMnemonic, index) => {
      const mnemonicId = this.state.checkMnemonicWords[index]
      const originalMnemonic = Wallet.getMnemonic().split(' ')[mnemonicId]
      return originalMnemonic === inputMnemonic
    })
  }

  renderCheckMnemonic() {
    return [
      this.state.checkMnemonicWords.map((id, index) => {
        return (
          <InputCheckContainer>
            #{id + 1}:
            <MnemonicWordInput
              type="text"
              onChange={e => {
                const inputs = this.state.inputs
                inputs[index] = e.target.value
                this.setState({ inputs })
              }}
            />
          </InputCheckContainer>
        )
      }),
      <div>
        <SmallPrimaryButton
          style={{ marginRight: '15px' }}
          onClick={() => {
            this.setState({ checkForMnemonic: false })
          }}
        >
          back
        </SmallPrimaryButton>
        {this.checkMnemonicStatus() && (
          <Link
            to={{
              pathname: '/buyhelp',
            }}
          >
            <SmallPrimaryButton>finalize</SmallPrimaryButton>
          </Link>
        )}
        {!this.checkMnemonicStatus() && (
          <SmallDisabledButton>finalize</SmallDisabledButton>
        )}
      </div>,
    ]
  }

  renderMnemonicInformation() {
    return (
      <div>
        <MnemonicDiv>{Wallet.getMnemonic()}</MnemonicDiv>
        <SmallPrimaryButton
          onClick={() => {
            const numberOfWords = Wallet.getMnemonic().split(' ').length
            const getRandomWordId = () =>
              Math.floor(Math.random() * numberOfWords)

            let mnemonicIds: number[] = []
            while (mnemonicIds.length < 3) {
              const randomId = getRandomWordId()
              if (mnemonicIds.indexOf(randomId) === -1) {
                mnemonicIds = [...mnemonicIds, randomId]
              }
            }

            this.setState({
              checkForMnemonic: true,
              checkMnemonicWords: mnemonicIds.sort((prev, next) => prev - next),
            })
          }}
        >
          check
        </SmallPrimaryButton>
      </div>
    )
  }

  render() {
    return (
      <Step
        title={'Save your mnemonic'}
        subtitle={
          !this.state.checkForMnemonic
            ? 'This your wallet seed, keep it safe.'
            : 'Double checking your mnemonic, fill in the following words:'
        }
        small
        step="/wallet/mnemonic"
      >
        {!this.state.checkForMnemonic && this.renderMnemonicInformation()}
        {this.state.checkForMnemonic && this.renderCheckMnemonic()}
      </Step>
    )
  }
}
