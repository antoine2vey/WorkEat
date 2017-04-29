import React from 'react';

const ProductDetail = ({ isDetailVisible, product }) => (
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
);

export default ProductDetail;
