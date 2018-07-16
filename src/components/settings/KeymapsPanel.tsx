import * as React from 'react'
import * as uuid from 'uuid'
import AppleKeyboardCommand from 'react-material-icon-svg/dist/AppleKeyboardCommandIcon'
import Keymap from './keymaps/Keymap'
import { SettingsStore } from '../../stores/SettingsStore'
import { translate, Trans } from 'react-i18next'
import { inject, observer } from 'mobx-react'
import { i18n } from '../../../node_modules/@types/i18next'

interface SettingsPanelProps {
  SettingsStore?: SettingsStore
  i18n: i18n
}

class KeymapsPanel extends React.Component<SettingsPanelProps> {
  getKeyMaps() {
    return [
      {
        name: this.props.i18n.t('settings.shortkey.quicksend.name'),
        keyName: 'CTRL/CMD + S',
        usage: this.props.i18n.t('settings.shortkey.quicksend.usage'),
      },
      {
        name: this.props.i18n.t('settings.shortkey.hideinformation.name'),
        keyName: 'CTRL/CMD + H',
        usage: this.props.i18n.t('settings.shortkey.hideinformation.usage'),
      },
      {
        name: this.props.i18n.t('settings.shortkey.lockwallet.name'),
        keyName: 'CTRL/CMD + L',
        usage: this.props.i18n.t('settings.shortkey.lockwallet.usage'),
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
          <Trans i18nKey={'settings.keymap'} />
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

export default translate('translations')(
  inject('SettingsStore')(observer(KeymapsPanel)),
)
