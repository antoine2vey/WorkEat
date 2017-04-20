import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import GlobalProducts from '../GlobalProducts/GlobalProducts';
import Admin from '../Admin/Admin';

import './App.css';

class App extends Component {
  componentDidMount() {
    this.props.fetchProductsIfNeeded()
      .then(products => console.log(products))
      .catch(err => console.error(err))
  }

  render() {
    return (
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
  }
}

function mapStateToProps(state) {
  return {
    products: state.products,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
