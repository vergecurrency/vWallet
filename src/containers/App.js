import 'electron-react-titlebar/assets/style.css'

// @ts-check
import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import AccountBar from '../components/AccountBar'
import ContentContainer from './ContentContainer'
import Footer from '../components/Footer'
import Header from '../components/Header/Header'
import T from 'i18n-react'
import { TitleBar } from 'electron-react-titlebar'
import logo from '../assets/images/verge-symbol.png'
import styled from 'styled-components'

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
