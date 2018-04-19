import React, { Component } from 'react';
import verge from 'node-verge';

const vergeConnection = () => verge().auth('kyon', 'lolcat');
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
  // the default value for minimumFractionDigits depends on the currency
  // and is usually already 2
});

export default class AccountBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: 0,
      usd_exchange: 0
    };
  }

  componentDidMount() {
    vergeConnection().getBalance((err, balance) =>
      this.setState({ balance: Number(balance), usd_exchange: 0.0765 }));
  }

  render() {
    return (
      <div className="button-header">
        <div className="container">
          <div className="row">
            <div className="col-md-8" style={{ textAlign: 'left', fontWeight: 'bold' }}>
              <h3 style={{ color: 'rgb(0, 203, 255' }}>
                {formatter.format(this.state.balance * this.state.usd_exchange)} /{' '}
                {this.state.balance} XVG
              </h3>
            </div>
            <div className="col-md-2" style={{ textAlign: 'center' }}>
              <img
                src="resources/assets/Send.png"
                style={{ maxHeight: '60px', marginLeft: '25px', paddingBottom: '20px' }}
                alt="send xvg"
              />
            </div>
            <div className="col-md-2" style={{ textAlign: 'center' }}>
              <img
                src="resources/assets/receive.png"
                style={{ maxHeight: '60px', marginLeft: '25px', paddingBottom: '20px' }}
                alt="send xvg"
              />
            </div>
          </div>
        </div>
      </div>
    );
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
