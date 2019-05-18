import React, { SFC } from 'react';
import { StyleRulesCallback, StyledComponentProps, AppBar, withStyles, Typography, Toolbar } from '@material-ui/core';
import { flowRight } from 'lodash';
import { Route, Redirect, Router, Switch } from 'react-router';
import { createBrowserHistory } from 'history';

const styles: StyleRulesCallback = () => ({
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  }
});

const App: SFC<StyledComponentProps> = (props) => {
  const { classes = {} } = props;

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            Amiibos
          </Typography>
        </Toolbar>
      </AppBar>
      <Router history={createBrowserHistory()}>
        <Switch>
          <Route path="/amiibos">Amiibos goes here.</Route>
          <Redirect to="/amiibos" />
        </Switch>
      </Router>
    </div>
  );
}

export default flowRight(
  withStyles(styles)
)(App) as SFC;
