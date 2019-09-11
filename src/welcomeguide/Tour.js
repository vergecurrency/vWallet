import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Welcome from './Welcome'
import PasswordCreate from './wallet/PasswordCreate'
import PasswordConfirm from './wallet/PasswordConfirm'
import Mnemonic from './wallet/Mnemonic'
import Buy from './Buy'
import Finalize from './Finalize'

const Tour = () => {
  return (
    <Switch>
      <Route exact path="/welcome" component={Welcome} />
      <Route exact path="/wallet/create" component={PasswordCreate} />
      <Route exact path="/wallet/create/confirm" component={PasswordConfirm} />
      <Route exact path="/wallet/mnemonic" component={Mnemonic} />
      <Route exact path="/buyhelp" component={Buy} />
      <Route exact path="/finalize" component={Finalize} />
      <Redirect to="/welcome" />
    </Switch>
  )
}

export default Tour
