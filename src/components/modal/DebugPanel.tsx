import * as React from 'react'
import { observer, inject } from 'mobx-react'
import Modal from '../Modal'
import i18nReact from 'i18n-react'

import { AccountInformationStore } from '../../stores/AccountInformationStore'

enum DebugCategory {
  GENERAL = 'General',
  NETWORK = 'Network',
  SCRIPTS = 'Scripts',
  POOL = 'Pool',
}

class DebugPanel extends React.Component<{
  open: boolean
  toggle: () => void
  AccountInformationStore?: AccountInformationStore
}> {
  createNewAddress() {
    this.setState({
      isLoadingAddress: true,
    })
    this.props
      .AccountInformationStore!.receiveNewAddress()
      .then(address => this.setState({ address, isLoadingAddress: false }))
  }

  mapValuesToCategory(debugPanelInformation: any[], filterFor: DebugCategory) {
    const mapping = {
      title: DebugCategory.GENERAL,
      version: DebugCategory.GENERAL,
      protocolversion: DebugCategory.GENERAL,
      walletversion: DebugCategory.GENERAL,
      balance: DebugCategory.GENERAL,
      blocks: DebugCategory.GENERAL,
      moneysupply: DebugCategory.GENERAL,
      connections: DebugCategory.NETWORK,
      ip: DebugCategory.NETWORK,
      pow_algo: DebugCategory.SCRIPTS,
      difficulty: DebugCategory.SCRIPTS,
      keypoololdest: DebugCategory.POOL,
      keypoolsize: DebugCategory.POOL,
      paytxfee: DebugCategory.POOL,
      highestBlock: DebugCategory.POOL,
    }

    return debugPanelInformation.filter(
      ({ key }) => mapping[key] && mapping[key] === filterFor,
    )
  }

  mapCategoryToIcon(category: DebugCategory) {
    switch (category) {
      case DebugCategory.GENERAL:
        return <i className="fas fa-info-circle fa-fw" />
      case DebugCategory.NETWORK:
        return <i className="fas fa-users fa-fw" />
      case DebugCategory.POOL:
        return <i className="fab fa-cloudscale fa-fw" />
      case DebugCategory.SCRIPTS:
        return <i className="fas fa-code fa-fw" />
    }
  }

  render() {
    const title: string = i18nReact.translate('debug.title') as string
    const types = [
      DebugCategory.GENERAL,
      DebugCategory.NETWORK,
      DebugCategory.SCRIPTS,
      DebugCategory.POOL,
    ]
    return (
      <Modal
        {...this.props}
        title={title}
      >
        <div style={{ color: '#1d2830' }}>
          {types.map(type => {
            const infos = this.mapValuesToCategory(
              this.props.AccountInformationStore!.debugPanelInformation,
              type,
            ).map(({ key, value }) => {
              return value ? (
                <div className="debug-information-row">
                  <div className="debug-information-row-title">
                    {i18nReact.translate(`debug.${key}`)}
                  </div>
                  <div className="debug-information-row-value">{value}</div>
                </div>
              ) : null
            })
            return (
              <div className="debug-information-section">
                <div className="debug-information-section-title">
                  <div className="debug-information-section-title-icon">
                    {this.mapCategoryToIcon(type)}
                  </div>
                  <div>
                    {i18nReact.translate(`debug.types.${type}`)}
                  </div>
                </div>
                {infos}
              </div>
            )
          })}
        </div>
      </Modal>
    )
  }
}

export default inject('AccountInformationStore')(observer(DebugPanel))
