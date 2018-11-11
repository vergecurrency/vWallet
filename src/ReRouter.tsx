import * as React from 'react'

import { inject } from 'mobx-react'

import LoadingRoot from './loading/LoadingRoot'
// tslint:disable-next-line
import MainRoute from './mainRoute'
import Tour from './welcomeguide/Tour'
import EnterPassword from './welcomeguide/wallet/EnterPassword'
import { AccountInformationStore } from './stores/AccountInformationStore'

class ReRouter extends React.Component<{
  AccountInformationStore?: AccountInformationStore
}> {
  render() {
    const { AccountInformationStore, ...rest } = this.props

    if (window.location.href.includes('loading.html')) {
      return <LoadingRoot />
    }

    if (!AccountInformationStore!.isPrepared()) {
      // build wallet with user, much wow!
      return <Tour {...rest} />
    }

    if (!AccountInformationStore!.unlocked) {
      // afterwards first tryhard test, does he remember?
      return <EnterPassword />
    }

    // if he does it, well welcome to spend your money.
    return <MainRoute />
  }
}

export default inject('AccountInformationStore')(ReRouter)
