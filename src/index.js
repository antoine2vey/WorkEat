import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch, Redirect } from 'react-router';
import { Provider } from 'react-redux';
import moment from 'moment';
import throttle from 'lodash/throttle';
import Home from './components/Home/Home';
import App from './components/App/App';
import About from './components/About/About';
import Reset from './components/Reset/Reset';
import store from './store';
import history from './utils/history';
import { saveState } from './utils/persistState';
import ScrollToTop from './utils/scrollToTop';

const isUserAuthenticated = () => localStorage.getItem('_token') !== null;
const PrivateRoute = ({ component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
    isUserAuthenticated
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
}, 1000));

/**
 * Handling cart expiration for 10 minutes with no activity,
 * we check if tstamp is changing (means that cart has been
 * updated)
 */
const { instanciateCartAt } = store.getState().cart;
function select(state) {
  return state.cart.instanciateCartAt;
}

let currentValue;
let timer;

function handleChange() {
  const previousValue = currentValue;
  currentValue = select(store.getState());

  if (previousValue !== currentValue) {
    // My tstamp changed, we update to 10 minutes
    // TODO: Delete whole items with sockets (foreach)
    timer = setTimeout(() => {
      store.dispatch({ type: 'DELETE_CART' });
    }, 600000);
  }
}

/**
 * At the start || reload, if cart is not null,
 * we update timeout to clear cart from now
 */
if (instanciateCartAt !== null) {
  const now = moment().unix();
  const after = moment(instanciateCartAt).add('10', 'minutes').unix();
  const tstamp = ((after - now) * 1000);

  timer = setTimeout(() => {
    store.dispatch({ type: 'DELETE_CART' });
  }, tstamp);

  console.log(timer);
}

store.subscribe(handleChange);


ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <ScrollToTop>
        <Route
          render={() => (
            isUserAuthenticated() ? (
              <Switch>
                <Route exact path="/home" component={Home} />
                <PrivateRoute path="/" component={App} />
                <Route path="/about" component={About} />
                <Route exact path="/reset/:token" component={Reset} />
                <Route path="*" render={() => <h1>404</h1>} />
              </Switch>
            ) : (
              <Switch>
                <Route exact path="/" component={Home} />
                <PrivateRoute path="/app" component={App} />
                <Route path="/about" component={About} />
                <Route exact path="/reset/:token" component={Reset} />
                <Route path="*" render={() => <h1>404</h1>} />
              </Switch>
            )
          )}
        />
      </ScrollToTop>
    </Router>
  </Provider>,
  document.getElementById('root'),
);
