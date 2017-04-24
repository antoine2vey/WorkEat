import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import chunk from 'lodash/chunk';
import * as actions from '../../actions/products';
import Product from './Product';


class Products extends Component {
  componentDidMount() {
    this.props.fetchProductsIfNeeded();
  }

  render() {
    const { products } = this.props;
    const rows = chunk(products, 4);

    return (
      <div>
        { rows.map((row, i) => (
          <div
            className="columns" key={i} style={{
              marginLeft: i !== 0 ? 0 : 'auto',
            }}
          >
            { row.map(product => (
              <div className="column is-3" key={product._id} style={{ margin: 0 }}>
                <Product data={product} />
              </div>
            )) }
          </div>
        )) }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    products: state.products.products,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Products);

