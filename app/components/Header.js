import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap'
import WifiIcon from 'react-material-icon-svg/dist/WifiIcon'
import WifiOffIcon from 'react-material-icon-svg/dist/WifiOffIcon'
import Menu from 'react-material-icon-svg/dist/MenuIcon'
import LoadingIcon from './LoadingIcon'

@inject('AccountInformationStore')
@observer
export default class Header extends Component {
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

  getConnectionInfo() {
    return this.props.AccountInformationStore.info &&
      this.props.AccountInformationStore.info.info
      ? this.props.AccountInformationStore.info.info.connections
      : 0
  }

  getBlockSyncInfo() {
    return this.props.AccountInformationStore.info &&
      this.props.AccountInformationStore.info.info
      ? `${Number(
          this.props.AccountInformationStore.info.info.blocks /
            this.props.AccountInformationStore.info.info.highestBlock *
            100
        ).toFixed(3)} % synced`
      : 'not syncing'
  }

  render() {
    return (
      <div
        className="container-fluid"
        style={{
          boxShadow:
            '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        }}
      >
        <div className="row">
          <div className="col-md-1" />
          <div className="col-md-1">
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <DropdownToggle
                style={{
                  backgroundColor: 'inherit',
                  borderColor: 'transparent',
                  boxShadow: 'none',

                  margin: '0 auto',
                }}
              >
                <Menu
                  style={{
                    color: 'white',
                    fill: 'white',
                    height: '32px',
                    width: '32px',
                  }}
                />
              </DropdownToggle>
              <DropdownMenu>
                <Link to="/">
                  <DropdownItem>Wallet Overview</DropdownItem>
                </Link>
                <Link to="/settings">
                  <DropdownItem>Settings</DropdownItem>
                </Link>
              </DropdownMenu>
            </Dropdown>
          </div>
          <div className="col-md-8 text-center">
            <img
              className="center-block"
              src="resources/assets/logo.png"
              style={{
                display: 'block',
                margin: '0 auto',
                height: '40px',
              }}
              alt="verge logo"
            />
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
            <font color="white" style={{ fontSize: '8px' }}>
              {this.getBlockSyncInfo()}
            </font>
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
              {this.getConnectionInfo() <= 0 ? (
                <WifiOffIcon style={{ color: 'white', fill: 'white' }} />
              ) : (
                <WifiIcon style={{ color: 'white', fill: 'white' }} />
              )}
            </span>
            <font color="white" style={{ fontSize: '8px' }}>
              {this.getConnectionInfo()} Connections
            </font>
          </div>
        </div>
      </div>
    )
  }
}
/*
      <nav
        className=""
        style={{
          boxShadow:
            '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
          height: '75px',
          paddingBottom: '20px',
        }}
      >

      </nav>*/
