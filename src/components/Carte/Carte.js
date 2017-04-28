import React, { Component } from 'react';
import { Route, Switch, Redirect, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProductsIfNeeded, showProduct, hideProduct } from '../../actions/products';
import Entrees from '../Products/Entrees';
import Plats from '../Products/Plats';
import Desserts from '../Products/Desserts';
import Boissons from '../Products/Boissons';

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

        <div className={isDetailVisible ? 'products__desc products__desc--active' : 'products__desc'}>
          <div className={isDetailVisible ? 'products__desc-container products__desc-container--active' : 'products__desc-container'}>
            <img src={`/${product.file}`} alt="Image produit" className="products__desc__image" />
            <div className="products__desc__infos">
              <h2 className="products__desc__title">{product.name}</h2>
              <p className="products__desc__price">{product.price}€</p>
              <p className="products__desc__tag">{product.tags.map(tag => <span key={tag._id}>{tag.name}, </span>)}</p>
              <p className="products__desc__desc">{product.description}</p>
            </div>
          </div>
        </div>

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
  hideProduct() {
    dispatch(hideProduct());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Carte);
