import React from 'react'
import { TitleBar } from 'electron-react-titlebar'
import logo from '../assets/images/verge-logo-white.png'
import createProgressSteps from './ProgressBar'
import { platform } from 'os'
import { observer, inject } from 'mobx-react'
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'reactstrap'
import locales from '../translations/locales'
import { translate } from 'react-i18next'

class Step extends React.Component {
  constructor() {
    super()
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
    const {
      SettingsStore,
      title,
      subtitle,
      small,
      component,
      step,
      ...props
    } = this.props

    return (
      <div style={{ height: '100%' }}>
        <TitleBar menu={[]} className={platform()} />
        <div className="tour-background">
          <div className="language-switch">
            <Dropdown
              isOpen={this.state.dropdownOpen}
              toggle={this.toggle.bind(this)}
            >
              <DropdownToggle caret>
                {SettingsStore.getLocaleId.toUpperCase()}
              </DropdownToggle>
              <DropdownMenu>
                {locales.map(locale => (
                  <DropdownItem
                    key={locale.localeId}
                    onClick={() => {
                      SettingsStore.setSettingOption({
                        key: 'name',
                        value: locale.name,
                      })
                      SettingsStore.setSettingOption({
                        key: 'localeId',
                        value: locale.localeId,
                      })
                      this.props.i18n.changeLanguage(locale.localeId)
                    }}
                  >
                    {locale.localeId.toUpperCase()}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
          {title && (
            <p className={!small ? 'tour-title' : 'tour-title-small'}>
              {title}
            </p>
          )}
          {subtitle && <p className="tour-subtitle">{subtitle}</p>}
          {props.children}
          <div className="tour-verge-logo">
            <img src={logo} width="125px" />
          </div>
          {step ? (
            <div className="tour-progress">{createProgressSteps(step)}</div>
          ) : null}
        </div>
      </div>
    )
  }
}

export default translate('translations')(
  inject('SettingsStore')(observer(Step)),
)
