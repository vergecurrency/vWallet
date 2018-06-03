import PropTypes from 'prop-types'
import React from 'react'

const CurrencySymbol = ({ fontSize, color }) => (
  <svg
    viewBox="0 0 100 100"
    width={fontSize}
    height={fontSize}
    style={{ fill: color, stroke: color }}
  >
    <path d="M48.5 95.4L16 6.8h9.4l.2.5 23.5 64.1L76.5 6.8H86L48.5 95.4z" />
    <path d="M17 40.2h65.2l2.5-5.9H15z" />
    <path d="M17 40.2h65.2l2.5-5.9H15z" />
    <path d="M15 34.3l2 5.9h65.2l2.5-5.9z" />
    <g>
      <path d="M22.2 55.4h53.5l2.5-5.9h-58z" />
      <path d="M22.2 55.4h53.5l2.5-5.9h-58z" />
      <path d="M20.2 49.5l2 5.9h53.5l2.5-5.9z" />
    </g>
  </svg>
)

CurrencySymbol.propTypes = {
  fontSize: PropTypes.number,
  color: PropTypes.string,
}

export default CurrencySymbol
