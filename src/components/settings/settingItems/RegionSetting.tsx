import * as React from 'react'

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'reactstrap'
import { inject, observer } from 'mobx-react'
import locales from '../../../translations/locales'
import { translate, Trans } from 'react-i18next'

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
          <Trans i18nKey={'settings.region.name'} />
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
                    this.props.i18n.changeLanguage(locale.localeId)
                  }}
                >
                  {locale.name}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>{' '}
        </div>
        <div className="col-md-6 setting-description">
          <Trans i18nKey={'settings.region.explain'} />
        </div>
      </div>
    )
  }
}

export default translate('translations')(
  inject('SettingsStore')(observer(RegionSetting)),
)
