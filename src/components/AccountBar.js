import React, { Component } from "react";
import { Client } from "verge-node-typescript";
import { inject, observer } from "mobx-react";
import T from "i18n-react";
import send from "../assets/images/send.png";
import receive from "../assets/images/receive.png";
import SendPanel from "./modal/SendPanel";
import ElectronStore from "electron-store";
const electronStore = new ElectronStore({
  encryptionKey: new Buffer("vergecurrency")
});
import styled from "styled-components";

const AccountBarContainer = styled.div`
  max-height: 200px;
  min-height: 200px;
  padding-top: 35px;
  ${props =>
    props.theme.light
      ? `
   background-color: #00b8dc;
   background-image: linear-gradient(
    -86deg,
    #1db6dc 0%,
    #1db6dc 20%,
    #25c5ed 46%,
    #0fa2c6 75%,
    #0fa2c6 100%
  );`
      : `background-color: #0d1f2d;`};
`;

@inject("SettingsStore", "AccountInformationStore", "CoinStatsStore")
@observer
export default class AccountBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usd_exchange: 0.0865,
      sendOpen: false
    };
    this.toggleSend = this.toggleSend.bind(this);
  }

  toggleSend() {
    this.setState({ sendOpen: !this.state.sendOpen });
  }

  render() {
    const formatter = new Intl.NumberFormat(
      electronStore.get("locale", "en-US"),
      {
        style: "currency",
        currency: electronStore.get("currency", "USD"),
        minimumFractionDigits: 2
      }
    );

    const formatterPrice = new Intl.NumberFormat(
      electronStore.get("locale", "en-US"),
      {
        style: "currency",
        currency: electronStore.get("currency", "USD"),
        minimumFractionDigits: 5
      }
    );

    const XVGformatter = new Intl.NumberFormat(
      electronStore.get("locale", "en-US"),
      {
        style: "currency",
        currency: electronStore.get("currency", "USD"),
        minimumFractionDigits: 5
      }
    );

    return (
      <AccountBarContainer className="container-fluid">
        <SendPanel open={this.state.sendOpen} toggle={this.toggleSend} />
        <div className="row">
          <div
            className="col-md-3"
            style={{
              textAlign: "left",
              fontWeight: "bold",
              paddingTop: "10px",
              paddingLeft: "5%"
            }}
          >
            <font
              style={{
                color: "#fff",
                letterSpacing: "3px",
                fontSize: "10px"
              }}
            >
              {T.translate("accountbar.xvgbalance")}
            </font>
            <h4 style={{ color: "#fff" }}>
              {this.props.AccountInformationStore.getBalance.toLocaleString(
                "en-US"
              )}{" "}
              XVG
            </h4>
          </div>
          <div
            className="col-md-2"
            style={{
              textAlign: "left",
              fontWeight: "bold",
              paddingTop: "10px",
              paddingLeft: "5%"
            }}
          >
            <font
              style={{
                color: "#fff",
                letterSpacing: "3px",
                fontSize: "10px"
              }}
            >
              {T.translate("accountbar.xvgusd", {
                currency: this.props.SettingsStore.getCurrency
              })}
            </font>
            <h4 style={{ color: "#fff" }}>
              {formatter.format(
                this.props.AccountInformationStore.getBalance *
                  this.state.usd_exchange
              )}
            </h4>
          </div>
          <div
            className="col-md-3"
            style={{
              textAlign: "left",
              fontWeight: "bold",
              paddingTop: "10px",
              paddingLeft: "5%"
            }}
          >
            <font
              style={{
                color: "#fff",
                letterSpacing: "3px",
                fontSize: "10px"
              }}
            >
              {T.translate("accountbar.xvgprice")}
            </font>
            <h4 style={{ color: "#fff" }}>
              {formatterPrice.format(
                this.props.CoinStatsStore.getUpdatedStats.price
              )}
            </h4>
          </div>
          <div
            className="col-md-2"
            style={{
              textAlign: "center",
              display: "flex",
              justifyContent: "center"
            }}
          >
            <div
              className="big-button send"
              style={{ alignSelf: "center" }}
              onClick={this.toggleSend}
            >
              <img
                src={send}
                style={{
                  height: "15px",
                  width: "15px",
                  marginRight: "15px"
                }}
              />
              {T.translate("account-bar.send")}
            </div>
          </div>
          <div
            className="col-md-2"
            style={{
              textAlign: "center",
              display: "flex",
              justifyContent: "center"
            }}
          >
            <div
              className="big-button receive"
              style={{ alignSelf: "center", marginRight: "40px" }}
            >
              <img
                src={receive}
                style={{
                  height: "15px",
                  width: "15px",
                  marginRight: "15px"
                }}
              />
              {T.translate("account-bar.receive")}
            </div>
          </div>
        </div>
      </AccountBarContainer>
    );
  }
}
