import * as React from 'react'
import * as QRCodeReact from 'qrcode.react'
import { Container, Row, Col } from 'reactstrap'
import { observer, inject } from 'mobx-react'
import Modal from '../Modal'
import i18nReact from 'i18n-react'
import styledComponents from 'styled-components'

import { AccountInformationStore } from '../../stores/AccountInformationStore'

const Info = styledComponents.p`
  color: #152f36;
  margin-right: 15px;
`

class ReceivePanel extends React.Component<{
  open: boolean
  toggle: () => void
  AccountInformationStore?: AccountInformationStore
}> {
  state: {
    isLoadingAddress: boolean
    address: string
  } = {
    isLoadingAddress: false,
    address: '',
  }

  createNewAddress() {
    this.setState({
      isLoadingAddress: true,
    })
    this.props
      .AccountInformationStore!.receiveNewAddress()
      .then(address => this.setState({ address, isLoadingAddress: false }))
  }

  render() {
    const title: string = i18nReact.translate('receive.title') as string
    return (
      <Modal
        {...this.props}
        title={title}
        style={{ maxWidth: '630px', width: '630px' }}
      >
        <Container>
          <Row>
            <Col md={3}>
              <QRCodeReact
                value={this.state.address}
                size={128}
                bgColor={'#ffffff'}
                fgColor={'#152f36'}
                level={'L'}
              />
            </Col>
            <Col md={9}>
              <Container>
                <Row>
                  <Info>Address:</Info>
                </Row>
                <Row>
                  <div className="buttonInside">
                    <input
                      placeholder="Press to generate"
                      onChange={() => {}}
                      value={this.state.address}
                    />
                    <button
                      id="showPassword"
                      onClick={
                        !this.state.isLoadingAddress
                          ? () => this.createNewAddress()
                          : () => {}
                      }
                    >
                      <i
                        className={`fas fa-sync ${
                          this.state.isLoadingAddress ? 'fa-spin' : ''
                        }`}
                      />
                    </button>
                  </div>
                </Row>
              </Container>
            </Col>
          </Row>
        </Container>
      </Modal>
    )
  }
}

export default inject('AccountInformationStore')(observer(ReceivePanel))
