import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import T from 'i18n-react'

export default class StealthSwitch extends PureComponent {
  static propTypes = {
    SettingsStore: PropTypes.object.isRequired,
    updateStealth: PropTypes.func.isRequired,
  }

  render() {
    return (
      <div
        className="col-md-1"
        style={{ paddingTop: '16px', marginRight: '60px' }}
      >
        <label className="switch" style={{ width: '120px' }}>
          <input
            type="checkbox"
            checked={this.props.SettingsStore.getDarkTheme}
            onChange={this.updateStealth}
          />
          <span
            className="slider round"
            style={{
              fontSize: 12,
              textAlign: this.props.SettingsStore.getDarkTheme
                ? 'left'
                : 'right',
              paddingTop: '8px',
              paddingLeft: '10px',
              paddingRight: '10px',
            }}
          >
            {this.props.SettingsStore.getDarkTheme
              ? 'Stealth ' + T.translate('header.on')
              : 'Stealth ' + T.translate('header.off')}
          </span>
        </label>
      </div>
    )
  }
}
