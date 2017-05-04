import React from 'react';
import { connect } from 'react-redux';
import chunk from 'lodash/chunk';
import { addToCart } from '../../actions/cart';

const Plat = ({ plat: { file, description, price, tags, types, name }, addToCart, showProduct, isVisible, hideProduct }) => (
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
);

const Plats = ({ ...props }) => {
  const { plats, addToCart, showProduct, hideProduct, isVisible } = props;
  const rows = chunk(plats, 4);

  return (
    <div>
      { rows.map((row, i) => (
        <div
          className="products__products-list"
          key={i}
        >
          { row.map(plat => (
            <Plat 
              plat={plat}
              key={plat._id}
              addToCart={() => addToCart(plat)}
              showProduct={() => showProduct(plat)}
              hideProduct={() => hideProduct()}
              isVisible={isVisible}
            />
          )) }
        </div>
      )) }
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  addToCart(item) {
    dispatch(addToCart(item));
  },
});

export default connect(() => ({}), mapDispatchToProps)(Plats);
