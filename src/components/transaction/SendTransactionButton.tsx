import * as React from 'react'
import { i18n } from 'i18next'
import { translate } from 'react-i18next'
import { observer } from 'mobx-react'
import SendState from '../../utils/SendState'
import Fee from '../../utils/Fee'

interface SendTransactionButtonInterface {
  label: string
  status: SendState
  amount: number
  price: number
  localeId: string
  error: string | null
  onClick: () => void
  i18n?: i18n
}

class SendTransactionButton extends React.Component<SendTransactionButtonInterface> {
  render () {
    return (
      <button className="btn btn-lg" onClick={this.props.onClick.bind(this)}>
        {this.props.children}
        {this.props.status === SendState.OPEN &&
        `${this.props.label}${' '}
          ${
          this.props.amount
            ? `${this.props.amount.toLocaleString(
            this.props.localeId,
            )} XVG ($${(this.props.amount * this.props.price).toLocaleString(
            this.props.localeId,
            )}) + ${Fee.toLocaleString(this.props.localeId)} XVG Fee`
            : ''
          }`}
        {this.props.status === SendState.SENDING &&
        this.props.i18n!.t('sendPanel.sending')}
        {this.props.status === SendState.ERROR && this.props.error}
        {this.props.status === SendState.DONE &&
        this.props.i18n!.t('sendPanel.sent')}
      </button>
    )
  }
}

export default translate()(
  observer(SendTransactionButton),
)
