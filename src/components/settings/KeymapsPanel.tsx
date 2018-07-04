import * as React from 'react'
import * as uuid from 'uuid'
import AppleKeyboardCommand from 'react-material-icon-svg/dist/AppleKeyboardCommandIcon'
import Keymap from './keymaps/Keymap'
import { SettingsStore } from '../../stores/SettingsStore'
import i18nReact from 'i18n-react'
import { inject, observer } from 'mobx-react'

interface SettingsPanelProps {
  SettingsStore?: SettingsStore
}

class KeymapsPanel extends React.Component<SettingsPanelProps> {
  getKeyMaps() {
    return [
      {
        name: i18nReact.translate('settings.shortkey.quicksend.name'),
        keyName: 'CTRL/CMD + S',
        usage: i18nReact.translate('settings.shortkey.quicksend.usage'),
      },
      {
        name: i18nReact.translate('settings.shortkey.hideinformation.name'),
        keyName: 'CTRL/CMD + H',
        usage: i18nReact.translate('settings.shortkey.hideinformation.usage'),
      },
      {
        name: i18nReact.translate('settings.shortkey.lockwallet.name'),
        keyName: 'CTRL/CMD + L',
        usage: i18nReact.translate('settings.shortkey.lockwallet.usage'),
      },
    ]
  }

  render() {
    return (
      <div className="container-fluid panel">
        <div className="panel-title">
          <AppleKeyboardCommand
            width={30}
            height={30}
            style={{ fill: '#003b54', marginRight: '10px' }}
          />{' '}
          {i18nReact.translate('settings.keymap')}
        </div>
        <div className="row">
          <div className="panel-body">
            {this.getKeyMaps().map(keyItem => (
              <Keymap key={uuid()} {...keyItem} />
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default inject('SettingsStore')(observer(KeymapsPanel))
