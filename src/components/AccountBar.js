import React, { Component } from 'react'
import { Client } from 'verge-node-typescript'
import { inject, observer } from 'mobx-react'
import T from 'i18n-react'
import send from '../assets/images/send.png'
import receive from '../assets/images/receive.png'
const formatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
	minimumFractionDigits: 2,
})

const XVGformatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
	minimumFractionDigits: 5,
})

const vergeClient = new Client({ user: 'kyon', pass: 'lolcat' })

@inject('SettingsStore')
@observer
export default class AccountBar extends Component {
	constructor(props) {
		super(props)
		this.state = {
			balance: 2142141.034212,
			usd_exchange: 0.0865,
		}
	}

	componentDidMount() {
		vergeClient
			.getBalance()
			.then(balance => this.setState({ balance }))
			.catch(console.error)
	}

	render() {
		return (
			<div className="container-fluid account-bar">
				<div className="row">
					<div
						className="col-md-3"
						style={{
							textAlign: 'left',
							fontWeight: 'bold',
							paddingTop: '10px',
							paddingLeft: '5%',
						}}
					>
						<font
							style={{
								color: '#fff',
								letterSpacing: '3px',
								fontSize: '10px',
							}}
						>
							XVG BALANCE
						</font>
						<h4 style={{ color: '#fff' }}>
							{this.state.balance.toLocaleString('en-US')} XVG
						</h4>
					</div>
					<div
						className="col-md-2"
						style={{
							textAlign: 'left',
							fontWeight: 'bold',
							paddingTop: '10px',
							paddingLeft: '5%',
						}}
					>
						<font
							style={{
								color: '#fff',
								letterSpacing: '3px',
								fontSize: '10px',
							}}
						>
							XVG IN USD
						</font>
						<h4 style={{ color: '#fff' }}>
							{formatter.format(
								this.state.balance * this.state.usd_exchange
							)}
						</h4>
					</div>
					<div
						className="col-md-3"
						style={{
							textAlign: 'left',
							fontWeight: 'bold',
							paddingTop: '10px',
							paddingLeft: '5%',
						}}
					>
						<font
							style={{
								color: '#fff',
								letterSpacing: '3px',
								fontSize: '10px',
							}}
						>
							XVG PRICE
						</font>
						<h4 style={{ color: '#fff' }}>
							{XVGformatter.format(this.state.usd_exchange)}
						</h4>
					</div>
					<div
						className="col-md-2"
						style={{
							textAlign: 'center',
							display: 'flex',
							justifyContent: 'center',
						}}
					>
						<div
							className="big-button send"
							style={{ alignSelf: 'center' }}
						>
							<img
								src={send}
								style={{
									height: '15px',
									width: '15px',
									marginRight: '15px',
								}}
							/>
							{T.translate('account-bar.send')}
						</div>
					</div>
					<div
						className="col-md-2"
						style={{
							textAlign: 'center',
							display: 'flex',
							justifyContent: 'center',
						}}
					>
						<div
							className="big-button receive"
							style={{ alignSelf: 'center', marginRight: '40px' }}
						>
							<img
								src={receive}
								style={{
									height: '15px',
									width: '15px',
									marginRight: '15px',
								}}
							/>
							{T.translate('account-bar.receive')}
						</div>
					</div>
				</div>
			</div>
		)
	}
}
