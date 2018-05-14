import React from 'react'
import { TitleBar } from 'electron-react-titlebar'
import styled from 'styled-components'
import Step from './Step'
import { Link, Redirect } from 'react-router-dom'
import { shell } from 'electron'
import ElectronStore from 'electron-store'
const electronStore = new ElectronStore({
  encryptionKey: new Buffer('vergecurrency'),
})

import Chart from '../assets/images/intronanimations/chart.gif'
import CheckMark from '../assets/images/intronanimations/checkmark.gif'
import Customize from '../assets/images/intronanimations/customize.gif'
import Pencil from '../assets/images/intronanimations/pencil.gif'
import Rocket from '../assets/images/intronanimations/rocket.gif'
import AnimatedTarget from './AnimationTarget'
import { createFalse } from 'typescript'
import { inject, observer } from 'mobx-react'

@inject('SetupStore')
@observer
export default class Finalize extends React.Component {
  constructor(props) {
    super(props)
    this.state = { id: 0, END: 4 }
    this.interval = null
  }
  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({ id: this.state.id + 1 })
      if (this.state.id > this.state.END) {
        this.props.SetupStore.setSetup(false) // mark setup as done!
      }
    }, 2000)
  }

  render() {
    return (
      <Step>
        {this.state.id === 0 ? (
          <AnimatedTarget
            image={Customize}
            text="Creating Wallet ..."
          />
        ) : null}
        {this.state.id === 1 ? (
          <AnimatedTarget
            image={Chart}
            text="Making Charts ready ..."
          />
        ) : null}
        {this.state.id === 2 ? (
          <AnimatedTarget
            image={Pencil}
            text="Drawing some stuff ..."
          />
        ) : null}
        {this.state.id === 3 ? (
          <AnimatedTarget
            image={Rocket}
            text="Mooning your wallet ..."
          />
        ) : null}
        {this.state.id === 4 ? (
          <AnimatedTarget image={CheckMark} text="Done! Welcome." />
        ) : null}
        {this.state.id === 5 ? <Redirect to="/" /> : null}
      </Step>
    )
  }
}
