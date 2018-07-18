import * as React from 'react'

import { inject, observer } from 'mobx-react'

import CreditsPanel from './modal/CreditsPanel'
import { SettingsStore } from '../stores/SettingsStore'
import { AccountInformationStore } from '../stores/AccountInformationStore'
import { shell } from 'electron'
import { translate, Trans } from 'react-i18next'
import { Tooltip } from 'reactstrap'
import styledComponents from 'styled-components'
import DebugPanel from './modal/DebugPanel'
import DonatePanel from './modal/DonatePanel'

const FooterText = styledComponents.div`
  textalign: 'center';
  ${props => (props.theme.light ? '' : 'color: #7193ae;')};
`

const FooterVersion = styledComponents.div`
  ${props => (props.theme.light ? '' : 'color: #7193ae;')};
`

interface FooterProps {
  SettingsStore?: SettingsStore
  AccountInformationStore?: AccountInformationStore
}

interface FooterState {
  credits: boolean
  debugWindow: boolean
  donateModal: boolean
  tooltipDonateOpen: boolean
}

class Footer extends React.Component<FooterProps, FooterState> {
  constructor(props) {
    super(props)
    this.state = {
      credits: false,
      debugWindow: false,
      donateModal: false,
      tooltipDonateOpen: false,
    }

    this.toggle = this.toggle.bind(this)
  }

  toggle(item: 'credits' = 'credits') {
    return () => this.setState({ [item]: !this.state[item] })
  }

  toggleWindow(item: 'debugWindow' = 'debugWindow') {
    return () => this.setState({ [item]: !this.state[item] })
  }

  toggleDonate(item: 'donateModal' = 'donateModal') {
    return () => {
      if (this.props.AccountInformationStore!.unlocked) {
        this.setState({ [item]: !this.state[item] })
      }
    }
  }

  toggleDonateTooltip() {
    this.setState({
      tooltipDonateOpen: !this.state.tooltipDonateOpen,
    })
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
        <DonatePanel
          toggle={this.toggleDonate('donateModal')}
          open={this.state.donateModal}
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
          {!this.props.AccountInformationStore!.unlocked &&
            <Tooltip
              placement="top"
              target="donate-xvg"
              isOpen={this.state.tooltipDonateOpen}
              toggle={this.toggleDonateTooltip.bind(this)}
            >
              <Trans i18nKey={'unlock.title'} />
            </Tooltip>
          }
          <FooterText
            id="donate-xvg"
            className="col-md-1 text-right clicky"
            onClick={this.toggleDonate('donateModal')}
          >
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

export default translate()(inject('SettingsStore', 'AccountInformationStore')(observer(Footer)))
