import * as React from 'react'
import * as PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'
import i18nReact from 'i18n-react'
import { SettingsStore } from './stores/SettingsStore'

class LanguageProvider extends React.Component<
  {
    SettingsStore?: SettingsStore
  },
  { language: string }
> {
  state = { language: '' }

  static childContextTypes = {
    language: PropTypes.string.isRequired,
  }

  getChildContext() {
    return {
      language: this.state.language,
    }
  }

  render() {
    const { children, SettingsStore } = this.props
    const language = SettingsStore!.getLocaleId
    const dictionary = require(`./translations/${language}.json`)
    i18nReact.setTexts(dictionary)

    if (this.state.language !== language) this.setState({ language })

    return <div>{children}</div>
  }
}

export default inject('SettingsStore')(observer(LanguageProvider))
