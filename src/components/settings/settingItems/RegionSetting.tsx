import * as React from 'react'

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'reactstrap'
import { inject, observer } from 'mobx-react'

import i18nReact from 'i18n-react'

const locales = [
  {
    name: 'German',
    localeId: 'de',
  },
  {
    name: 'English',
    localeId: 'en',
  },
  {
    name: 'Dansk',
    localeId: 'da',
  },
  {
    name: 'Nederlands',
    localeId: 'nl',
  },
]

class RegionSetting extends React.Component<any, { dropdownOpen: boolean }> {
  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this)
    this.state = {
      dropdownOpen: false,
    }
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    })
  }

  render() {
    return (
      <div className="row setting">
        <div className="col-md-4 setting-label">
          {i18nReact.translate('settings.region.name')}
        </div>
        <div className="col-md-2">
          <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle caret>
              {this.props.SettingsStore.getName}
            </DropdownToggle>
            <DropdownMenu>
              {locales.map(locale => (
                <DropdownItem
                  key={locale.localeId}
                  onClick={() => {
                    this.props.SettingsStore.setSettingOption({
                      key: 'name',
                      value: locale.name,
                    })
                    this.props.SettingsStore.setSettingOption({
                      key: 'localeId',
                      value: locale.localeId,
                    })
                  }}
                >
                  {locale.name}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>{' '}
        </div>
        <div className="col-md-6 setting-description">
          {i18nReact.translate('settings.region.explain')}
        </div>
      </div>
    )
  }
}

export default inject('SettingsStore')(observer(RegionSetting))
