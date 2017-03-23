import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch, Redirect } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import Home from './components/Home/Home';
import App from './components/App/App';

import Auth from './modules/Auth';

const history = createBrowserHistory();
console.log(Auth.isUserAuthenticated() ? 'User connected' : 'Not connected!');

const PrivateRoute = ({ component, ...rest }) => {  
  return (
    <Route {...rest} render={props => (
      Auth.isUserAuthenticated()
      ? React.createElement(component, props)
      : <Redirect to={{
          pathname: '/',
          state: { from: props.location }
        }}/>
    )}/>
  );
}

ReactDOM.render(
  <Router history={history}>
      {
        Auth.isUserAuthenticated() ? (
          <Switch>
            <Route exact path="/home" component={Home} />
            <PrivateRoute path="/" component={App} />
          </Switch>
        ) : (
          <Switch>
            <Route exact path="/" component={Home} />
            <PrivateRoute path="/app" component={App} />
          </Switch>
        )
      }
  </Router>,
  document.getElementById('root')
);
