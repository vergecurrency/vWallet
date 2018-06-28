import * as React from 'react'

import { inject, observer } from 'mobx-react'

import CreditsPanel from './modal/CreditsPanel'
import { SettingsStore } from '../stores/SettingsStore'
import { shell } from 'electron'
import i18nReact from 'i18n-react'
import styledComponents from 'styled-components'
import Info from '../icons/Info'
import DebugPanel from './modal/DebugPanel'

const FooterText = styledComponents.div`
  textalign: 'center';
  ${props => (props.theme.light ? '' : 'color: #7193ae;')};
`

const FooterVersion = styledComponents.div`
  ${props => (props.theme.light ? '' : 'color: #7193ae;')};
`

const FooterDebug = styledComponents.div`
  ${props => (props.theme.light ? '' : 'color: #7193ae;')};
  display: flex;
  align-items: center;
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
      <div className="container footer">
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
            className="col-md-3"
            onClick={this.openLatestRelease.bind(this)}
          >
            <span className="clicky">
              {i18nReact.translate('footer.wallet')} v{
                SettingsStore!.appVersion
              }
            </span>
          </FooterVersion>
          <FooterDebug className="col-md-7">
            <Info
              width={12}
              height={12}
              className="clicky"
              onClick={this.toggleWindow('debugWindow')}
            />
          </FooterDebug>
          <FooterText className="col-md-1 clicky">
            {i18nReact.translate('footer.donate')}
          </FooterText>
          <FooterText
            className="col-md-1 clicky"
            onClick={this.toggle('credits')}
          >
            {i18nReact.translate('footer.credits')}
          </FooterText>
        </div>
      </div>
    )
  }
}

export default inject('SettingsStore')(observer(Footer))
