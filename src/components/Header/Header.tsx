import * as React from 'react'

import { Dropdown, DropdownMenu, DropdownToggle } from 'reactstrap'
import { inject, observer } from 'mobx-react'

import { AccountInformationStore } from '../../stores/AccountInformationStore'
import BurgerMenu from './BurgerMenu'
import LoadingIcon from '../LoadingIcon'
import Lock from 'react-material-icon-svg/dist/LockIcon'
import Logout from '../../icons/Logout'
import Notification from '../../icons/Notification'
import NotificationLayer from './NotificationLayer'
import { SettingsStore } from '../../stores/SettingsStore'
import T from 'i18n-react'
import UnlockPanel from '../modal/UnlockPanel'
import WifiIcon from 'react-material-icon-svg/dist/WifiIcon'
import WifiOffIcon from 'react-material-icon-svg/dist/WifiOffIcon'

interface HeaderState {
  dropdownOpen: boolean
  modal: boolean
  dropdownOpenNotifiaction: boolean
}

interface HeaderProps {
  AccountInformationStore?: AccountInformationStore
  SettingsStore?: SettingsStore
}

const exampleNotifications: INotification[] = [
  {
    type: 'personal',
    title: 'Achievement!',
    inner: 'You have reached 10 transactions',
    timeOfOccurance: 1527777829,
  },
  {
    type: 'price',
    title: 'Mooooooning!',
    inner: 'Price has reached $0.20',
    timeOfOccurance: 1527778829,
  },
  {
    type: 'cap',
    title: 'Market Cap!',
    inner: 'We reached a Market cap of 1bln.',
    timeOfOccurance: 1527773829,
  },
]

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
        ? `loading ... ${
            this.props.AccountInformationStore!.info.loadingProgress
          }%`
        : `loading ...`
    }

    return this.props.AccountInformationStore!.info &&
      this.props.AccountInformationStore!.info.blocks
      ? `${Number(
          (this.props.AccountInformationStore!.info.blocks /
            this.props.AccountInformationStore!.info.highestBlock) *
            100,
        ).toFixed(2)} % ${T.translate('header.synced')}`
      : T.translate('header.notsyncing')
  }

  isUnlocked() {
    return this.props.AccountInformationStore!.unlocked
  }

  render() {
    return (
      <div className="container-fluid topbar">
        <UnlockPanel
          open={this.state.modal}
          toggle={this.toggleUnlock.bind(this)}
        />
        <div className="row">
          <div className="col-md-1" style={{ marginLeft: '20px' }}>
            <BurgerMenu
              dropdownOpen={this.state.dropdownOpen}
              toggle={this.toggle.bind(this)}
            />
          </div>
          <div className="col-md-1 text-center" style={{ left: '-40px' }}>
            <div
              style={{
                display: 'inline-block',
                margin: '0 auto',
                paddingTop: '10px',
                verticalAlign: 'middle',
              }}
            >
              <img
                className="logo center-block"
                style={{
                  display: 'block',
                  margin: '0 auto',
                  height: '40px',
                }}
                alt="verge logo"
              />
            </div>
          </div>
          <div className="col-md-5" />
          <div
            className="col-md-1"
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
                <NotificationLayer notifications={exampleNotifications} />
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
          </div>
          <div
            onClick={() =>
              this.isUnlocked()
                ? this.props.AccountInformationStore!.lockWallet()
                : this.toggleUnlock()
            }
            className="col-md-1"
            style={{
              textAlign: 'center',
              display: 'block',
              margin: 'auto',
              float: 'right',
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
                ? T.translate('header.unlocked')
                : T.translate('header.locked')}
            </div>
          </div>
          <div
            className="col-md-1"
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
              <LoadingIcon />
            </span>
            <div
              style={{
                fontSize: '8px',
                paddingBottom: '10px',
                color: '#467698',
              }}
            >
              {this.getBlockSyncInfo()}
            </div>
          </div>
          <div
            className="col-md-1"
            style={{
              textAlign: 'center',
              display: 'block',
              margin: 'auto',
            }}
          >
            <div
              style={{
                paddingTop: '10px',
                display: 'block',
                margin: 'auto',
              }}
            >
              {this.getConnectionInfo() <= 0 ? (
                <WifiOffIcon style={{ fill: '#467698' }} />
              ) : (
                <WifiIcon style={{ fill: '#467698' }} />
              )}
            </div>
            <div
              style={{
                fontSize: '8px',
                paddingBottom: '10px',
                color: '#467698',
              }}
            >
              {this.getConnectionInfo()} {T.translate('header.connection')}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default inject('AccountInformationStore', 'SettingsStore')(
  observer(Header),
)
