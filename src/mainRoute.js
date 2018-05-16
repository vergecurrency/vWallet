import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import App from './containers/App'
import HomePage from './containers/HomePage'
import SettingsPage from './containers/SettingsPage'

const RedirectHome = () => <Redirect to="/" />

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
    <Route component={WrapWithApp(RedirectHome)} />
  </Switch>
)

export default MainRoute
