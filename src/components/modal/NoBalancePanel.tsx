import * as React from 'react'
import ScaleBalanceIcon from 'react-material-icon-svg/dist/ScaleBalanceIcon'
import { i18n } from 'i18next'
import { observer } from 'mobx-react'
import { translate } from 'react-i18next'

interface NoBalancePanelProps {
  title: string
  open: boolean
  toggle: (() => void) & ((event: Event) => void)
  className: string
  i18n?: i18n
}

import Modal from '../Modal'

class NoBalancePanel extends React.Component<NoBalancePanelProps> {
  render() {
    return (
      <Modal
        {...this.props}
        title={this.props.title}
        className={`no-balance-modal ${this.props.className}`}
      >
        <ScaleBalanceIcon width={100} height={100} fill="#d6dee2" />
        <p className="no-balance-title">
          {this.props.i18n!.t('sendPanel.notEnoughBalance')}
        </p>
        <p className="no-balance-subtitle">
          {this.props.i18n!.t('sendPanel.notEnoughBalanceDescription')}
        </p>
      </Modal>
    )
  }
}

export default translate()(observer(NoBalancePanel))
