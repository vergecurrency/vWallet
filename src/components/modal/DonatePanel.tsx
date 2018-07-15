import * as React from 'react'
import { Col, Row } from 'reactstrap'
import Modal from '../Modal'
import { inject, observer } from 'mobx-react'
import Gift from 'react-material-icon-svg/dist/GiftIcon'
import i18nReact from 'i18n-react'

interface DonatePanelInterface {
  open: boolean
  toggle: () => void
}

class DonatePanel extends React.Component<DonatePanelInterface> {

  getLocaleId() {
    return 'NL'
  }

  getBalance() {
    return 4434
  }

  getPrice() {
    return 333
  }

  render() {
    const title: string = 'Donate'
    return (
      <Modal
        {...this.props}
        title={title}
        className="donate-modal"
      >
        <div className="donate-img-container">
          <Gift
            width={110}
            height={110}
            style={{ fill: '#d6dee2' }}
          />
        </div>
        <p className="donate-description">
          At Verge we are always striving to achieve new heights and deliver products
          or software implementations that are requested by the community.
          <br/><br/>
          Listening to our community members and taking in feedback is not only
          one of the core founding principles of Verge,
          but it is inherent in our open-source nature.
        </p>
        <div className="form-separator" />
        <label className="form-label">Your donation</label>
        <div className="form-input-group">
          <div className="form-input-group-prepend">XVG</div>
          <input
            className="form-input"
            placeholder="Every little XVG helps!"
            type="number"
          />
        </div>
        <p className="form-input-help">How much would like to donate to us?</p>
        <div className="form-separator"/>
        <div style={{ marginBottom: '20px' }}>
          <Row>
            <Col md="5">
              <div className="balance-title">
                {i18nReact.translate('sendPanel.xvgUSD')}
              </div>
              <div className="balance-value">
                ${(this.getBalance() * this.getPrice()).toLocaleString(
                this.getLocaleId(),
              )}
              </div>
            </Col>
            <Col md="7">
              <div className="balance-title">
                {i18nReact.translate('sendPanel.balanceXVG')}
              </div>
              <div className="balance-value">
                {this.getBalance().toLocaleString(this.getLocaleId())} XVG
              </div>
            </Col>
          </Row>
        </div>
        <button className="btn btn-lg" style={{ marginBottom: '15px' }}>
          <Gift
            width={22}
            height={22}
            style={{ fill: '#fff', marginRight: '5px' }}
          />
          Donate XVG
        </button>
      </Modal>
    )
  }
}

export default inject('AccountInformationStore')(observer(DonatePanel))