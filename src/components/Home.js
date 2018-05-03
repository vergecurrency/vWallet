// @flow
import React, { Component } from 'react'
import TransactionList from './TransactionList'
import AccountBar from './AccountBar'
import PriceUpdater from './PriceUpdater'
import Footer from './Footer'
import Statistics from './Statistics'
export default class Home extends Component {
	// TODO: FILL
	render() {
		return (
			<div>
				<TransactionList />
				<Statistics />
				<Footer />
			</div>
		)
	}
}
