import React from 'react'

export default ({ name, keyName, usage }) => (
  <div className="row" style={{ height: '75px' }}>
    <div
      className="col-md-4"
      style={{ color: 'white', fontFamily: 'AvenirNextLTW01Bold' }}
    >
      {name}
    </div>
    <div
      className="col-md-2"
      style={{ color: 'white', fontFamily: 'AvenirNextLTW01Regular' }}
    >
      {keyName}
    </div>
    <div className="col-md-6">
      <font
        style={{
          color: 'lightgray',
          fontFamily: 'AvenirNextLTW01Italic',
        }}
      >
        {usage}
      </font>
    </div>
  </div>
)
