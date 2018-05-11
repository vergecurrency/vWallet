/* eslint flowtype-errors/show-errors: 0 */
import React, { Component } from "react";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import { createHashHistory } from "history";
import App from "./containers/App";
import HomePage from "./containers/HomePage";
import SettingsPage from "./containers/SettingsPage";
import LoadingRoot from "./loading/LoadingRoot";
import MainRoute from "./mainRoute";
import Tour from "./welcomeguide/Tour";
import ElectronStore from "electron-store";
const electronStore = new ElectronStore({
  encryptionKey: new Buffer("vergecurrency")
});

import { Provider } from "mobx-react";
import TransactionStore from "./stores/TransactionStore";
import AccountInformationStore from "./stores/AccountInformationStore";
import SettingsStore from "./stores/SettingsStore";
import CoinStatsStore from "./stores/CoinStatsStore";
import { Client } from "verge-node-typescript";
import ThemeProvider from "styled-components";

class RedirectHome extends Component {
  render() {
    return <Redirect to="/" />;
  }
}

const theme = {};

const WrapWithApp = Site => {
  return () => (
    <App>
      <Site />
    </App>
  );
};

export default class Routes extends React.Component {
  render() {
    const props = this.props;
    return (
      <Router history={createHashHistory()}>
        <Provider
          TransactionStore={TransactionStore}
          AccountInformationStore={AccountInformationStore}
          SettingsStore={SettingsStore}
          CoinStatsStore={CoinStatsStore}
        >
          {!window.location.href.includes("loading.html") ? (
            electronStore.get("setupOpen", true) ? (
              <Tour />
            ) : (
              <MainRoute />
            )
          ) : (
            <LoadingRoot />
          )}
        </Provider>
      </Router>
    );
  }
}
