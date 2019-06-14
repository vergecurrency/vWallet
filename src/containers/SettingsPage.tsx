import * as React from 'react'

import SettingsPanel from '../components/settings/SettingsPanel'
import KeymapsPanel from '../components/settings/KeymapsPanel'
import Footer from '../components/Footer'

class SettingsPage extends React.Component<{}> {
  render() {
    return (
      <div className="content-container-wrapper content-container-wrapper-full">
        <div className="content-container-row content-container-row-grow flex-column padding-bottom">
          <SettingsPanel />
          <KeymapsPanel />
        </div>
        <div className="content-container-row footer-container">
          <Footer />
        </div>
      </div>
    )
  }
}

export default SettingsPage
