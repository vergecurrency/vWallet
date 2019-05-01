import * as React from 'react'

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'reactstrap'
import { inject, observer } from 'mobx-react'

import { SettingsStore } from '../../../stores/SettingsStore'
import { translate, Trans } from 'react-i18next'
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
      <div className="row setting">
        <div className="col-md-4 setting-label">
          <Trans i18nKey={'settings.currency.name'} />
        </div>
        <div className="col-md-2">
          <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle caret>
              {this.props.SettingsStore!.getCurrency}
            </DropdownToggle>
            <DropdownMenu>
              {locales.map(locale => (
                <DropdownItem
                  key={locale.locale}
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
                    (
                    {new Intl.NumberFormat(locale.locale, {
                      style: 'currency',
                      currency: locale.currency,
                      minimumFractionDigits: 2,
                      // the default value for minimumFractionDigits depends on the currency
                      // and is usually already 2
                    }).format(1234567.089)}
                    )
                  </em>
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>{' '}
        </div>
        <div className="col-md-6 setting-description">
          <Trans i18nKey={'settings.currency.explain'} />
        </div>
      </div>
    )
  }
}

export default translate('translations')(
  inject('SettingsStore')(observer(CurrencySetting)),
)
