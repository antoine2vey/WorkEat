import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from 'react-router'
import Home from './components/Home/Home';
import createBrowserHistory from 'history/createBrowserHistory';
import './index.scss';

const history = createBrowserHistory();

ReactDOM.render(
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={Home}/>
    </Switch>
  </Router>,
  document.getElementById('root')
);
