import * as React from 'react'

import { Dropdown, DropdownMenu, DropdownToggle } from 'reactstrap'
import { inject, observer } from 'mobx-react'

import { AccountInformationStore } from '../../stores/AccountInformationStore'
import BurgerMenu from './BurgerMenu'
import Lock from 'react-material-icon-svg/dist/Lock'
import Logout from '../../icons/Logout'
import Notification from '../../icons/Notification'
import NotificationLayer from './NotificationLayer'
import { SettingsStore } from '../../stores/SettingsStore'
import { translate } from 'react-i18next'
import { i18n } from '../../../node_modules/@types/i18next'
import UnlockPanel from '../modal/UnlockPanel'
import { Link } from 'react-router-dom'
import WifiIcon from 'react-material-icon-svg/dist/Wifi'
import WifiOffIcon from 'react-material-icon-svg/dist/WifiOff'

interface HeaderState {
  dropdownOpen: boolean
  modal: boolean
  dropdownOpenNotifiaction: boolean
}

interface HeaderProps {
  AccountInformationStore?: AccountInformationStore
  SettingsStore?: SettingsStore
  i18n?: i18n
}

class Header extends React.Component<HeaderProps, HeaderState> {
  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this)
    this.toggleUnlock = this.toggleUnlock.bind(this)
    this.updateStealth = this.updateStealth.bind(this)
    this.toggleNotification = this.toggleNotification.bind(this)
    this.state = {
      dropdownOpen: false,
      modal: false,
      dropdownOpenNotifiaction: false,
    }
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    })
  }

  toggleUnlock() {
    this.setState({
      modal: !this.state.modal,
    })
  }

  getConnectionInfo() {
    return this.props.AccountInformationStore!.info &&
      this.props.AccountInformationStore!.info.connections
      ? this.props.AccountInformationStore!.info.connections
      : 0
  }

  updateStealth() {
    this.props.SettingsStore!.setSettingOption({
      key: 'darkTheme',
      value: !this.props.SettingsStore!.getDarkTheme,
    })
  }

  toggleNotification() {
    this.setState({
      dropdownOpenNotifiaction: !this.state.dropdownOpenNotifiaction,
    })
  }

  getBlockSyncInfo() {
    if (
      this.props.AccountInformationStore!.info &&
      !this.props.AccountInformationStore!.info.blocks
    ) {
      return this.props.AccountInformationStore!.info.loadingProgress
        ? `${this.props.i18n!.t('header.loading') as string} ${
        this.props.AccountInformationStore!.info.loadingProgress
        }%`
        : (this.props.i18n!.t('header.loading') as string)
    }

    return this.props.AccountInformationStore!.info &&
      this.props.AccountInformationStore!.info.blocks
      ? `${Number(
        (this.props.AccountInformationStore!.info.blocks /
          this.props.AccountInformationStore!.info.highestBlock) *
        100,
      ).toFixed(2)} % ${this.props.i18n!.t('header.synced') as string}`
      : (this.props.i18n!.t('header.notsyncing') as string)
  }

  isUnlocked() {
    return this.props.AccountInformationStore!.unlocked
  }

  handleKeyPress = event => {
    // 76 for "ctrl/cmd + l"
    if (event.keyCode === 76 && (event.ctrlKey || event.metaKey)) {
      this.props.AccountInformationStore!.lockWallet()
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress, false)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress, false)
  }

  render() {
    return (
      <div className="topbar align-items-center d-flex">
        <div className="d-flex justify-content-start align-items-center flex-grow-1 flex-row">
          <UnlockPanel
            open={this.state.modal}
            toggle={this.toggleUnlock.bind(this)}
          />
          <div className="pl-4">    <BurgerMenu
            dropdownOpen={this.state.dropdownOpen}
            toggle={this.toggle.bind(this)}
          /></div>
          <div className="pl-2">
            <img
              className="logo center-block"
              style={{
                display: 'block',
                margin: '0 auto',
                height: '30px',
              }}
              alt="verge logo"
            />
          </div>
        </div>
        <div className="d-flex justify-content-end align-items-center flex-row flex-grow-1">
          <div className="pr-5">
            <div
              style={{
                textAlign: 'center',
                display: 'block',
                margin: 'auto',
              }}
            >
              <Dropdown
                isOpen={this.state.dropdownOpenNotifiaction}
                toggle={this.toggleNotification}
              >
                <DropdownToggle
                  tag="span"
                  onClick={this.toggleNotification}
                  data-toggle="dropdown"
                  aria-expanded={this.state.dropdownOpenNotifiaction}
                  style={{
                    paddingTop: '14px',
                    display: 'block',
                    margin: 'auto',
                  }}
                >
                  <Notification style={{ fill: '#467698' }} />
                </DropdownToggle>
                <DropdownMenu className="mydrop">
                  <NotificationLayer
                    notifications={
                      this.props.AccountInformationStore!
                        .resolveLastFourNotifications
                    }
                  />
                </DropdownMenu>
              </Dropdown>

              <div
                style={{
                  fontSize: '8px',
                  paddingBottom: '10px',
                  color: '#467698',
                }}
              >
                Notification
            </div>
            </div></div>
          <div className="pr-5">
            <div
              style={{
                textAlign: 'center',
                display: 'block',
                margin: 'auto',
              }}
            >
              <span
                style={{
                  paddingTop: '10px',
                  display: 'block',
                  margin: 'auto',
                }}
              >
                {!this.props.AccountInformationStore!.info.isReady ? (
                  <WifiOffIcon style={{ fill: '#467698' }} />
                ) : (
                    <WifiIcon style={{ fill: '#467698' }} />
                  )}
              </span>
              <div
                style={{
                  fontSize: '8px',
                  paddingBottom: '10px',
                  color: '#467698',
                }}
              >
                {!this.props.AccountInformationStore!.info.isReady
                  ? (this.props.i18n!.t('header.loading') as string)
                  : (this.props.i18n!.t('header.synced') as string)}
              </div>
            </div></div>
          <div className="pr-5">
            <Link
              to={'/logout'}
              onClick={() => this.props.AccountInformationStore!.lockWallet()}
              style={{
                textAlign: 'center',
                display: 'block',
                margin: 'auto',
              }}
            >
              <span
                style={{
                  paddingTop: '10px',
                  display: 'block',
                  margin: 'auto',
                }}
              >
                {this.isUnlocked() ? (
                  <Logout style={{ fill: '#467698' }} />
                ) : (
                    <Lock style={{ fill: '#467698' }} />
                  )}
              </span>
              <div
                style={{
                  fontSize: '8px',
                  paddingBottom: '10px',
                  color: '#467698',
                }}
              >
                {this.isUnlocked()
                  ? (this.props.i18n!.t('header.unlocked') as string)
                  : (this.props.i18n!.t('header.locked') as string)}
              </div>
            </Link>
            </div>
        </div>
      </div>
    )
  }
}

export default translate()(
  inject('AccountInformationStore', 'SettingsStore')(observer(Header)),
)
