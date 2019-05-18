import React, { SFC } from 'react';
import { flowRight } from 'lodash';
import { Route, Redirect, Router, Switch } from 'react-router';
import { createBrowserHistory } from 'history';
import AmiibosListPage from './components/AmiibosListPage';

export const App: SFC = flowRight(
)(() => {
  return (
    <Router history={createBrowserHistory()}>
      <Switch>
        <Route path="/amiibos" component={AmiibosListPage} />
        <Redirect to="/amiibos" />
      </Switch>
    </Router>
  );
})

export default App
