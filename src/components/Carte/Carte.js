import React, { Component } from 'react';
import { Route, Switch, Redirect, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { fetchProductsIfNeeded, showProduct, hideProduct } from '../../actions/products';
import Entrees from '../Products/Entrees';
import Plats from '../Products/Plats';
import Desserts from '../Products/Desserts';
import Boissons from '../Products/Boissons';
import ProductDetail from './ProductDetail';

class Carte extends Component {
  componentDidMount() {
    this.props.getProducts();
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
          <meta name="description" content="WorkEat produits luxe haut de gamme livraison de nourriture" />
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
  const { products } = state.products;
  return {
    entrees: products.filter(product => product.types.indexOf('entree') > -1),
    plats: products.filter(product => product.types.indexOf('plat') > -1),
    desserts: products.filter(product => product.types.indexOf('dessert') > -1),
    boissons: products.filter(product => product.types.indexOf('boisson') > -1),
    isDetailVisible: state.products.isDetailVisible,
    product: state.products.product,
  };
};

const mapDispatchToProps = dispatch => ({
  getProducts() {
    dispatch(fetchProductsIfNeeded());
  },
  showProduct(product) {
    dispatch(showProduct(product));
  },
  hideProduct(product) {
    dispatch(hideProduct(product));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Carte);
