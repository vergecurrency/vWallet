import React from 'react'

const ArrowUp = props => (
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
    <line className="arrow-up" x1={12} y1={19} x2={12} y2={5} />
    <polyline className="arrow-up" points="5,12 12,5 19,12 " />
  </svg>
)

export default ArrowUp
