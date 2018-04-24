import React, { Component } from 'react'
import { Client } from 'verge-node-typescript'
import { inject, observer } from 'mobx-react'

const formatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
	minimumFractionDigits: 2,
})

const vergeClient = new Client({ user: 'kyon', pass: 'lolcat' })

@inject('SettingsStore')
@observer
export default class AccountBar extends Component {
	constructor(props) {
		super(props)
		this.state = {
			balance: 0,
			usd_exchange: 0,
		}
	}

	componentDidMount() {
		vergeClient
			.getBalance()
			.then(balance => this.setState({ balance, usd_exchange: 0.0765 }))
			.catch(console.error)
	}

	render() {
		return (
			<div className="button-header">
				<div className="container">
					<div className="row">
						<div
							className="col-md-8"
							style={{
								textAlign: 'left',
								fontWeight: 'bold',
								paddingTop: '10px',
								paddingLeft: '5%',
							}}
						>
							<h2 style={{ color: '#fff' }}>
								{formatter.format(
									this.state.balance * this.state.usd_exchange
								)}{' '}
								/ {this.state.balance} XVG
							</h2>
						</div>
						<div
							className="col-md-2"
							style={{ textAlign: 'center' }}
						>
							<div className="big-button">Send</div>
						</div>
						<div
							className="col-md-2"
							style={{ textAlign: 'center' }}
						>
							<div className="big-button">Receive</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
