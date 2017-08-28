import React from 'react';
import { connect } from 'react-redux';
import { addToCart } from '../../actions/cart';

const Plat = ({ plat: { file, description, price, tags, types, name, stock, isHidden }, addToCart, showProduct, isVisible, hideProduct }) => (
  <div className={`${stock > 0 ? 'products__product-container' : 'products__product-container is-outOfStock'} ${isHidden ? 'products__product-container__hidden' : ''}`}>
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

const Plats = ({ ...props }) => {
  const { plats, addToCart, showProduct, hideProduct, isVisible } = props;

  return (
    <div className="products__products-list">
      { plats.map((plat, i) => (
        <Plat
          plat={plat}
          key={plat._id}
          addToCart={() => addToCart(plat, false, i)}
          showProduct={() => showProduct(plat)}
          hideProduct={() => hideProduct(plat)}
          isVisible={isVisible}
        />
      )) }
    </div>
  );
};

export default connect(() => ({}), { addToCart })(Plats);
