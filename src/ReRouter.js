import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import LoadingRoot from './loading/LoadingRoot'
import MainRoute from './mainRoute'
import Tour from './welcomeguide/Tour'

@observer
@inject('SetupStore')
export default class ReRouter extends Component {
  render() {
    return !window.location.href.includes('loading.html') ? (
      this.props.SetupStore.getSetupStatus ? (
        <Tour />
      ) : (
        <MainRoute />
      )
    ) : (
      <LoadingRoot />
    )
  }
}
