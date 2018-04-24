// @ts-check
import React, { Component } from 'react'
import { TitleBar } from 'electron-react-titlebar'
import 'electron-react-titlebar/assets/style.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import logo from '../assets/images/verge-symbol.png'
// import '../resources/css/menu_wave.css';
import T from 'i18n-react'
import { inject, observer } from 'mobx-react'

@inject('SettingsStore')
@observer
export default class App extends Component {
	render() {
		const language = this.props.SettingsStore.getLocaleId
		const dictionary = require(`../translations/${language}.json`)
		T.setTexts(dictionary)
		return (
			<div className="main-layer">
				<TitleBar disableMaximize={true} icon={logo} />
				<Header />
				{this.props.children}
				<Footer />
			</div>
		)
	}
}
