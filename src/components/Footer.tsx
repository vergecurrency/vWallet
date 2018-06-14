import * as React from 'react'

import { inject, observer } from 'mobx-react'

import CreditsPanel from './modal/CreditsPanel'
import { SettingsStore } from '../stores/SettingsStore'
import { shell } from 'electron'
import T from 'i18n-react'
import styled from 'styled-components'

const FooterText = styled.div`
  textalign: 'center';
  ${props => (props.theme.light ? '' : 'color: #7193ae;')};
`

const FooterVersion = styled.div`
  ${props => (props.theme.light ? '' : 'color: #7193ae;')};
`

interface FooterProps {
  SettingsStore?: SettingsStore
}

interface FooterState {
  credits: boolean
}

class Footer extends React.Component<FooterProps, FooterState> {
  constructor(props) {
    super(props)
    this.state = {
      credits: false,
    }

    this.toggle = this.toggle.bind(this)
  }

  toggle(item: 'credits') {
    return () => this.setState({ [item]: !this.state[item] })
  }

  openLatestRelease() {
    shell.openExternal(
      'https://github.com/vergecurrency/vWallet/releases/latest',
    )
  }

  openBlockExplorer() {
    shell.openExternal('https://verge-blockchain.info/')
  }

  render() {
    const { SettingsStore } = this.props

    return (
      <div className="container footer">
        <CreditsPanel
          toggle={this.toggle('credits')}
          open={this.state.credits}
        />
        <div className="row">
          <FooterVersion
            className="col-md-8 clicky"
            onClick={this.openLatestRelease.bind(this)}
          >
            {T.translate('footer.wallet')} v{SettingsStore!.appVersion} (alpha)
          </FooterVersion>
          <FooterText
            className="col-md-2 clicky"
            onClick={this.openBlockExplorer.bind(this)}
          >
            {T.translate('footer.explorer')}
          </FooterText>
          <FooterText className="col-md-1 clicky">
            {T.translate('footer.donate')}
          </FooterText>
          <FooterText
            className="col-md-1 clicky"
            onClick={this.toggle('credits')}
          >
            {T.translate('footer.credits')}
          </FooterText>
        </div>
      </div>
    )
  }
}

export default inject('SettingsStore')(observer(Footer))
