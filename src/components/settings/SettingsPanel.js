import React, { Component } from 'react'
import RegionSetting from './RegionSetting'
import Keymap from './keymaps/Keymap'

const settingOptions = [RegionSetting]

const keyMapList = [
	{
		name: 'Quick Send',
		keyName: 'CTRL/CMD + S',
		usage: 'Opens the transaction form to send XVG.',
	},
	{
		name: 'Show/Hide personal Information',
		keyName: 'CTRL/CMD + H',
		usage:
			'Hides all personal data, like transactions, balance etc. and replaces them with placeholders.',
	},
	{
		name: 'Lock Wallet',
		keyName: 'CTRL/CMD + L',
		usage:
			'This locks your wallet, which means that you won`t be able to perform some of the offered options until you enter your password again (send XVG etc.).',
	},
]
export default class HomePage extends Component {
	props: Props

	render() {
		return (
			<div className="container" style={{ paddingTop: '75px' }}>
				<h3 style={{ color: 'white' }}>Settings Overview</h3>
				<div className="row">
					<div className="container-fluid">
						<div className="row">
							<div className="col-md-4" />
							<div className="col-md-2" />
							<div className="col-md-6">
								<h5 style={{ color: 'white' }}>Explaination</h5>
							</div>
						</div>
						{settingOptions.map(Item => <Item />)}
					</div>
				</div>
				<hr />
				<h3 style={{ color: 'white' }}>Keymap Overview</h3>
				<div className="row">
					<div className="container-fluid">
						<div className="row">
							<div className="col-md-4" />
							<div className="col-md-2" />
							<div className="col-md-6">
								<h5 style={{ color: 'white' }}>Usage</h5>
							</div>
						</div>
						{keyMapList.map(keyItem => <Keymap {...keyItem} />)}
					</div>
				</div>
			</div>
		)
	}
}
