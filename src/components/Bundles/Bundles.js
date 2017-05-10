import React, { Component } from 'react';
import { connect } from 'react-redux';
import chunk from 'lodash/chunk';
import { fetchBundlesIfNeeded } from '../../actions/bundles';
import { fetchProductsIfNeeded } from '../../actions/products';
import Bundle from './Bundle';

class Bundles extends Component {
  componentDidMount() {
    const { fetchBundlesIfNeeded, fetchProductsIfNeeded } = this.props;
    fetchBundlesIfNeeded();
    fetchProductsIfNeeded();
  }

  render() {
    const { bundles } = this.props;
    const rows = chunk(bundles, 4);

    return (
      <div>
        { rows.map((row, i) => (
          <div key={i} className="formule">
            { row.map(bundle => (
              <div className="column is-3" key={bundle._id} style={{ margin: 0 }}>
                <Bundle bundle={bundle} {...this.props} />
              </div>
            )) }
          </div>
        )) }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { bundles, isFetching } = state.bundles;
  const { products } = state.products;
  return {
    bundles,
    isFetching,
    products,
  };
};

export default connect(mapStateToProps, { fetchBundlesIfNeeded, fetchProductsIfNeeded })(Bundles);
