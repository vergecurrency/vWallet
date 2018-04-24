import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import tr from 'tor-request'

tr.setTorAddress('localhost', 9089)

@inject('SettingsStore')
@observer
export default class Footer extends Component {
	constructor(props) {
		super(props)
		this.state = {
			price: 'Loading ...',
			cap: '',
			hourChange: '',
			dayChange: '',
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
		this.formatter = new Intl.NumberFormat(
			this.props.SettingsStore.getLocaleId,
			{
				style: 'currency',
				currency: this.props.SettingsStore.getCurrency,
				minimumFractionDigits: 6,
				// the default value for minimumFractionDigits depends on the currency
				// and is usually already 2
			}
		)

		this.capFormatter = new Intl.NumberFormat(
			this.props.SettingsStore.getLocaleId,
			{
				style: 'currency',
				currency: this.props.SettingsStore.getCurrency,
				minimumFractionDigits: 2,
			}
		)
		return (
			<div id="footer">
				<div className="container">
					<div className="row">
						<div
							className="col-md-2"
							style={{ textAlign: 'center', color: 'white' }}
						>
							XVG Price: <br />
							{this.formatter.format(this.state.price)}
						</div>
						<div
							className="col-md-2"
							style={{ textAlign: 'center', color: 'white' }}
						>
							Market Cap: <br />
							{this.capFormatter.format(this.state.cap)}
						</div>
						<div
							className="col-md-4"
							style={{
								textAlign: 'center',
								margin: 'auto 0',
								fontWeight: 'bold',
							}}
						>
							Verge 2008 - 2017 | <em>the privacy coin.</em>
						</div>
						<div
							className="col-md-2"
							style={{ textAlign: 'center', color: 'white' }}
						>
							1H Change (%) <br />
							{this.state.hourChange} %
						</div>
						<div
							className="col-md-2"
							style={{ textAlign: 'center', color: 'white' }}
						>
							24H Change (%) <br />
							{this.state.dayChange} %
						</div>
					</div>
				</div>
			</div>
		)
	}
}
