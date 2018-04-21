import React, { Component } from 'react'
import RegionSetting from './RegionSetting'

const settingOptions = [RegionSetting]

export default class HomePage extends Component {
  props: Props

  render() {
    return (
      <div className="container" style={{ paddingTop: '75px' }}>
        <h3 style={{ color: 'white' }}>Settings Overview</h3>
        <div className="row">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-4" />
              <div className="col-md-2" />
              <div className="col-md-6">
                <h5 style={{ color: 'white' }}>Explaination</h5>
              </div>
            </div>
            {settingOptions.map(Item => <Item />)}
          </div>
        </div>
      </div>
    )
  }
}
