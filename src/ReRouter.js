import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import LoadingRoot from './loading/LoadingRoot'
import MainRoute from './mainRoute'
import Tour from './welcomeguide/Tour'

@inject('SetupStore')
@observer
export default class ReRouter extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    if (window.location.href.includes('loading.html')) {
      return <LoadingRoot />
    } else if (window.location.href.includes('status.html')) {
      return <div>Hallo Welt!</div>
    } else {
      return !this.props.SetupStore.getSetupStatus ? (
        <Tour {...this.props} />
      ) : (
        <MainRoute />
      )
    }
  }
}
