import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import tr from 'tor-request'

tr.setTorAddress('localhost', 9089)

@inject('SettingsStore')
@observer
export default class Statistics extends Component {
	constructor(props) {
		super(props)
		this.state = {
			price: 'Loading ...',
			cap: '',
			hourChange: '',
			dayChange: '',
			weekChange: '',
			rank: 1,
		}
	}

	componentDidMount() {
		setInterval(() => {
			tr.request(
				`https://api.coinmarketcap.com/v1/ticker/verge/?convert=${
					this.props.SettingsStore.getCurrency
				}`,
				(err, res, body) => {
					if (!err && res.statusCode === 200) {
						console.log(body)
						const [resJson] = JSON.parse(body)
						const currency = this.props.SettingsStore.getCurrency
						this.setState({
							price: Number(
								`${resJson[`price_${currency.toLowerCase()}`]}`
							),
							price_btc: resJson.price_btc,
							rank: resJson.rank,
							cap: Number(
								resJson[`market_cap_${currency.toLowerCase()}`]
							),
							hourChange: resJson.percent_change_1h,
							dayChange: resJson.percent_change_24h,
						})
					} else {
						console.error(err)
					}
				}
			)
		}, 5000)
	}

	render() {
		const formatter = new Intl.NumberFormat(
			this.props.SettingsStore.getLocale,
			{
				style: 'currency',
				currency: this.props.SettingsStore.getCurrency,
				minimumFractionDigits: 6,
				// the default value for minimumFractionDigits depends on the currency
				// and is usually already 2
			}
		)

		const bigNumber = new Intl.NumberFormat(
			this.props.SettingsStore.getLocale,
			{
				style: 'currency',
				currency: this.props.SettingsStore.getCurrency,
				minimumFractionDigits: 2,
				// the default value for minimumFractionDigits depends on the currency
				// and is usually already 2
			}
		)
		return (
			<div className="container statistic">
				<div className="row">
					<div
						className="col-md-12"
						style={{ marginTop: '25px', marginLeft: '15px' }}
					>
						<div className="trans-title">Price Statistics</div>
					</div>
				</div>
				<hr />
				<div className="row stats-item">
					<div className="col-md-5">
						XVG/{this.props.SettingsStore.getCurrency} Price
					</div>
					<div className="col-md-7">
						{formatter.format(this.state.price)}
					</div>
				</div>
				<div className="row stats-item">
					<div className="col-md-5">Market Cap</div>
					<div className="col-md-7">
						{bigNumber.format(this.state.cap)}
					</div>
				</div>
				<div className="row stats-item">
					<div className="col-md-5">1 hour change</div>
					<div className="col-md-7">{this.state.hourChange} %</div>
				</div>
				<div className="row stats-item">
					<div className="col-md-5">24 hour change</div>
					<div className="col-md-7">{this.state.dayChange} %</div>
				</div>
				<div className="row stats-item">
					<div className="col-md-5">CMC Postion</div>
					<div className="col-md-7">{this.state.rank}.</div>
				</div>
			</div>
		)
	}
}
