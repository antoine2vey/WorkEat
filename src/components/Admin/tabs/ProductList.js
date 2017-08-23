import React, { Component } from 'react';
import { trashBlanc } from '../../../images';

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
      <div className="admin__container-list">
        {
          products.map(product => (
            <div className="admin__product-column" key={product._id}>
              <article className="admin__product">
                <div className="admin__product-image-container">
                  <img className="admin__product-image" src={product.file} alt={product.name} />
                </div>
                <div className="admin__product-content">
                  <h2 className="admin__product-title">{product.name}</h2> <span className="admin__product-price">{product.price}€</span>
                  {/* <div className="admin__product-desc">
                    {product.description}
                  </div> */}
                  <div className="admin__delete-btn" onClick={() => this.deleteProduct(product)}>
                    <img src={trashBlanc} alt="Supprimer" className="admin__delete-btn-icon" />
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
