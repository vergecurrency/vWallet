import React, { Component } from 'react'

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  // the default value for minimumFractionDigits depends on the currency
  // and is usually already 2
})

export default class Statistics extends Component {
  constructor(props) {
    super(props)
    this.state = {
      price: 'Loading ...',
      cap: '',
      hourChange: '',
      dayChange: '',
      weekChange: '',
    }
  }

  componentDidMount() {
    console.log('hi')
    fetch('https://api.coinmarketcap.com/v1/ticker/verge/')
      .then(res => res.ok && res.json())
      .then(([resJson]) =>
        this.setState({
          price: `${resJson.price_usd} $`,
          cap: formatter.format(Number(resJson.market_cap_usd)),
          hourChange: resJson.percent_change_1h,
          dayChange: resJson.percent_change_24h,
          weekChange: resJson.percent_change_7d,
        })
      )
      .catch(console.error)
  }

  render() {
    return (
      <div className="container">
        <div className="row" style={{ marginTop: '50px' }}>
          <div className="col-md-12">
            <table className="table">
              <thead>
                <tr>
                  <th>XVG Price (USD)</th>
                  <th>Market Cap (USD)</th>
                  <th>1H Change (%)</th>
                  <th>24H Change (%)</th>
                  <th>7D Change (%)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{this.state.price}</td>
                  <td>{this.state.cap}</td>
                  <td>{this.state.hourChange}</td>
                  <td>{this.state.dayChange}</td>
                  <td>{this.state.weekChange}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}
