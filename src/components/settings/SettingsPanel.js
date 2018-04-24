import React, { Component } from 'react'
import RegionSetting from './RegionSetting'
import Keymap from './keymaps/Keymap'
import T from 'i18n-react'
import { inject, observer } from 'mobx-react'

const settingOptions = [RegionSetting]

@inject('SettingsStore')
@observer
export default class SettingsPanel extends Component {
	getKeyMaps() {
		const id = this.props.SettingsStore.getLocaleId
		return [
			{
				name: T.translate('settings.shortkey.quicksend.name'),
				keyName: 'CTRL/CMD + S',
				usage: T.translate('settings.shortkey.quicksend.usage'),
			},
			{
				name: T.translate('settings.shortkey.hideinformation.name'),
				keyName: 'CTRL/CMD + H',
				usage: T.translate('settings.shortkey.hideinformation.usage'),
			},
			{
				name: T.translate('settings.shortkey.lockwallet.name'),
				keyName: 'CTRL/CMD + L',
				usage: T.translate('settings.shortkey.lockwallet.usage'),
			},
		]
	}

	render() {
		return (
			<div className="container" style={{ paddingTop: '75px' }}>
				<h3 style={{ color: 'white' }}>
					{T.translate('settings.title')}
				</h3>
				<div className="row">
					<div className="container-fluid">
						<div className="row">
							<div className="col-md-4" />
							<div className="col-md-2" />
							<div className="col-md-6">
								<h5 style={{ color: 'white' }}>
									{T.translate('settings.explaination')}
								</h5>
							</div>
						</div>
						{settingOptions.map(Item => <Item />)}
					</div>
				</div>
				<hr />
				<h3 style={{ color: 'white' }}>
					{T.translate('settings.keymap')}
				</h3>
				<div className="row">
					<div className="container-fluid">
						<div className="row">
							<div className="col-md-4" />
							<div className="col-md-2" />
							<div className="col-md-6">
								<h5 style={{ color: 'white' }}>
									{T.translate('settings.usage')}
								</h5>
							</div>
						</div>
						{this.getKeyMaps().map(keyItem => (
							<Keymap {...keyItem} />
						))}
					</div>
				</div>
			</div>
		)
	}
}
