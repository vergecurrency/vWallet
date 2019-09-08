import 'electron-react-titlebar/assets/style.css'

import * as React from 'react'

import { inject, observer } from 'mobx-react'

import AccountBar from '../components/AccountBar'
import ContentContainer from './ContentContainer'
import Header from '../components/Header/Header'
import { TitleBar } from 'electron-react-titlebar'
import { SettingsStore } from '../stores/SettingsStore'
import { platform } from 'os'

const { remote } = require('electron')

const MODE = remote.getGlobal('process').env
  ? remote.getGlobal('process').env.NODE_ENV
  : 'prod'

let showMockingWarning = false
if (MODE === 'dev') {
  showMockingWarning = true
}

class App extends React.Component<{ SettingsStore?: SettingsStore }> {
  render() {
    return (
      <div className="main-layer">
        <TitleBar menu={[]} className={platform()} />
        {showMockingWarning && (
          <div className="mocking-warning">
            Your using the dev mode. Don't send any xvg to this wallet!
          </div>
        )}
        <Header />
        <AccountBar />
        <ContentContainer>{this.props.children}</ContentContainer>
      </div>
    )
  }
}

export default inject('SettingsStore')(observer(App))
