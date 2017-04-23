import React from 'react';
import { Route, Switch } from 'react-router';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import GlobalProducts from '../GlobalProducts/GlobalProducts';
import Admin from '../Admin/Admin';

import './App.css';

const App = () => (
  <div>
    <Header />
    <Route>
      <Switch>
        <Route path="/account" render={() => <h1>acc page</h1>} />
        <Route path="/admin" component={Admin} />
        <Route path="/" component={GlobalProducts} />
      </Switch>
    </Route>
    <Footer />
  </div>
);

export default App;
