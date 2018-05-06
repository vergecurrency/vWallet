import React, { Component } from 'react'
import { Client } from 'verge-node-typescript'
import { inject, observer } from 'mobx-react'
import T from 'i18n-react'
import send from '../assets/images/send.png'
import receive from '../assets/images/receive.png'
import SendPanel from './modal/SendPanel'
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

@inject('SettingsStore', 'AccountInformationStore')
@observer
export default class AccountBar extends Component {
	constructor(props) {
		super(props)
		this.state = {
			usd_exchange: 0.0865,
			sendOpen: false,
		}
		this.toggleSend = this.toggleSend.bind(this)
	}

	toggleSend() {
		this.setState({ sendOpen: !this.state.sendOpen })
	}

	render() {
		return (
			<div className="container-fluid account-bar">
				<SendPanel
					open={this.state.sendOpen}
					toggle={this.toggleSend}
				/>
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
							{T.translate('accountbar.xvgbalance')}
						</font>
						<h4 style={{ color: '#fff' }}>
							{this.props.AccountInformationStore.getBalance.toLocaleString(
								'en-US'
							)}{' '}
							XVG
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
							{T.translate('accountbar.xvgusd')}
						</font>
						<h4 style={{ color: '#fff' }}>
							{formatter.format(
								this.props.AccountInformationStore.getBalance *
									this.state.usd_exchange
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
							{T.translate('accountbar.xvgprice')}
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
							onClick={this.toggleSend}
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
