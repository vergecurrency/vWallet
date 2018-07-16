import React from 'react'
import Step from './Step'
import { Link } from 'react-router-dom'
import { translate, Trans } from 'react-i18next'

const title = props => {
  return (
    <span>
      <Trans i18nKey="tour.welcome.hello">
        Hello <span style={{ color: 'white' }}>fella.</span>
      </Trans>
    </span>
  )
}

class Welcome extends React.Component {
  render() {
    return (
      <Step
        title={title()}
        subtitle={this.props.i18n.t('tour.welcome.prepare')}
        step="/welcome"
      >
        <div>
          <Link to="/wallet/create">
            <button className="tour-primary-button">
              <Trans i18nKey="tour.welcome.create">Create new wallet</Trans>
            </button>
          </Link>
          <Link to="/wallet/restore">
            <button className="tour-secondary-button">
              <Trans i18nKey="tour.welcome.restore">Restore your wallet</Trans>
            </button>
          </Link>
        </div>
      </Step>
    )
  }
}

export default translate('translation')(Welcome)
