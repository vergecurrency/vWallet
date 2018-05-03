import React, { Component } from 'react'

export default class Footer extends Component {
	render() {
		return (
			<div className="container footer">
				<div className="row">
					<div className="col-md-7">
						Official Verge Wallet v.0.0.3 (alpha)
					</div>
					<div style={{ textAlign: 'center' }} className="col-md-3">
						Go to Blockchain Explorer
					</div>
					<div style={{ textAlign: 'center' }} className="col-md-1">
						Donate
					</div>
					<div style={{ textAlign: 'center' }} className="col-md-1">
						Credits
					</div>
				</div>
			</div>
		)
	}
}
