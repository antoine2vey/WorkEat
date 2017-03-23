import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
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
        <Footer />
      </div>
    );
  }
}

export default App;

