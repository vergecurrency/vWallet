import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import LoadingRoot from './loading/LoadingRoot'
import MainRoute from './mainRoute'
import Tour from './welcomeguide/Tour'

const ReRouter = ({ SetupStore }) => {
  if (window.location.href.includes('loading.html')) {
    return <LoadingRoot />
  } else if (window.location.href.includes('status.html')) {
    return <div>Hallo Welt!</div>
  } else {
    return SetupStore.getSetupStatus ? <Tour {...this.props} /> : <MainRoute />
  }
}

export default inject('SetupStore')(observer(ReRouter))
