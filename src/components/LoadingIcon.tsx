import * as React from 'react'

const LoadingIcon = ({ height, width, color, strokeWidth }) => (
  <svg
    width={width ? width : '24'}
    height={height ? height : '24'}
    viewBox="0 0 38 38"
    xmlns="http://www.w3.org/2000/svg"
    stroke={color ? color : '#467698'}
  >
    <g fill="none" fillRule="evenodd">
      <g
        transform="translate(1 1)"
        strokeWidth={strokeWidth ? strokeWidth : '2'}
      >
        <circle strokeOpacity=".5" cx="18" cy="18" r="18" />
        <path d="M36 18c0-9.94-8.06-18-18-18">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 18 18"
            to="360 18 18"
            dur="1s"
            repeatCount="indefinite"
          />
        </path>
      </g>
    </g>
  </svg>
)

export default LoadingIcon
