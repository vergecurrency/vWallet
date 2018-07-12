import React from 'react'

const AnimationTarget = ({ image, text }) => (
  <div className="tour-animation-container animation-fade">
    <img src={image} className="tour-animation-img"/>
    <p className="tour-animation-title">{text}</p>
  </div>
)

export default AnimationTarget
