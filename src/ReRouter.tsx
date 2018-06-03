import * as React from 'react'

import { inject, observer } from 'mobx-react'

import LoadingRoot from './loading/LoadingRoot'
import MainRoute from './mainRoute'
import { SetupStore } from './stores/SetupStore'
import Tour from './welcomeguide/Tour'

class ReRouter extends React.Component<{ SetupStore: SetupStore }> {
  render() {
    const { SetupStore, ...rest } = this.props

    if (window.location.href.includes('loading.html')) {
      return <LoadingRoot />
    } else {
      return SetupStore.getSetupStatus ? <Tour {...rest} /> : <MainRoute />
    }
  }
}

export default inject('SetupStore')(observer(ReRouter))
