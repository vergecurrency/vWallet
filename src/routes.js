/* eslint flowtype-errors/show-errors: 0 */
import React from 'react'
import { Router } from 'react-router-dom'
import { createHashHistory } from 'history'

import { Provider } from 'mobx-react'
import DevTools from 'mobx-react-devtools'
import TransactionStore from './stores/TransactionStore'
import AccountInformationStore from './stores/AccountInformationStore'
import SettingsStore from './stores/SettingsStore'
import CoinStatsStore from './stores/CoinStatsStore'
import SetupStore from './stores/SetupStore'
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
        <div>
          <ReRouter {...props} />
          <DevTools />
        </div>
      </VergeProvider>
    </Provider>
  </Router>
)

export default Routes
