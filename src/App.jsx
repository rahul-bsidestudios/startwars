import React from 'react';
import { Router, Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from './helpers/history';
import { ProtectedRoute } from './routes/private';

import Dashboard from './components/dashboard';
import Login from './components/login';

const mapStateToProps = state => ({
  isLoggedIn: state.user.isLoggedIn,
  user: state.user.user
});
 
const App = ({ isLoggedIn, user, topbar }) => (
  <div className="app">
    <Router history={history}>
      <Switch>
        <Route path="/login" component={Login} />
        <ProtectedRoute
          path="/dashboard"
          isLoggedIn={isLoggedIn}
          component={Dashboard}
          user={user}
        />
        <Redirect
          to="/dashboard"
          component={Dashboard}
        />
      </Switch>
    </Router>
  </div>
);

export default connect(mapStateToProps)(App);