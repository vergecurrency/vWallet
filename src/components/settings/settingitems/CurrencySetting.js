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
		currency: 'EUR',
		locale: 'de-DE',
	},
	{
		currency: 'USD',
		locale: 'en-US',
	},
	{
		currency: 'DKK',
		locale: 'da-DK',
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
						{T.translate('settings.currency.name')}
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
							{this.props.SettingsStore.getCurrency}
						</DropdownToggle>
						<DropdownMenu>
							{locales.map(locale => (
								<DropdownItem
									onClick={() => {
										this.props.SettingsStore.setSettingOption(
											{
												key: 'currency',
												value: locale.currency,
											}
										)
										this.props.SettingsStore.setSettingOption(
											{
												key: 'locale',
												value: locale.locale,
											}
										)
									}}
								>
									{locale.currency}{' '}
									<em>
										({new Intl.NumberFormat(locale.locale, {
											style: 'currency',
											currency: locale.currency,
											minimumFractionDigits: 2,
											// the default value for minimumFractionDigits depends on the currency
											// and is usually already 2
										}).format(1234567.089)})
									</em>
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
						{T.translate('settings.currency.explain')}
					</font>
				</div>
			</Row>
		)
	}
}
