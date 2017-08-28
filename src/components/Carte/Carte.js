import React, { Component } from 'react';
import { Route, Switch, Redirect, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { fetchProductsIfNeeded, showProduct, hideProduct, addListener } from '../../actions/products';
import { fetchPlacesIfNeeded } from '../../actions/livraison';
import { getEntrees, getPlats, getDesserts, getBoissons } from '../../reducers/products';
import Entrees from '../Products/Entrees';
import Plats from '../Products/Plats';
import Desserts from '../Products/Desserts';
import Boissons from '../Products/Boissons';
import ProductDetail from './ProductDetail';

class Carte extends Component {
  componentDidMount() {
    this.props.fetchProductsIfNeeded();
    this.props.fetchPlacesIfNeeded();
    this.props.addListener('INCREMENT_QUANTITY');
    this.props.addListener('DECREMENT_QUANTITY');
  }

  render() {
    const { entrees, plats, desserts, boissons, isDetailVisible, showProduct, hideProduct, product } = this.props;
    if (!product.tags) {
      product.tags = [];
    }
    return (
      <div id="carte" className="products-carte tab tab--current">
        <Helmet>
          <title>WorkEat - Produits</title>
          <meta name="description" content="Découvrez une large selection d'entrées, de plats, de desserts et de boisson ainsi que différentes formules." />
        </Helmet>
        <div className="products-carte__choise">
          <NavLink to="/carte/entrees" className="products-carte__choise__type select-tab-2" activeClassName="select-tab-2--current">
            <p className="products-carte__choise__title">Entrées</p>
          </NavLink>
          <NavLink to="/carte/plats" className="products-carte__choise__type select-tab-2" activeClassName="select-tab-2--current">
            <p className="products-carte__choise__title">Plats</p>
          </NavLink>
          <NavLink to="/carte/desserts" className="products-carte__choise__type select-tab-2" activeClassName="select-tab-2--current">
            <p className="products-carte__choise__title">Desserts</p>
          </NavLink>
          <NavLink to="/carte/boissons" className="products-carte__choise__type select-tab-2" activeClassName="select-tab-2--current">
            <p className="products-carte__choise__title">Boissons</p>
          </NavLink>
        </div>

        <ProductDetail product={product} isDetailVisible={isDetailVisible} hideProduct={hideProduct} />

        <Switch>
          <Route
            path="/carte/entrees"
            render={() => (<Entrees entrees={entrees} showProduct={showProduct} hideProduct={hideProduct} isVisible={isDetailVisible} />)}
          />
          <Route
            path="/carte/plats"
            render={() => <Plats plats={plats} showProduct={showProduct} hideProduct={hideProduct} isVisible={isDetailVisible} />}
          />
          <Route
            path="/carte/desserts"
            render={() => (<Desserts desserts={desserts} showProduct={showProduct} hideProduct={hideProduct} isVisible={isDetailVisible} />)}
          />
          <Route
            path="/carte/boissons"
            render={() => (<Boissons boissons={boissons} showProduct={showProduct} hideProduct={hideProduct} isVisible={isDetailVisible} />)}
          />
          <Redirect from="/carte" to="/carte/plats" />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { products, auth } = state;
  return {
    entrees: getEntrees(products, state),
    plats: getPlats(products, state),
    desserts: getDesserts(products, state),
    boissons: getBoissons(products, state),
    isDetailVisible: products.isDetailVisible,
    product: products.product,
  };
};

export default connect(mapStateToProps, { hideProduct, showProduct, fetchPlacesIfNeeded, fetchProductsIfNeeded, addListener })(Carte);
