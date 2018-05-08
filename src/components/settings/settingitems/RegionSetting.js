import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import {
	Dropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
} from 'reactstrap'
import T from 'i18n-react'
import styled from 'styled-components'

const locales = [
	{
		name: 'German',
		localeId: 'de',
	},
	{
		name: 'English',
		localeId: 'en',
	},
	{
		name: 'Dansk',
		localeId: 'da',
	},
]

const Row = styled.div`
	display: flex;
	align-content: center;
	align-items: center;
	height: 75px;
`

@inject('SettingsStore')
@observer
export default class RegionSetting extends Component {
	constructor(props) {
		super(props)
		this.toggle = this.toggle.bind(this)
		this.state = {
			dropdownOpen: false,
		}
	}

	toggle() {
		this.setState({
			dropdownOpen: !this.state.dropdownOpen,
		})
	}

	render() {
		return (
			<Row className="row">
				<div className="col-md-4">
					<font
						style={{
							color: '#476b84',
							fontSize: 18,
							fontWeight: 500,
						}}
					>
						{T.translate('settings.region.name')}
					</font>
				</div>
				<div className="col-md-2">
					<Dropdown
						isOpen={this.state.dropdownOpen}
						toggle={this.toggle}
					>
						<DropdownToggle
							caret
							style={{
								backgroundColor: 'transparent',
								border: '1 solid #dcdcdc',
								boxShadow: 'inset 0 1 4 rgba(0, 0, 0, 0.09)',
								margin: '0 auto',
								color: '#5b5a5a',
							}}
						>
							{this.props.SettingsStore.getName}
						</DropdownToggle>
						<DropdownMenu>
							{locales.map(locale => (
								<DropdownItem
									onClick={() => {
										this.props.SettingsStore.setSettingOption(
											{
												key: 'name',
												value: locale.name,
											}
										)
										this.props.SettingsStore.setSettingOption(
											{
												key: 'localeId',
												value: locale.localeId,
											}
										)
									}}
								>
									{locale.name}
								</DropdownItem>
							))}
						</DropdownMenu>
					</Dropdown>{' '}
				</div>
				<div className="col-md-6">
					<font
						style={{
							color: '#647e90',
							fontSize: 15,
							fontStyle: 'italic',
							fontFamily: 'AvenirNextLTW01Italic',
						}}
					>
						{T.translate('settings.region.explain')}
					</font>
				</div>
			</Row>
		)
	}
}
