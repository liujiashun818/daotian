import { Provider } from 'react-redux';

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import DevTools from './DevTools';

import App from './App';
import Login from '../containers/Login';

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <div>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route path="/" component={App} />
        </Switch>
        <DevTools />
      </div>
    </Router>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;
