import * as React from 'react'
import * as QRCodeReact from 'qrcode.react'
import { observer, inject } from 'mobx-react'
import Modal from '../Modal'
import i18nReact from 'i18n-react'
import { clipboard } from 'electron'

import { AccountInformationStore } from '../../stores/AccountInformationStore'

class ReceivePanel extends React.Component<{
  open: boolean
  toggle: () => void
  AccountInformationStore?: AccountInformationStore
}> {
  state: {
    isLoadingAddress: boolean
    address: string
    addressCopied: boolean
  } = {
    isLoadingAddress: false,
    address: '',
    addressCopied: false,
  }

  createNewAddress() {
    this.setState({
      isLoadingAddress: true,
    })
    this.props
      .AccountInformationStore!.receiveNewAddress()
      .then(address => this.setState({ address, isLoadingAddress: false }))
  }

  copyAddress() {
    clipboard.writeText(this.state.address)
    this.setState({ addressCopied: true })
    setTimeout(
      () => {
        this.setState({ addressCopied: false })
      },
      2000,
    )
  }

  render() {
    const title: string = i18nReact.translate('receivePanel.title') as string
    return (
      <Modal
        {...this.props}
        title={title}
      >
        <div className="receive-container">
          <div className="receive-qr-code-container">
            {!this.state.addressCopied &&
              <div className="receive-qr-code-panel animation-fade">
                <QRCodeReact
                  className="receive-qr-code"
                  value={this.state.address}
                  size={183}
                  bgColor={'#ffffff'}
                  fgColor={'#152f36'}
                  level={'M'}
                />
              </div>
            }
            {this.state.addressCopied &&
              <div className="receive-address-copied-panel animation-fade">
                <div className="receive-address-copied-check">
                  <i className="fas fa-check fa-3x"/>
                </div>
                <div className="receive-address-copied-label">
                  {i18nReact.translate('receivePanel.addressCopyConfirm')}
                </div>
              </div>
            }
          </div>
          <div>
            <label className="form-label">{i18nReact.translate('receivePanel.address')}</label>
            <div className="form-input-group">
              <input
                className="form-input"
                onChange={() => {}}
                value={this.state.address}
              />
              <button
                className="form-input-group-append"
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
              <button className="form-input-group-append" onClick={this.copyAddress.bind(this)}>
                <i className="fas fa-copy"/>
              </button>
            </div>
            <p className="form-input-help">{ i18nReact.translate('receivePanel.generate') }</p>
            <div className="form-separator" />
            <p className="form-input-help send-disclaimer">
              { i18nReact.translate('receivePanel.disclaimer') }
            </p>
          </div>
        </div>
      </Modal>
    )
  }
}

export default inject('AccountInformationStore')(observer(ReceivePanel))
