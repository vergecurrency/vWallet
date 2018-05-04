import React, { Component } from 'react'
import moment from 'moment'
import incoming from '../assets/images/incoming.png'
import outgoing from '../assets/images/outgoing.png'
import arrowdown from '../assets/images/arrowdown.png'
import { renderReporter, propTypes } from 'mobx-react'
import { shell } from 'electron'
import { isStringTextContainingNode } from 'typescript'

const XVGformatter = new Intl.NumberFormat('en-US', {
	style: 'decimal',
	minimumFractionDigits: 5,
})

export default class Transaction extends Component {
	constructor(props) {
		super(props)
		this.state = { hide: true }
	}

	render() {
		const {
			account,
			address,
			amount,
			blockhash,
			category,
			confirmations,
			time,
			timereceived,
			txid,
		} = this.props

		return (
			<div className="container">
				<div className="row">
					<div className="col-md-1" style={{}}>
						<div
							style={{
								fontWeight: '400',
								fontSize: '12px',
								color: '#999999',
							}}
						>
							{moment
								.unix(timereceived)
								.format('MMM')
								.toUpperCase()}
						</div>
						<div
							style={{
								fontWeight: '300',
								fontSize: '22px',
								lineHeight: '1.25',
								color: '#cacaca',
							}}
						>
							{moment.unix(timereceived).format('DD')}
						</div>
					</div>
					<div
						className="col-md-2"
						style={{
							color: 'white',
							fontWeight: 'bold',
							marginTop: '8px',
						}}
					>
						{category.includes('receive') ? (
							<img src={incoming} />
						) : (
							<img src={outgoing} />
						)}
					</div>
					<div
						className="col-md-7"
						style={{
							color: 'white',
							fontWeight: 'bold',
							color: category.includes('receive')
								? '#00917a'
								: '#dc2b3d',
							textAlign: 'right',
							letterSpacing: '1px',
							fontSize: '22px',
						}}
					>
						<div>
							{category.includes('receive') ? '+' : ''}
							{amount.toFixed(2).toLocaleString('en-US')} XVG
						</div>
						<div
							style={{
								color: '#999999',
								fontSize: '12px',
								fontWeight: '400',
								letterSpacing: '1px',
							}}
						>
							<font>
								You{' '}
								{category.includes('receive')
									? 'received'
									: 'sent'}
							</font>
						</div>
					</div>
					<div
						className="col-md-2"
						style={{ textAlign: 'center', cursor: 'pointer' }}
						onClick={() => {
							this.setState({ hide: !this.state.hide })
						}}
					>
						<div>
							<img
								src={arrowdown}
								style={{
									transform: `rotate(${
										this.state.hide ? 0 : 180
									}deg)`,
								}}
							/>
						</div>
						<font style={{ fontSize: '10px', color: '#999999' }}>
							{this.state.hide ? 'details' : 'close'}
						</font>
					</div>
				</div>
				{!this.state.hide ? (
					<div className="trans-details">
						<div className="row">
							<div
								className="col-md-2"
								style={{ fontWeight: 'bold' }}
							>
								Address:
							</div>{' '}
							<a
								className="col-md-10"
								href="#"
								onClick={() =>
									shell.openExternal(
										`https://verge-blockchain.info/address/${address}`
									)
								}
							>
								{address}
							</a>
						</div>
						<div className="row">
							<div
								className="col-md-2"
								style={{ fontWeight: 'bold' }}
							>
								Blockhash:
							</div>
							<div className="col-md-10">
								{' '}
								<a
									href="#"
									onClick={() =>
										shell.openExternal(
											`https://verge-blockchain.info/block/${blockhash}`
										)
									}
								>
									<em>{blockhash.substring(0, 40)}...</em>
								</a>
							</div>
						</div>
						<div className="row">
							<div
								className="col-md-2"
								style={{ fontWeight: 'bold' }}
							>
								TXID:
							</div>
							<div className="col-md-10">
								{' '}
								<a
									href="#"
									onClick={() =>
										shell.openExternal(
											`https://verge-blockchain.info/tx/${txid}`
										)
									}
								>
									<em>{txid.substring(0, 40)}...</em>
								</a>
							</div>
						</div>
						{/* Sub division of the table */}
						<div className="row" style={{ marginTop: '5px' }}>
							<div className="col-md-6">
								Confirmations: {confirmations}
							</div>
							<div className="col-md-6">
								Amount: {XVGformatter.format(amount)} XVG
							</div>
						</div>
						<div className="row">
							<div className="col-md-6">
								Time:{' '}
								{moment.unix(time).format('MM/DD/YYYY hh:mm a')}
							</div>
							<div className="col-md-6">
								Time received:{' '}
								{moment
									.unix(timereceived)
									.format('MM/DD/YYYY hh:mm a')}
							</div>
						</div>
					</div>
				) : null}
			</div>
		)
	}
}
