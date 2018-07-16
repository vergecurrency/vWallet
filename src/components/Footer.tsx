import * as React from 'react'

import { inject, observer } from 'mobx-react'

import CreditsPanel from './modal/CreditsPanel'
import { SettingsStore } from '../stores/SettingsStore'
import { shell } from 'electron'
import { translate, Trans } from 'react-i18next'
import styledComponents from 'styled-components'
import DebugPanel from './modal/DebugPanel'

const FooterText = styledComponents.div`
  textalign: 'center';
  ${props => (props.theme.light ? '' : 'color: #7193ae;')};
`

const FooterVersion = styledComponents.div`
  ${props => (props.theme.light ? '' : 'color: #7193ae;')};
`

interface FooterProps {
  SettingsStore?: SettingsStore
}

interface FooterState {
  credits: boolean
  debugWindow: boolean
}

class Footer extends React.Component<FooterProps, FooterState> {
  constructor(props) {
    super(props)
    this.state = {
      credits: false,
      debugWindow: false,
    }

    this.toggle = this.toggle.bind(this)
  }

  toggle(item: 'credits' = 'credits') {
    return () => this.setState({ [item]: !this.state[item] })
  }

  toggleWindow(item: 'debugWindow' = 'debugWindow') {
    return () => this.setState({ [item]: !this.state[item] })
  }

  openLatestRelease() {
    shell.openExternal(
      'https://github.com/vergecurrency/vWallet/releases/latest',
    )
  }

  render() {
    const { SettingsStore } = this.props

    return (
      <div className="footer">
        <CreditsPanel
          toggle={this.toggle('credits')}
          open={this.state.credits}
        />
        <DebugPanel
          toggle={this.toggleWindow('debugWindow')}
          open={this.state.debugWindow}
        />
        <div className="row">
          <FooterVersion
            className="col-md-8"
            onClick={this.openLatestRelease.bind(this)}
          >
            <span className="clicky">
              <Trans i18nKey={'footer.wallet'} /> v{SettingsStore!.appVersion}
            </span>
          </FooterVersion>
          <FooterText
            className="col-md-2 text-right clicky"
            onClick={this.toggleWindow('debugWindow')}
          >
            <Trans i18nKey={'footer.debug_information'} />
          </FooterText>
          <FooterText className="col-md-1 text-right clicky">
            <Trans i18nKey={'footer.donate'} />
          </FooterText>
          <FooterText
            className="col-md-1 text-right clicky"
            onClick={this.toggle('credits')}
          >
            <Trans i18nKey={'footer.credits'} />
          </FooterText>
        </div>
      </div>
    )
  }
}

export default translate()(inject('SettingsStore')(observer(Footer)))
