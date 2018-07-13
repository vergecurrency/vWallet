import * as React from 'react'

import { Redirect, Route, Switch } from 'react-router-dom'

import App from './containers/App'
import HomePage from './containers/HomePage'
import SettingsPage from './containers/SettingsPage'

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
    <Redirect to="/" />
  </Switch>
)

export default MainRoute
