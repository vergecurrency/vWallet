/* eslint flowtype-errors/show-errors: 0 */
import React, { Component } from 'react'
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom'
import { createHashHistory } from 'history'
import App from './containers/App'
import HomePage from './containers/HomePage'
import SettingsPage from './containers/SettingsPage'

import { Provider } from 'mobx-react'
import TransactionStore from './stores/TransactionStore'
import AccountInformationStore from './stores/AccountInformationStore'
import SettingsStore from './stores/SettingsStore'

class RedirectHome extends Component {
	render() {
		return <Redirect to="/" />
	}
}

export default props => (
	<Router history={props.history}>
		<Provider
			TransactionStore={TransactionStore}
			AccountInformationStore={AccountInformationStore}
			SettingsStore={SettingsStore}
		>
			<App>
				<Switch>
					<Route exact path="/" component={HomePage} />
					<Route path="/settings" component={SettingsPage} />
					<Route component={RedirectHome} />
				</Switch>
			</App>
		</Provider>
	</Router>
)
