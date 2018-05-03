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
import { Client } from 'verge-node-typescript'

class RedirectHome extends Component {
	render() {
		return <Redirect to="/" />
	}
}
const client = new Client({ user: 'kyon', pass: 'lolcat' })

export default class Routes extends React.Component {
	constructor(props) {
		super(props)
		this.state = { connectionThere: false }
	}

	componentDidMount() {
		setInterval(() => {
			client
				.getInfo()
				.then(() => {
					this.setState({ connectionThere: true })
				})
				.catch(() => this.setState({ connectionThere: false }))
		})
	}

	render() {
		const props = this.props
		return (
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
	}
}
