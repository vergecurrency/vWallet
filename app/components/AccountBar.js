import React, { Component } from 'react'
import { Client } from 'verge-node-typescript'

const vergeConnection = () => new Client({ user: 'kyon', pass: 'lolcat' })
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  // the default value for minimumFractionDigits depends on the currency
  // and is usually already 2
})

export default class AccountBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      balance: 0,
      usd_exchange: 0,
    }
  }

  componentDidMount() {
    /*vergeConnection()
      .getBalance()
      .then(balance => this.setState({ balance, usd_exchange: 0.0765 }))
      .catch(console.error)*/
  }

  render() {
    return (
      <div className="button-header">
        <div className="container">
          <div className="row">
            <div
              className="col-md-8"
              style={{ textAlign: 'left', fontWeight: 'bold' }}
            >
              <h3 style={{ color: 'rgb(0, 203, 255' }}>
                {formatter.format(this.state.balance * this.state.usd_exchange)}{' '}
                / {this.state.balance} XVG
              </h3>
            </div>
            <div className="col-md-2" style={{ textAlign: 'center' }}>
              <div
                style={{
                  padding: '10% 10%',
                  marginBottom: '20%',
                  border: '1px solid rgb(0, 203, 255)',
                  borderRadius: '5px',
                }}
              >
                Send
              </div>
            </div>
            <div className="col-md-2" style={{ textAlign: 'center' }}>
              <div
                style={{
                  padding: '10% 10%',
                  marginBottom: '20%',
                  border: '1px solid rgb(0, 203, 255)',
                  borderRadius: '5px',
                }}
              >
                Receive
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
/* <span
            className="text-left"
            style={{
              color: '#00CBFF',
              fontWeight: 'light',
              widht: '50%',
              float: 'left'
            }}
          >

          </span>
          <span
            className="text-right"
            style={{ float: 'right', display: 'inline-block', verticalAlign: 'middle' }}
          >
            <a href="#">
              <img
                src="resources/assets/Send.png"
                style={{ maxHeight: '60px', marginLeft: '25px', paddingBottom: '20px' }}
                alt="send xvg"
              />
            </a>
            <a href="#">
              <img
                src="resources/assets/receive.png"
                style={{ maxHeight: '60px', marginLeft: '25px', paddingBottom: '20px' }}
                alt="receive xvg"
              />
            </a>
          </span> */
