import * as React from 'react'

import { Redirect, Route, Switch } from 'react-router-dom'

import App from './containers/App'
import HomePage from './containers/HomePage'
import SettingsPage from './containers/SettingsPage'
import AddressbookPage from './containers/AdressbookPage'

const WrapWithApp = Site => {
  const AppWrapper = () => (
    <App>
      <Site />
    </App>
  )

  return AppWrapper
}

const MainRoute = () => (
  <Switch>
    <Route exact path="/" component={WrapWithApp(HomePage)} />
    <Route exact path="/settings" component={WrapWithApp(SettingsPage)} />
    <Route exact path="/addressbook" component={WrapWithApp(AddressbookPage)} />
    <Redirect to="/" />
  </Switch>
)

export default MainRoute
