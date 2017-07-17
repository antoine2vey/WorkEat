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
      <div className="admin__products-list">
        {
          products.map(product => (
            <div className="admin__product-column">
              <article className="admin__product" key={product._id}>
                <div className="admin__product-image-container">
                  <img className="admin__product-image" src={product.file} alt={product.name} />
                </div>
                <div className="admin__product-content">
                  <h2 className="admin__product-title">{product.name}</h2> <span className="admin__product-price">{product.price}€</span>
                  {/* <div className="admin__product-desc">
                    {product.description}
                  </div> */}
                  <div className="media-right">
                    <button className="btn__delete" onClick={() => this.deleteProduct(product)}>Supprimer</button>
                  </div>
                </div>
              </article>
            </div>
          ))
        }
      </div>
    );
  }
}

export default ProductList;
