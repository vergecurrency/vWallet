import React, { Component } from 'react';
import Switch from 'rc-switch';
import tr from 'tor-request';

tr.setTorAddress('localhost', 9089);

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
  // the default value for minimumFractionDigits depends on the currency
  // and is usually already 2
});

export default class Statistics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: 'Loading ...',
      cap: '',
      hourChange: '',
      dayChange: ''
    };
  }

  componentDidMount() {
    tr.request('https://api.coinmarketcap.com/v1/ticker/verge/', (err, res, body) => {
      if (!err && res.statusCode === 200) {
        console.log(body);
        const [resJson] = JSON.parse(body);
        this.setState({
          price: `${resJson.price_usd} $`,
          cap: formatter.format(Number(resJson.market_cap_usd)),
          hourChange: resJson.percent_change_1h,
          dayChange: resJson.percent_change_24h
        });
      } else {
        console.error(err);
      }
    });

    /* fetch('https://api.coinmarketcap.com/v1/ticker/verge/')
      .then(res => res.ok && res.json())
      .then(([resJson]) =>
        this.setState({
          price: `${resJson.price_usd} $`,
          cap: formatter.format(Number(resJson.market_cap_usd)),
          hourChange: resJson.percent_change_1h,
          dayChange: resJson.percent_change_24h
        }))
      .catch(console.error); */
  }

  render() {
    return (
      <div id="footer">
        <div className="container">
          <div className="row">
            <div className="col-md-2" style={{ textAlign: 'center', color: 'white' }}>
              XVG Price (USD): <br />
              {this.state.price}
            </div>
            <div className="col-md-2" style={{ textAlign: 'center', color: 'white' }}>
              Market Cap: <br />
              {this.state.cap}
            </div>
            <div
              className="col-md-4"
              style={{ textAlign: 'center', margin: 'auto 0', fontWeight: 'bold' }}
            >
              Verge 2008 - 2017 | <em>the privacy coin.</em>
            </div>
            <div className="col-md-2" style={{ textAlign: 'center', color: 'white' }}>
              1H Change (%) <br />
              {this.state.hourChange} %
            </div>
            <div className="col-md-2" style={{ textAlign: 'center', color: 'white' }}>
              24H Change (%) <br />
              {this.state.dayChange} %
            </div>
          </div>
        </div>
      </div>
    );
  }
}
