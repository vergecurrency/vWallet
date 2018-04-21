// @ts-check
import React, { Component } from 'react'
import { TitleBar } from 'electron-react-titlebar'
import 'electron-react-titlebar/assets/style.css'
import Header from '../components/Header'
import Footer from '../components/Footer'

// import '../resources/css/menu_wave.css';

export default class App extends Component {
  render() {
    return (
      <div>
        <TitleBar />
        <Header />
        {this.props.children}
        <Footer />
      </div>
    )
  }
}
