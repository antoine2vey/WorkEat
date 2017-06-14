import React, { Component } from 'react';
import { connect } from 'react-redux';
import chunk from 'lodash/chunk';
import { fetchBundlesIfNeeded } from '../../actions/bundles';
import { fetchProductsIfNeeded } from '../../actions/products';
import { getEntrees, getPlats, getDesserts, getBoissons } from '../../reducers/products';
import { addToCart } from '../../actions/cart';
import Bundle from './Bundle';

class Bundles extends Component {
  componentDidMount() {
    const { fetchBundlesIfNeeded, fetchProductsIfNeeded } = this.props;
    fetchBundlesIfNeeded();
    fetchProductsIfNeeded();
  }

  render() {
    const { bundles } = this.props;
    const rows = chunk(bundles, 2);

    return (
      <div>
        <div className="formules">
        { rows.map((row, i) => (
            <div key={i} className="formules__row">
            { row.map(bundle => (
              <div className="formules__column" key={bundle._id}>
                <Bundle bundle={bundle} {...this.props} />
              </div>
            )) }
            </div>
          )) }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { bundles, isFetching } = state.bundles;
  const { products } = state;
  return {
    bundles,
    isFetching,
    entrees: getEntrees(products),
    plats: getPlats(products),
    desserts: getDesserts(products),
    boissons: getBoissons(products),
  };
};

export default connect(mapStateToProps, dispatch => ({
  fetchBundlesIfNeeded() {
    dispatch(fetchBundlesIfNeeded());
  },
  fetchProductsIfNeeded() {
    dispatch(fetchProductsIfNeeded());
  },
  addToCart(plat, isBundle = true) {
    dispatch(addToCart(plat, isBundle));
  },
}))(Bundles);
