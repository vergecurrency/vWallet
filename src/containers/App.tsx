import 'electron-react-titlebar/assets/style.css'

import * as React from 'react'

import { inject, observer } from 'mobx-react'

import AccountBar from '../components/AccountBar'
import ContentContainer from './ContentContainer'
import Header from '../components/Header/Header'
import { TitleBar } from 'electron-react-titlebar'
import { SettingsStore } from '../stores/SettingsStore'
import { platform } from 'os'

class App extends React.Component<{ SettingsStore?: SettingsStore }> {
  render() {
    return (
      <div className="main-layer">
        <TitleBar menu={[]} className={platform()} />
        <Header />
        <AccountBar />
        <ContentContainer>{this.props.children}</ContentContainer>
      </div>
    )
  }
}

export default inject('SettingsStore')(observer(App))
