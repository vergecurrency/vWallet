import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import BurgerMenu from "./BurgerMenu";
import LoadingIcon from "../LoadingIcon";
import Lock from "react-material-icon-svg/dist/LockIcon";
import Logout from "../../icons/Logout";
import Notification from "../../icons/Notification";
import Popover from "react-popover";
import T from "i18n-react";
import UnLock from "react-material-icon-svg/dist/CheckIcon";
import UnlockPanel from "../modal/UnlockPanel";
import WifiIcon from "react-material-icon-svg/dist/WifiIcon";
import WifiOffIcon from "react-material-icon-svg/dist/WifiOffIcon";

class Header extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.toggleUnlock = this.toggleUnlock.bind(this);
    this.updateStealth = this.updateStealth.bind(this);
    this.state = {
      dropdownOpen: false,
      modal: false
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  toggleUnlock() {
    this.setState({
      modal: !this.state.modal
    });
  }

  getConnectionInfo() {
    return this.props.AccountInformationStore.info &&
      this.props.AccountInformationStore.info.connections
      ? this.props.AccountInformationStore.info.connections
      : 0;
  }

  updateStealth() {
    this.props.SettingsStore.setSettingOption({
      key: "darkTheme",
      value: !this.props.SettingsStore.getDarkTheme
    });
  }

  getBlockSyncInfo() {
    return this.props.AccountInformationStore.info &&
      this.props.AccountInformationStore.info.blocks
      ? `${Number(
          this.props.AccountInformationStore.info.blocks /
            this.props.AccountInformationStore.info.highestBlock *
            100
        ).toFixed(2)} % ${T.translate("header.synced")}`
      : T.translate("header.notsyncing");
  }

  isUnlocked() {
    return this.props.AccountInformationStore.unlocked;
  }

  render() {
    return (
      <div className="container-fluid topbar">
        <UnlockPanel
          open={this.state.modal}
          toggle={this.toggleUnlock.bind(this)}
        />
        <div className="row">
          <div className="col-md-1" style={{ marginLeft: "20px" }}>
            <BurgerMenu
              dropdownOpen={this.state.dropdownOpen}
              toggle={this.toggle.bind(this)}
            />
          </div>
          <div className="col-md-1 text-center" style={{ left: "-40px" }}>
            <div
              style={{
                display: "inline-block",
                margin: "0 auto",
                paddingTop: "10px",
                verticalAlign: "middle"
              }}
            >
              <img
                className="logo center-block"
                style={{
                  display: "block",
                  margin: "0 auto",
                  height: "40px"
                }}
                alt="verge logo"
              />
            </div>
          </div>
          <div className="col-md-4" />
          <div
            className="col-md-1"
            style={{
              textAlign: "center",
              display: "block",
              margin: "auto"
            }}
          >
            <span
              style={{
                paddingTop: "14px",
                display: "block",
                margin: "auto"
              }}
            >
              <Popover appendTarget="#root" isOpen={true} body={<p>hello</p>}>
                <Notification style={{ fill: "#467698" }} />
              </Popover>
            </span>
            <div
              style={{
                fontSize: "8px",
                paddingBottom: "10px",
                color: "#467698"
              }}
            >
              Notification
            </div>
          </div>
          <div
            onClick={() =>
              this.isUnlocked()
                ? this.props.AccountInformationStore.lockWallet()
                : this.toggleUnlock()
            }
            className="col-md-1"
            style={{
              textAlign: "center",
              display: "block",
              margin: "auto",
              float: "right"
            }}
          >
            <span
              style={{
                paddingTop: "10px",
                display: "block",
                margin: "auto"
              }}
            >
              {this.isUnlocked() ? (
                <Logout style={{ fill: "#467698" }} />
              ) : (
                <Lock style={{ fill: "#467698" }} />
              )}
            </span>
            <div
              style={{
                fontSize: "8px",
                paddingBottom: "10px",
                color: "#467698"
              }}
            >
              {this.isUnlocked()
                ? T.translate("header.unlocked")
                : T.translate("header.locked")}
            </div>
          </div>
          <div
            className="col-md-1"
            style={{
              textAlign: "center",
              display: "block",
              margin: "auto"
            }}
          >
            <span
              style={{
                paddingTop: "10px",
                display: "block",
                margin: "auto"
              }}
            >
              <LoadingIcon />
            </span>
            <div
              style={{
                fontSize: "8px",
                paddingBottom: "10px",
                color: "#467698"
              }}
            >
              {this.getBlockSyncInfo()}
            </div>
          </div>
          <div
            className="col-md-1"
            style={{
              textAlign: "center",
              display: "block",
              margin: "auto"
            }}
          >
            <div
              style={{
                paddingTop: "10px",
                display: "block",
                margin: "auto"
              }}
            >
              {this.getConnectionInfo() <= 0 ? (
                <WifiOffIcon style={{ fill: "#467698" }} />
              ) : (
                <WifiIcon style={{ fill: "#467698" }} />
              )}
            </div>
            <div
              style={{
                fontSize: "8px",
                paddingBottom: "10px",
                color: "#467698"
              }}
            >
              {this.getConnectionInfo()} {T.translate("header.connection")}
            </div>
          </div>
          <div
            className="col-md-1"
            style={{ paddingTop: "16px", marginRight: "60px" }}
          >
            <label className="switch" style={{ width: "120px" }}>
              <input
                type="checkbox"
                checked={this.props.SettingsStore.getDarkTheme}
                onChange={this.updateStealth}
              />
              <span
                className="slider round"
                style={{
                  fontSize: 12,
                  textAlign: this.props.SettingsStore.getDarkTheme
                    ? "left"
                    : "right",
                  paddingTop: "8px",
                  paddingLeft: "10px",
                  paddingRight: "10px"
                }}
              >
                {this.props.SettingsStore.getDarkTheme
                  ? "Stealth " + T.translate("header.on")
                  : "Stealth " + T.translate("header.off")}
              </span>
            </label>
          </div>
        </div>
      </div>
    );
  }
}

export default inject("AccountInformationStore", "SettingsStore")(
  observer(Header)
);
