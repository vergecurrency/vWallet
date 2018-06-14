import { Button, Col, Container, Input, Row } from 'reactstrap'
import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import Modal from '../Modal'
import T from 'i18n-react'
import styled from 'styled-components'

const Title = styled.p`
  color: #476b84;
  font-size: 18px;
  font-weight: 400;
  line-height: 20px;
`

const InputHandler = styled.input`
  box-shadow: ${props => {
    console.log(props)
    return props.unlocked
      ? 'inset 0 1px 4px rgba(0, 0, 0, 0.09)'
      : 'inset 0 0px 4px rgba(220,43,61,0.5);'
  }};
  border-radius: 3px;
  border: 1px solid
    ${props => (props.unlocked ? '#dcdcdc' : 'rgba(220,43,61,1);')};
  color: #9e9e9e;
  font-size: 14px;
  font-style: italic;
  height: 45px;
  padding: 15px;
`

const FalseInputHandler = styled.p`
  color: rgba(220, 43, 61, 1);
  font-size: 12px;
  font-weight: 400;
  line-height: 30px;
  font-style: italic;
`

const SubTitle = styled.p`
  color: #909090;
  font-size: 12px;
  font-weight: 400;
  line-height: 30px;
`
const UnlockButton = styled.button`
  width: 460px;
  height: 62px;
  border-radius: 4px;
  background-color: #00b8dc;
  border: 0;
  box-shadow: none;
  color: #ffffff;
  font-size: 18px;
  font-weight: 400;
  line-height: 29.02px;
`

class Unlock extends Component {
  state = {
    password: '',
    unlocked: true,
  }

  unlocking(e) {
    e.preventDefault()
    this.props.AccountInformationStore.unlockWallet(this.state.password)
      .then(unlocked => {
        this.setState({ unlocked, password: '' })
        if (unlocked) this.props.toggle()
      })
      .catch(() => {
        this.setState({ unlocked: false, password: '' })
      })
  }

  render() {
    return (
      <Modal {...this.props} title={T.translate('unlock.title')}>
        <form onSubmit={this.unlocking.bind(this)}>
          <Title>{T.translate('unlock.inputTitle')}</Title>
          <InputHandler
            unlocked={this.state.unlocked}
            type="password"
            id="passphrase"
            style={{ width: '460px' }}
            value={this.state.password}
            onChange={e =>
              this.setState({ unlocked: true, password: e.target.value })
            }
          />
          {this.state.unlocked ? (
            <SubTitle>{T.translate('unlock.info')}</SubTitle>
          ) : (
            <FalseInputHandler>
              The password you entered was incorrect.
            </FalseInputHandler>
          )}
          <UnlockButton type="submit" onClick={this.unlocking.bind(this)}>
            {T.translate('unlock.button')}
          </UnlockButton>
        </form>
      </Modal>
    )
  }
}

export default inject('AccountInformationStore')(observer(Unlock))
