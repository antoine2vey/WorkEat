import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch, Redirect } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import Home from './components/Home/Home';
import App from './components/App/App';
import About from './components/About/About';

import Auth from './modules/Auth';

const history = createBrowserHistory();
console.log(Auth.isUserAuthenticated() ? 'User connected' : 'Not connected!');

const PrivateRoute = ({ component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
    Auth.isUserAuthenticated()
    ? React.createElement(component, props)
    : <Redirect
      to={{
        pathname: '/',
      }}
    />
  )}
  />
);

ReactDOM.render(
  <Router history={history}>
    <Route
      render={({ location }) => (
          Auth.isUserAuthenticated() ? (
            <Switch>
              <Route exact path="/home" component={Home} />
              <PrivateRoute path="/" component={App} />
              <Route path="/about" component={About} />
              <Route path="*" render={() => <h1>404</h1>} />

            </Switch>
          ) : (
            <Switch>
              <Route exact path="/" component={Home} />
              <PrivateRoute path="/app" component={App} />
              <Route path="/about" component={About} />
              <Route path="*" render={() => <h1>404</h1>} />
            </Switch>
        )
    )}
    />
  </Router>,
  document.getElementById('root'),
);
