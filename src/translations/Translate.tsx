import * as React from 'react'
import * as PropTypes from 'prop-types'
import i18nReact from 'i18n-react'

class Translate extends React.Component<{ text: string }> {
  static contextTypes = {
    langauge: PropTypes.string.isRequired,
  }

  render() {
    return i18nReact.translate(this.props.text, {
      locale: this.context.language,
    })
  }
}

export default Translate
