import React, { Component } from 'react'
import CreditsPanel from './modal/CreditsPanel'
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
          <div className="col-md-8">Official Verge Wallet v.0.0.3 (alpha)</div>
          <div style={{ textAlign: 'center' }} className="col-md-2">
            Go to Blockchain Explorer
          </div>
          <div style={{ textAlign: 'center' }} className="col-md-1">
            Donate
          </div>
          <div
            style={{ textAlign: 'center' }}
            className="col-md-1"
            onClick={this.toggle('credits')}
          >
            Credits
          </div>
        </div>
      </div>
    )
  }
}
