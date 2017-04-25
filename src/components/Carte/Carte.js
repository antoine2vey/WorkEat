import React, { Component } from 'react';
import { Route, Switch, Redirect, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProductsIfNeeded } from '../../actions/products';
import Entrees from '../Products/Entrees';
import Plats from '../Products/Plats';
import Desserts from '../Products/Desserts';
import Boissons from '../Products/Boissons';

class Carte extends Component {
  componentDidMount() {
    this.props.getProducts();
  }

  render() {
    const { entrees, plats, desserts, boissons } = this.props;
    return (
      <div>
        <div className="tabs is-fullwidth is-medium">
          <ul>
            <li>
              <NavLink to="/carte/entrees" activeClassName="is-active">
                <span>Entrées</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/carte/plats" activeClassName="is-active">
                <span>Plats</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/carte/desserts" activeClassName="is-active">
                <span>Desserts</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/carte/boissons" activeClassName="is-active">
                <span>Boissons</span>
              </NavLink>
            </li>
          </ul>
        </div>

        <Switch>
          <Route
            path="/carte/entrees"
            render={() => (<Entrees entrees={entrees} />)}
          />
          <Route
            path="/carte/plats"
            render={() => <Plats plats={plats} />}
          />
          <Route
            path="/carte/desserts"
            render={() => (<Desserts desserts={desserts} />)}
          />
          <Route
            path="/carte/boissons"
            render={() => (<Boissons boissons={boissons} />)}
          />
          <Redirect from="/carte" to="/carte/plats" />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { products } = state.products;
  return {
    entrees: products.filter(product => product.types.indexOf('entree') > -1),
    plats: products.filter(product => product.types.indexOf('plat') > -1),
    desserts: products.filter(product => product.types.indexOf('dessert') > -1),
    boissons: products.filter(product => product.types.indexOf('boisson') > -1),
  };
};

const mapDispatchToProps = dispatch => ({
  getProducts() {
    dispatch(fetchProductsIfNeeded());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Carte);
