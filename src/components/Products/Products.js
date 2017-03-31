import React, { Component } from 'react';
import axios from 'axios';
import Product from './Product';
import _ from 'lodash';

class Products extends Component {
  constructor() {
    super();

    this.state = {
      products: []
    }
  }

  componentDidMount() {
    axios.get('/api/products').then(products => {
      this.setState({
        products: products.data
      })
    })
    .catch(err => console.log(err));
  }
  
  render() {
    const { products } = this.state;
    const rows = _.chunk(products, 4);
    
    return (
      <div>
        { rows.map((row, i) => (
          <div className="columns" key={i} style={{
            marginLeft: i !== 0 ? 0 : 'auto'
          }}>
            { row.map(product => (
              <div className="column is-3" key={product._id} style={{margin: 0}}>
                <Product data={product} />
              </div>
            )) }
          </div>
        )) }        
      </div>
    );
  }
}

export default Products;

