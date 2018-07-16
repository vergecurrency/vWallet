import * as React from 'react'
import * as QRCodeReact from 'qrcode.react'
import { observer, inject } from 'mobx-react'
import Modal from '../Modal'
import { translate, Trans } from 'react-i18next'
import { clipboard } from 'electron'

import { AccountInformationStore } from '../../stores/AccountInformationStore'
import { i18n } from '../../../node_modules/@types/i18next'

export interface ReceiveProps {
  open: boolean
  toggle: () => void
  AccountInformationStore?: AccountInformationStore
  i18n: i18n
}

export interface ReceiveState {
  isLoadingAddress: boolean
  address: string
  addressCopied: boolean
}

class ReceivePanel extends React.Component<ReceiveProps, ReceiveState> {
  state = {
    isLoadingAddress: false,
    address: '',
    addressCopied: false,
  }

  constructor(props) {
    super(props)

    this.createNewAddress()
  }

  createNewAddress() {
    this.setState({
      isLoadingAddress: true,
    })
    this.props
      .AccountInformationStore!.receiveNewAddress()
      .then(address =>
        this.setState({ address: address as string, isLoadingAddress: false }),
      )
  }

  copyAddress() {
    clipboard.writeText(this.state.address)
    this.setState({ addressCopied: true })
    setTimeout(() => {
      this.setState({ addressCopied: false })
    }, 2000)
  }

  render() {
    const title: string = this.props.i18n!.t('receivePanel.title') as string
    return (
      <Modal {...this.props} title={title}>
        <div className="receive-container">
          <div className="receive-qr-code-container">
            {!this.state.addressCopied && (
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
            )}
            {this.state.addressCopied && (
              <div className="receive-address-copied-panel animation-fade">
                <div className="receive-address-copied-check">
                  <i className="fas fa-check fa-3x" />
                </div>
                <div className="receive-address-copied-label">
                  <Trans i18nKey={'receivePanel.addressCopyConfirm'} />
                </div>
              </div>
            )}
          </div>
          <div>
            <label className="form-label">
              <Trans i18nKey={'receivePanel.address'} />
            </label>
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
              <button
                className="form-input-group-append"
                onClick={this.copyAddress.bind(this)}
              >
                <i className="fas fa-copy" />
              </button>
            </div>
            <p className="form-input-help">
              <Trans i18nKey={'receivePanel.generate'} />
            </p>
            <div className="form-separator" />
            <p className="form-input-help send-disclaimer">
              <Trans i18nKey={'receivePanel.disclaimer'} />
            </p>
          </div>
        </div>
      </Modal>
    )
  }
}

export default translate()(
  inject('AccountInformationStore')(observer(ReceivePanel)),
)
