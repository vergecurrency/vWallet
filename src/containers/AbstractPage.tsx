import * as React from 'react'
import Footer from '../components/Footer'

class AbstractPage extends React.Component<{}, {}> {
  render() {
    return (
      <div className="content-container-wrapper content-container-wrapper-full">
        <div className="content-container-row content-container-row-grow flex-column padding-bottom">
          {this.props.children}
        </div>
        <div className="content-container-row footer-container">
          <Footer />
        </div>
      </div>
    )
  }
}

export default AbstractPage
