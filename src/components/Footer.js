import React, { Component } from 'react'
import CreditsPanel from './modal/CreditsPanel'
import T from 'i18n-react'

export default class Footer extends Component {
	constructor(props) {
		super(props)
		this.state = {
			credits: false,
		}

		this.toggle = this.toggle.bind(this)
	}

	toggle(item) {
		return () => this.setState({ [item]: !this.state[item] })
	}

	render() {
		return (
			<div className="container footer">
				<CreditsPanel
					toggle={this.toggle('credits')}
					open={this.state.credits}
				/>
				<div className="row">
					<div className="col-md-8">
						{T.translate('footer.wallet')} v.0.0.3 (alpha)
					</div>
					<div style={{ textAlign: 'center' }} className="col-md-2">
						{T.translate('footer.explorer')}
					</div>
					<div style={{ textAlign: 'center' }} className="col-md-1">
						{T.translate('footer.donate')}
					</div>
					<div
						style={{ textAlign: 'center' }}
						className="col-md-1"
						onClick={this.toggle('credits')}
					>
						{T.translate('footer.credits')}
					</div>
				</div>
			</div>
		)
	}
}
