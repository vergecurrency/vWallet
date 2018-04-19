/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';

import { Provider } from 'mobx-react';
import TransactionStore from './stores/TransactionStore';

export default () => (
  <Provider TransactionStore={TransactionStore}>
    <App>
      <Switch>
        <Route path="/" component={HomePage} />
      </Switch>
    </App>
  </Provider>
);
