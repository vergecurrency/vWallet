import React from "react";
import styled from "styled-components";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Welcome from "./Welcome";
import PasswordCreate from "./wallet/PasswordCreate";
import PasswordConfirm from "./wallet/PasswordConfirm";
import Buy from "./Buy";

export default props => {
  return (
    <Switch>
      <Route exact path="/welcome" component={Welcome} />
      <Route exact path="/wallet/create" component={PasswordCreate} />
      <Route exact path="/wallet/create/confirm" component={PasswordConfirm} />
      <Route exact path="/buyhelp" component={Buy} />
      <Redirect to="/welcome" />
    </Switch>
  );
};
