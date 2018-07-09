import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import Modal from '../Modal'
import UnlockIcon from 'react-material-icon-svg/dist/LockOpenIcon'
import T from 'i18n-react'

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

  modalToggled() {
    this.props.toggle()
    this.setState({ unlocked: true, password: '' })
  }

  render() {
    return (
      <Modal {...this.props} title={T.translate('unlock.title')} toggle={this.modalToggled.bind(this)}>
        <form onSubmit={this.unlocking.bind(this)}>
          <label className="form-label" htmlFor="passphrase">{T.translate('unlock.inputTitle')}</label>
          <input
            id="passphrase"
            className={this.state.unlocked ? 'form-input' : 'form-input form-input-invalid animation-shake'}
            type="password"
            value={this.state.password}
            onChange={e =>
              this.setState({ unlocked: true, password: e.target.value })
            }
          />
          {this.state.unlocked ? (
            <p className="form-input-help">{T.translate('unlock.info')}</p>
          ) : (
            <p className="form-input-help form-input-help-invalid">{T.translate('unlock.wrongpass')}</p>
          )}
          <button
            className="btn-lg"
            type="submit"
            onClick={this.unlocking.bind(this)}
            style={{
              marginBottom: '15px'
            }}>
            <UnlockIcon
              width={22}
              height={22}
              style={{ fill: '#fff', marginRight: '5px' }}
            />
            {T.translate('unlock.button')}
          </button>
        </form>
      </Modal>
    )
  }
}

export default inject('AccountInformationStore')(observer(Unlock))
