import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import {
	Dropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
} from 'reactstrap'
import {
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Input,
} from 'reactstrap'
import WifiIcon from 'react-material-icon-svg/dist/WifiIcon'
import WifiOffIcon from 'react-material-icon-svg/dist/WifiOffIcon'
import Menu from 'react-material-icon-svg/dist/MenuIcon'
import UnLock from 'react-material-icon-svg/dist/CheckIcon'
import Lock from 'react-material-icon-svg/dist/LockIcon'
import LoadingIcon from './LoadingIcon'
import T from 'i18n-react'

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
			this.props.AccountInformationStore.info.info
			? this.props.AccountInformationStore.info.info.connections
			: 0
	}

	updateStealth() {
		this.setState({
			stealthToggle: !this.state.stealthToggle,
		})
	}

	getBlockSyncInfo() {
		return this.props.AccountInformationStore.info &&
			this.props.AccountInformationStore.info.info
			? `${Number(
					this.props.AccountInformationStore.info.info.blocks /
						this.props.AccountInformationStore.info.info
							.highestBlock *
						100
			  ).toFixed(2)} % ${T.translate('header.synced')}`
			: T.translate('header.notsyncing')
	}

	render() {
		return (
			<div className="container-fluid topbar">
				<Modal
					isOpen={this.state.modal}
					toggle={this.toggleUnlock}
					className={this.props.className}
					centered={true}
					style={{ color: '#fff' }}
				>
					<ModalHeader
						style={{ backgroundColor: '#006994' }}
						toggle={this.toggleUnlock}
					>
						Unlock your wallet
					</ModalHeader>
					<ModalBody
						style={{ background: '#003d58', padding: '10% 10%' }}
					>
						<p>Make sure that nobody can see your input.</p>
						<div>
							<Input
								type="password"
								name="password"
								id="passpharse"
								placeholder="Passphrase"
							/>
						</div>
					</ModalBody>
					<ModalFooter style={{ backgroundColor: '#006994' }}>
						<Button
							style={{
								background: '#003d58',
								border: 'none',
							}}
							onClick={this.toggleUnlock}
						>
							Unlock
						</Button>{' '}
						<Button
							style={{
								background: '#000',
								border: 'none',
							}}
							onClick={this.toggleUnlock}
						>
							Cancel
						</Button>
					</ModalFooter>
				</Modal>
				<div className="row">
					<div className="col-md-1" style={{ marginLeft: '20px' }}>
						<Dropdown
							isOpen={this.state.dropdownOpen}
							toggle={this.toggle}
						>
							<DropdownToggle
								style={{
									backgroundColor: 'inherit',
									borderColor: 'transparent',
									boxShadow: 'none',
									margin: '0 auto',
									display: 'inline-block',
									verticalAlign: 'middle',
									paddingTop: '18%',
								}}
							>
								<Menu
									style={{
										color: 'white',
										fill: 'white',
										height: '32px',
										width: '32px',
									}}
								/>
							</DropdownToggle>
							<DropdownMenu>
								<Link to="/">
									<DropdownItem>
										{T.translate('header.menu.wallet')}
									</DropdownItem>
								</Link>
								<Link to="/settings">
									<DropdownItem>
										{T.translate('header.menu.settings')}
									</DropdownItem>
								</Link>
							</DropdownMenu>
						</Dropdown>
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
							<Lock style={{ fill: 'white' }} />
						</span>
						<font color="white" style={{ fontSize: '8px' }}>
							Locked
						</font>
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
						<font color="white" style={{ fontSize: '8px' }}>
							{this.getBlockSyncInfo()}
						</font>
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
							{this.getConnectionInfo() <= 0 ? (
								<WifiOffIcon
									style={{ color: 'white', fill: 'white' }}
								/>
							) : (
								<WifiIcon
									style={{ color: 'white', fill: 'white' }}
								/>
							)}
						</span>
						<font color="white" style={{ fontSize: '8px' }}>
							{this.getConnectionInfo()}{' '}
							{T.translate('header.connection')}
						</font>
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
