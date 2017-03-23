import React, { Component } from 'react';
import axios from 'axios';
import Product from './Product';

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
    return (
      <div>
        <div className="columns" style={{margin: 15}}>
          { products.map(product => (
            <div className="column is-3" key={product._id}>
              <Product data={product}/>
            </div>
          )) }
        </div>
      </div>
    );
  }
}

export default Products;

