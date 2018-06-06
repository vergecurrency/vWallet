import 'electron-react-titlebar/assets/style.css'

import * as React from 'react'

import { inject, observer } from 'mobx-react'

import AccountBar from '../components/AccountBar'
import ContentContainer from './ContentContainer'
import Header from '../components/Header/Header'
import T from 'i18n-react'
import { TitleBar } from 'electron-react-titlebar'

const App = ({ SettingsStore, children }) => {
  const language = SettingsStore.getLocaleId
  const dictionary = require(`../translations/${language}.json`)
  T.setTexts(dictionary)
  return (
    <div className="main-layer">
      <TitleBar disableMaximize={true} menu={[]} />
      <Header />
      <AccountBar />
      <ContentContainer>{children}</ContentContainer>
    </div>
  )
}

export default inject('SettingsStore')(observer(App))
