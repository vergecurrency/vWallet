import React, { Component } from 'react'

import { inject, observer } from 'mobx-react'

import UnlockPanel from '../modal/UnlockPanel'
import WifiIcon from 'react-material-icon-svg/dist/WifiIcon'
import WifiOffIcon from 'react-material-icon-svg/dist/WifiOffIcon'

import UnLock from 'react-material-icon-svg/dist/CheckIcon'
import Lock from 'react-material-icon-svg/dist/LockIcon'
import LoadingIcon from '../LoadingIcon'
import T from 'i18n-react'
import BurgerMenu from './BurgerMenu'

@inject('AccountInformationStore')
@observer
export default class Header extends Component {
	constructor(props) {
		super(props)
		this.toggle = this.toggle.bind(this)
		this.toggleUnlock = this.toggleUnlock.bind(this)
		this.state = {
			dropdownOpen: false,
			modal: false,
			stealthToggle: false,
		}
	}

	toggle() {
		this.setState({
			dropdownOpen: !this.state.dropdownOpen,
		})
	}

	toggleUnlock() {
		this.setState({
			modal: !this.state.modal,
		})
	}

	getConnectionInfo() {
		return this.props.AccountInformationStore.info &&
			this.props.AccountInformationStore.info.connections
			? this.props.AccountInformationStore.info.connections
			: 0
	}

	updateStealth() {
		this.setState({
			stealthToggle: !this.state.stealthToggle,
		})
	}

	getBlockSyncInfo() {
		return this.props.AccountInformationStore.info &&
			this.props.AccountInformationStore.info.blocks
			? `${Number(
					this.props.AccountInformationStore.info.blocks /
						this.props.AccountInformationStore.info.highestBlock *
						100
			  ).toFixed(2)} % ${T.translate('header.synced')}`
			: T.translate('header.notsyncing')
	}

	render() {
		return (
			<div className="container-fluid topbar">
				<UnlockPanel
					open={this.state.modal}
					toggle={this.toggleUnlock.bind(this)}
				/>
				<div className="row">
					<div className="col-md-1" style={{ marginLeft: '20px' }}>
						<BurgerMenu
							dropdownOpen={this.state.dropdownOpen}
							toggle={this.toggle.bind(this)}
						/>
					</div>
					<div
						className="col-md-1 text-center"
						style={{ left: '-40px' }}
					>
						<div
							style={{
								display: 'inline-block',
								margin: '0 auto',
								paddingTop: '10px',
								verticalAlign: 'middle',
							}}
						>
							<img
								className="logo center-block"
								style={{
									display: 'block',
									margin: '0 auto',
									height: '40px',
								}}
								alt="verge logo"
							/>
						</div>
					</div>
					<div className="col-md-5" />
					<div
						onClick={this.toggleUnlock}
						className="col-md-1"
						style={{
							textAlign: 'center',
							display: 'block',
							margin: 'auto',
							float: 'right',
						}}
					>
						<span
							style={{
								paddingTop: '10px',
								display: 'block',
								margin: 'auto',
							}}
						>
							<Lock style={{ fill: '#467698' }} />
						</span>
						<div
							style={{
								fontSize: '8px',
								paddingBottom: '10px',
								color: '#467698',
							}}
						>
							{false
								? T.translate('header.unlocked')
								: T.translate('header.locked')}
						</div>
					</div>
					<div
						className="col-md-1"
						style={{
							textAlign: 'center',
							display: 'block',
							margin: 'auto',
						}}
					>
						<span
							style={{
								paddingTop: '10px',
								display: 'block',
								margin: 'auto',
							}}
						>
							<LoadingIcon />
						</span>
						<div
							style={{
								fontSize: '8px',
								paddingBottom: '10px',
								color: '#467698',
							}}
						>
							{this.getBlockSyncInfo()}
						</div>
					</div>
					<div
						className="col-md-1"
						style={{
							textAlign: 'center',
							display: 'block',
							margin: 'auto',
						}}
					>
						<div
							style={{
								paddingTop: '10px',
								display: 'block',
								margin: 'auto',
							}}
						>
							{this.getConnectionInfo() <= 0 ? (
								<WifiOffIcon style={{ fill: '#467698' }} />
							) : (
								<WifiIcon style={{ fill: '#467698' }} />
							)}
						</div>
						<div
							style={{
								fontSize: '8px',
								paddingBottom: '10px',
								color: '#467698',
							}}
						>
							{this.getConnectionInfo()}{' '}
							{T.translate('header.connection')}
						</div>
					</div>
					<div
						className="col-md-1"
						style={{ paddingTop: '16px', marginRight: '60px' }}
					>
						<label className="switch" style={{ width: '100px' }}>
							<input
								type="checkbox"
								checked={this.state.stealthToggle}
								onClick={this.updateStealth.bind(this)}
							/>
							<span
								className="slider round"
								style={{
									fontSize: 12,
									textAlign: this.state.stealthToggle
										? 'left'
										: 'right',
									paddingTop: '8px',
									paddingLeft: '5px',
									paddingRight: '5px',
								}}
							>
								{this.state.stealthToggle
									? 'Stealth ON'
									: 'Stealth OFF'}
							</span>
						</label>
					</div>
				</div>
			</div>
		)
	}
}
