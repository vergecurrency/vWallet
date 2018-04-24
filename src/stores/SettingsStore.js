import { observable, action, computed } from 'mobx'

class SettingsStore {
	@observable
	settings = {
		locale: 'English',
		currency: 'USD',
		symbol: '$',
		localeId: 'en',
	}

	@action
	setSettingOption = option => {
		this.settings[option.key] = option.value
	}

	@computed
	get getLocale() {
		return this.settings.locale
	}

	@computed
	get getCurrency() {
		return this.settings.currency
	}
	@computed
	get getCurrencySymbol() {
		return this.settings.symbol
	}

	@computed
	get getLocaleId() {
		return this.settings.localeId
	}
}

const store = new SettingsStore()
export default store
