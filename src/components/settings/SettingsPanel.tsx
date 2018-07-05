import * as React from 'react'

import { inject, observer } from 'mobx-react'

import SettingsOutline from 'react-material-icon-svg/dist/SettingsOutlineIcon'
import CurrencySetting from './settingItems/CurrencySetting'
import RegionSetting from './settingItems/RegionSetting'
import { SettingsStore } from '../../stores/SettingsStore'
import i18nReact from 'i18n-react'

interface SettingsPanelProps {
  SettingsStore?: SettingsStore
}

class SettingsPanel extends React.Component<SettingsPanelProps> {
  render() {
    return (
      <div className="container-fluid panel">
          <div className="panel-title">
              <SettingsOutline
                  width={30}
                  height={30}
                  style={{ fill: '#003b54', marginRight: '10px' }}
              />{' '}
            {i18nReact.translate('settings.title')}
          </div>
          <div className="row">
              <div className="panel-body">
                  <CurrencySetting />
                  <RegionSetting />
              </div>
          </div>
      </div>
    )
  }
}

export default inject('SettingsStore')(observer(SettingsPanel))
