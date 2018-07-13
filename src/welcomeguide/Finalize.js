import React from 'react'
import Step from './Step'
import PropTypes from 'prop-types'

import Chart from '../assets/images/intronanimations/chart.gif'
import CheckMark from '../assets/images/intronanimations/checkmark.gif'
import Customize from '../assets/images/intronanimations/customize.gif'
import Pencil from '../assets/images/intronanimations/pencil.gif'
import Rocket from '../assets/images/intronanimations/rocket.gif'

import AnimatedTarget from './AnimationTarget'
import { inject, observer } from 'mobx-react'

class Finalize extends React.Component {
  constructor(props) {
    super(props)
    this.state = { id: 0, END: 4 }
    this.interval = null
  }
  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({ id: this.state.id + 1 })
      if (this.state.id > this.state.END) {
        // mark setup as done!
        this.props.SetupStore.setSetup(false)
        // Redirect to the wallet.
        window.location.href = '/index.html#/'
        // Remove the interval.
        clearInterval(this.interval)
      }
    }, 2000)
  }

  render() {
    return (
      <Step step="/finalize">
        {this.state.id === 0 ? (
          <AnimatedTarget image={Customize} text="Creating Wallet ..." />
        ) : null}
        {this.state.id === 1 ? (
          <AnimatedTarget image={Chart} text="Making Charts ready ..." />
        ) : null}
        {this.state.id === 2 ? (
          <AnimatedTarget image={Pencil} text="Drawing some stuff ..." />
        ) : null}
        {this.state.id === 3 ? (
          <AnimatedTarget image={Rocket} text="Mooning your wallet ..." />
        ) : null}
        {this.state.id === 4 ? (
          <AnimatedTarget image={CheckMark} text="Done! Welcome." />
        ) : null}
      </Step>
    )
  }
}

Finalize.propTypes = {
  SetupStore: PropTypes.any,
}

export default inject('SetupStore')(observer(Finalize))
