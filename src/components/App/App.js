import React, { Component } from 'react';
import { Route, Switch, Router } from 'react-router';
import Header from '../Header/Header';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
          <Switch>
            <Route path="/account" render={() => <h1>acc page</h1> }/>
            <Route path="/products" />
            <Route render={() => <h1>default?</h1>}/>
          </Switch>
        <div>
          footer
        </div>
      </div>
    );
  }
}

export default App;

