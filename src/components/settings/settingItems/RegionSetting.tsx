import * as React from 'react'

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'reactstrap'
import { inject, observer } from 'mobx-react'

import i18nReact from 'i18n-react'
import styledComponents from 'styled-components'

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

const Row = styledComponents.div`
  display: flex;
  align-content: center;
  align-items: center;
  height: 75px;
`

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
      <Row className="row">
        <div className="col-md-4">
          <span
            style={{
              color: '#476b84',
              fontSize: 18,
              fontWeight: 500,
            }}
          >
            {i18nReact.translate('settings.region.name')}
          </span>
        </div>
        <div className="col-md-2">
          <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle
              caret
              style={{
                backgroundColor: 'transparent',
                border: '1 solid #dcdcdc',
                boxShadow: 'inset 0 1 4 rgba(0, 0, 0, 0.09)',
                margin: '0 auto',
                color: '#5b5a5a',
              }}
            >
              {this.props.SettingsStore.getName}
            </DropdownToggle>
            <DropdownMenu>
              {locales.map(locale => (
                <DropdownItem
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
        <div className="col-md-6">
          <span
            style={{
              color: '#647e90',
              fontSize: 15,
              fontStyle: 'italic',
            }}
          >
            {i18nReact.translate('settings.region.explain')}
          </span>
        </div>
      </Row>
    )
  }
}

export default inject('SettingsStore')(observer(RegionSetting))
