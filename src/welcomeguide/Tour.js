import React from 'react'
import { TitleBar } from 'electron-react-titlebar'
import styled from 'styled-components'
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom'
import Welcome from './Welcome'
import Create from './wallet/CreatePassword'

export default props => {
	return (
		<Switch>
			<Route exact path="/welcome" component={Welcome} />
			<Route exact path="/wallet/create" component={Create} />
			<Route component={() => <Redirect to="/welcome" />} />
		</Switch>
	)
}
