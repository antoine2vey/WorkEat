import React, { Component } from 'react';

class ProductList extends Component {
  componentDidMount() {
    this.props.fetchProductsIfNeeded();
  }

  deleteProduct(product) {
    const { _id } = product;
    this.props.deleteProducts(_id);
  }

  render() {
    const { products } = this.props;
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
