import * as React from 'react'
import * as commandIcon from '../../assets/images/command.png'
import * as settingIcon from '../../assets/images/settings.png'
import * as uuid from 'uuid'

import { inject, observer } from 'mobx-react'

import CurrencySetting from './settingItems/CurrencySetting'
import Keymap from './keymaps/Keymap'
import RegionSetting from './settingItems/RegionSetting'
import { SettingsStore } from '../../stores/SettingsStore'
import i18nReact from 'i18n-react'
import styledComponents from 'styled-components'

const SettingPanel = styledComponents.div``

const KeymapPanel = styledComponents.div``

const Title = styledComponents.span`
  color: #003b54;
  font-size: 23px;
  font-weight: 500;
  line-height: 54.93px;
`

const TitleIcon = styledComponents.img`
  height: 24px;
  width: 24px;
  margin-right: 10px;
  margin-top: -5px;
`

const KeymapIcon = styledComponents.img`
  height: 20px;
  width: 20px;
  margin-right: 10px;
  margin-top: -5px;
`

const HeaderTitle = styledComponents.div`
  border-bottom: 1px solid #eeeeee;
`

interface SettingsPanelProps {
  SettingsStore?: SettingsStore
}

class SettingsPanel extends React.Component<SettingsPanelProps> {
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
      <div className="content-container-wrapper">
        <SettingPanel className="container-fluid panel">
          <HeaderTitle>
            <TitleIcon src={settingIcon} />
            <Title>{i18nReact.translate('settings.title')}</Title>
          </HeaderTitle>
          <div className="row">
            <div className="container-fluid">
              <CurrencySetting />
              <RegionSetting />
            </div>
          </div>
        </SettingPanel>
        <KeymapPanel className="container-fluid panel">
          <HeaderTitle>
            <KeymapIcon src={commandIcon} />
            <Title>{i18nReact.translate('settings.keymap')}</Title>
          </HeaderTitle>
          <div className="row">
            <div className="container-fluid">
              {this.getKeyMaps().map(keyItem => (
                <Keymap key={uuid()} {...keyItem} />
              ))}
            </div>
          </div>
        </KeymapPanel>
      </div>
    )
  }
}

export default inject('SettingsStore')(observer(SettingsPanel))
