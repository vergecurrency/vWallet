import 'electron-react-titlebar/assets/style.css'

import * as React from 'react'

import { inject, observer } from 'mobx-react'

import AccountBar from '../components/AccountBar'
import ContentContainer from './ContentContainer'
import Header from '../components/Header/Header'
import i18nReact from 'i18n-react'
import { TitleBar } from 'electron-react-titlebar'
import { SettingsStore } from '../stores/SettingsStore'

class App extends React.Component<{ SettingsStore?: SettingsStore }> {
  render() {
    const language = this.props.SettingsStore!.getLocaleId
    const dictionary = require(`../translations/${language}.json`)
    i18nReact.setTexts(dictionary)
    return (
      <div className="main-layer">
        <TitleBar disableMaximize={true} menu={[]} />
        <Header />
        <AccountBar />
        <ContentContainer>{this.props.children}</ContentContainer>
      </div>
    )
  }
}

export default inject('SettingsStore')(observer(App))
