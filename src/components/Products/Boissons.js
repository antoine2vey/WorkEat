import React from 'react';
import { connect } from 'react-redux';
import { addToCart } from '../../actions/cart';

const Boisson = ({ boisson: { file, description, price, tags, types, name }, addToCart, showProduct, isVisible, hideProduct }) => (
  <div className="products__product-container">
    <div className="products__product">
      <div className="products__product__options">
        <button className="products__product__option btn-gold" onClick={isVisible ? hideProduct : showProduct}>Voir</button>
        <button className="products__product__option btn-gold" onClick={addToCart}>Ajouter</button>
      </div>
      <img src={file} alt="Produit" className="products__product__image" />
      <h2 className="products__product__title">{name}</h2>
      <p className="products__product__tag">{
        tags.map(tag => (
          <span key={tag._id}>{tag.name}, </span>
        ))
      }</p>
      <p className="products__product__price">{price}€</p>
    </div>
  </div>
);

const Boissons = ({ ...props }) => {
  const { boissons, addToCart, showProduct, hideProduct, isVisible } = props;

  return (
    <div className="products__products-list">
      { boissons.map(boisson => (
        <Boisson
          boisson={boisson}
          key={boisson._id}
          addToCart={() => addToCart(boisson)}
          showProduct={() => showProduct(boisson)}
          hideProduct={() => hideProduct(boisson)}
          isVisible={isVisible}
        />
      )) }
    </div>
  );
};

export default connect(() => ({}), { addToCart })(Boissons);
