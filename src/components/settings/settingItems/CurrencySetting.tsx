import * as React from 'react'

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'reactstrap'
import { inject, observer } from 'mobx-react'

import { SettingsStore } from '../../../stores/SettingsStore'
import i18nReact from 'i18n-react'
import styledComponents from 'styled-components'

const locales = [
  {
    currency: 'EUR',
    locale: 'de-DE',
  },
  {
    currency: 'USD',
    locale: 'en-US',
  },
  {
    currency: 'DKK',
    locale: 'da-DK',
  },
]

const Row = styledComponents.div`
  display: flex;
  align-content: center;
  align-items: center;
  height: 75px;
`

interface CurrencySettingState {
  dropdownOpen: boolean
}

export class CurrencySetting extends React.Component<
  { SettingsStore?: SettingsStore },
  CurrencySettingState
> {
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
            {i18nReact.translate('settings.currency.name')}
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
              {this.props.SettingsStore!.getCurrency}
            </DropdownToggle>
            <DropdownMenu>
              {locales.map(locale => (
                <DropdownItem
                  onClick={() => {
                    this.props.SettingsStore!.setSettingOption({
                      key: 'currency',
                      value: locale.currency,
                    })
                    this.props.SettingsStore!.setSettingOption({
                      key: 'locale',
                      value: locale.locale,
                    })
                  }}
                >
                  {locale.currency}{' '}
                  <em>
                    ({new Intl.NumberFormat(locale.locale, {
                      style: 'currency',
                      currency: locale.currency,
                      minimumFractionDigits: 2,
                      // the default value for minimumFractionDigits depends on the currency
                      // and is usually already 2
                    }).format(1234567.089)})
                  </em>
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
            {i18nReact.translate('settings.currency.explain')}
          </span>
        </div>
      </Row>
    )
  }
}

export default inject('SettingsStore')(observer(CurrencySetting))
