import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch, Redirect } from 'react-router';
import { Provider } from 'react-redux';
import throttle from 'lodash/throttle';
import Home from './components/Home/Home';
import App from './components/App/App';
import About from './components/About/About';
import store from './store';
import history from './utils/history';
import { saveState } from './utils/persistState';

const isUserAuthenticated = () => localStorage.getItem('_token') !== null;
const PrivateRoute = ({ component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
    isUserAuthenticated()
    ? React.createElement(component, props)
    : <Redirect
      to={{
        pathname: '/',
      }}
    />
  )}
  />
);

store.subscribe(throttle(() => {
  saveState({
    auth: store.getState().auth,
    cart: store.getState().cart,
  });


  function memorySizeOf(obj) {
    let bytes = 0;
    function sizeOf(obj) {
      if (obj !== null && obj !== undefined) {
        switch (typeof obj) {
          case 'number':
            bytes += 8;
            break;
          case 'string':
            bytes += obj.length * 2;
            break;
          case 'boolean':
            bytes += 4;
            break;
          case 'object':
            const objClass = Object.prototype.toString.call(obj).slice(8, -1);
            if (objClass === 'Object' || objClass === 'Array') {
              for (const key in obj) {
                if (!obj.hasOwnProperty(key)) { continue; }
                sizeOf(obj[key]);
              }
            } else bytes += obj.toString().length * 2;
            break;
          default:
            return;
        }
      }
      return bytes;
    }

    function formatByteSize(bytes) {
      if (bytes < 1024) return `${bytes} bytes`;
      else if (bytes < 1048576) return `${(bytes / 1024).toFixed(3)} KiB`;
      else if (bytes < 1073741824) return `${(bytes / 1048576).toFixed(3)} MiB`;
      return `${(bytes / 1073741824).toFixed(3)} GiB`;
    }

    return formatByteSize(sizeOf(obj));
  }

  console.warn('### SIZE OF STATE IS CURRENTLY AT :', memorySizeOf(store.getState()));
}));

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route
        render={({ location }) => (
            isUserAuthenticated() ? (
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
    </Router>
  </Provider>,
  document.getElementById('root'),
);
