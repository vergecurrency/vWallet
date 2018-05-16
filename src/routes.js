/* eslint flowtype-errors/show-errors: 0 */
import React, { Component } from 'react'
import { Router, Switch, Route, Redirect } from 'react-router-dom'
import { createHashHistory } from 'history'
import App from './containers/App'
import HomePage from './containers/HomePage'
import SettingsPage from './containers/SettingsPage'
import ElectronStore from 'electron-store'
const electronStore = new ElectronStore({
  encryptionKey: new Buffer('vergecurrency'),
})

import { Provider, observer, inject } from 'mobx-react'
import TransactionStore from './stores/TransactionStore'
import AccountInformationStore from './stores/AccountInformationStore'
import SettingsStore from './stores/SettingsStore'
import CoinStatsStore from './stores/CoinStatsStore'
import SetupStore from './stores/SetupStore'
import { Client } from 'verge-node-typescript'
import { ThemeProvider } from 'styled-components'
import ReRouter from './ReRouter'
import VergeProvider from './VergeProvider'

/* eslint-disable-next-line no-undef */
document.addEventListener('dragover', event => event.preventDefault())
/* eslint-disable-next-line no-undef */
document.addEventListener('drop', event => event.preventDefault())

const Routes = props => (
  <Router history={createHashHistory()}>
    <Provider
      TransactionStore={TransactionStore}
      AccountInformationStore={AccountInformationStore}
      SettingsStore={SettingsStore}
      CoinStatsStore={CoinStatsStore}
      SetupStore={SetupStore}
    >
      <VergeProvider>
        <ReRouter {...props} />
      </VergeProvider>
    </Provider>
  </Router>
)

export default Routes
