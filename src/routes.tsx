import * as React from 'react'
import { I18nextProvider } from 'react-i18next'

import AccountInformationStore from './stores/AccountInformationStore'
import CoinStatsStore from './stores/CoinStatsStore'
import { Provider } from 'mobx-react'
import ReRouter from './ReRouter'
import { Router } from 'react-router-dom'
import SettingsStore from './stores/SettingsStore'
import SetupStore from './stores/SetupStore'
import TransactionStore from './stores/TransactionStore'
import { createHashHistory } from 'history'
import { ThemeProvider } from 'styled-components'
import i18n from './translations/i18n'

document.addEventListener('dragover', event => event.preventDefault())
document.addEventListener('drop', event => event.preventDefault())

const Routes = (props: any) => (
  <Router history={createHashHistory()}>
    <I18nextProvider i18n={i18n}>
      <Provider
        TransactionStore={TransactionStore}
        AccountInformationStore={AccountInformationStore}
        SettingsStore={SettingsStore}
        CoinStatsStore={CoinStatsStore}
        SetupStore={SetupStore}
      >
        <ThemeProvider theme={{ light: !SettingsStore.getDarkTheme }}>
          <ReRouter {...props} />
        </ThemeProvider>
      </Provider>
    </I18nextProvider>
  </Router>
)

export default Routes
