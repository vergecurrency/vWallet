// @ts-check
import React, { Component } from 'react'
import { TitleBar } from 'electron-react-titlebar'
import 'electron-react-titlebar/assets/style.css'
import Header from '../components/Header/Header'
import Footer from '../components/Footer'
import logo from '../assets/images/verge-symbol.png'
// import '../resources/css/menu_wave.css';
import T from 'i18n-react'
import { inject, observer } from 'mobx-react'
import ContentContainer from './ContentContainer'
import AccountBar from '../components/AccountBar'

@inject('SettingsStore')
@observer
export default class App extends Component {
	render() {
		const language = this.props.SettingsStore.getLocaleId
		const dictionary = require(`../translations/${language}.json`)
		T.setTexts(dictionary)
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
