import React from 'react';

const ProductDetail = ({ isDetailVisible, product, hideProduct }) => (
  <div className={isDetailVisible ? 'products__desc products__desc--active' : 'products__desc'}>
    <button className="cancel-btn-gold" type="button" onClick={() => hideProduct(product)} />
    <div className={isDetailVisible ? 'products__desc-container products__desc-container--active' : 'products__desc-container'}>
      <img src={product.file ? product.file : ''} alt="Produit détaillé" className="products__desc__image" />
      <div className="products__desc__infos">
        <h2 className="products__desc__title">{product.name}</h2>
        <p className="products__desc__price">{product.price}€</p>
        <p className="products__desc__tag">{product.tags.map(tag => <span key={tag._id}>{tag.name}, </span>)}</p>
        <p className="products__desc__desc">{product.description}</p>
        <p className="products__desc__allerg">Allergènes : {product.allergics ? product.allergics.map((allergic, i) => <span key={i}>{allergic}{allergic.length === i ? ',' : ''}</span>) : ''}</p>
      </div>
    </div>
  </div>
);

export default ProductDetail;
