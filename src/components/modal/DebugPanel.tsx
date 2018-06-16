import * as React from 'react'
import { Container, Row, Col } from 'reactstrap'
import { observer, inject } from 'mobx-react'
import Modal from '../Modal'
import i18nReact from 'i18n-react'

import { AccountInformationStore } from '../../stores/AccountInformationStore'
import styledComponents from 'styled-components'

const InfoBlock = styledComponents.div`
  margin-bottom: 35px;
`
const InfoHeader = styledComponents.div`
  display: inline-flex;
  align-items: center;
  height: 24px;
  padding-bottom: 15px;
`

const InfoHeaderIcon = styledComponents.div`
  margin-right: 10px;
  display: inline-flex;
`

const InfoHeaderTitle = styledComponents.div`
  font-weight: 900;
  font-size: 20px;
`

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
        return <i className="fas fa-info" />
      case DebugCategory.NETWORK:
        return <i className="fas fa-users" />
      case DebugCategory.POOL:
        return <i className="fab fa-cloudscale" />
      case DebugCategory.SCRIPTS:
        return <i className="fas fa-code" />
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
        style={{ maxWidth: '630px', width: '630px' }}
      >
        <Container style={{ color: '#000' }}>
          {types.map(type => {
            const infos = this.mapValuesToCategory(
              this.props.AccountInformationStore!.debugPanelInformation,
              type,
            ).map(({ key, value }) => {
              return value ? (
                <Row>
                  <Col md={4}>{i18nReact.translate(`debug.${key}`)}: </Col>
                  <Col md={8}>{value}</Col>
                </Row>
              ) : null
            })
            return (
              <InfoBlock>
                <InfoHeader>
                  <InfoHeaderIcon>
                    {this.mapCategoryToIcon(type)}
                  </InfoHeaderIcon>
                  <InfoHeaderTitle>
                    {i18nReact.translate(`debug.types.${type}`)}:
                  </InfoHeaderTitle>
                </InfoHeader>
                {infos}
              </InfoBlock>
            )
          })}
        </Container>
      </Modal>
    )
  }
}

export default inject('AccountInformationStore')(observer(DebugPanel))
