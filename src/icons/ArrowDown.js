import React from 'react'

const ArrowDown = props => (
  <svg
    version={1.1}
    id="Lag_1"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 24 24"
    style={{ enableBackground: 'new 0 0 24 24' }}
    xmlSpace="preserve"
    {...props}
  >
    <line className="arrow-down" x1={12} y1={5} x2={12} y2={19} />
    <polyline className="arrow-down" points="19,12 12,19 5,12 " />
  </svg>
)

export default ArrowDown
