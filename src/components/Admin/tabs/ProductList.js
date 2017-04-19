import React, { Component } from 'react';
import axios from 'axios';

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    axios.get('/api/products')
      .then(products => this.setState({ products: this.state.products.concat(products.data) }))
      .catch(err => console.error(err));
  }

  deleteProduct(product) {
    const { _id } = product;
    axios.delete(`/api/products/${_id}`)
      .then(() => {
        this.setState({
          products: this.state.products.filter(product => product._id !== _id),
        });
      })
      .catch(err => console.error(err));
  }

  render() {
    const { products } = this.state;
    return (
      <div>
        {
          products.map(product => (
            <article className="media" key={product._id} style={{ paddingLeft: 15 }}>
              <figure className="media-left">
                <p className="image is-128x128">
                  <img src={`/${product.file}`} alt="product" />
                </p>
              </figure>
              <div className="media-content">
                <div className="content">
                  <p>
                    <strong>{product.name}</strong> <small>{product.price}€</small>
                    <br />
                    {product.description}
                  </p>
                </div>
              </div>
              <div className="media-right">
                <button className="delete" style={{ padding: 0 }} onClick={() => this.deleteProduct(product)} />
              </div>
            </article>
          ))
        }
      </div>
    );
  }
}

export default ProductList;
