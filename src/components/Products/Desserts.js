import React from 'react';
import { connect } from 'react-redux';
import chunk from 'lodash/chunk';
import { addToCart } from '../../actions/cart';

const Dessert = ({ dessert: { file, description, price, tags, types, name }, addToCart }) => (
  <div className="products__product">
    <div className="products__product__options">
      <button className="products__product__option btn-gold">Voir</button>
      <button className="products__product__option btn-gold" onClick={addToCart}>Ajouter</button>
    </div>
    <img src={`/${file}`} alt="Produit" className="products__product__image" />
    <h2 className="products__product__title">{name}</h2>
    <p className="products__product__tag">{
      tags.map(tag => (
        <span key={tag._id}>{tag.name}, </span>
      ))
    }</p>
    <p className="products__product__price">{price}€</p>
  </div>
);

const Desserts = ({ ...props }) => {
  const { desserts, addToCart } = props;
  const rows = chunk(desserts, 4);

  return (
    <div>
      { rows.map((row, i) => (
        <div
          className="products__products-list"
          key={i}
        >
          { row.map(dessert => (
            <Dessert dessert={dessert} key={dessert._id} addToCart={() => addToCart(dessert._id)} />
          )) }
        </div>
      )) }
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  addToCart(id) {
    dispatch(addToCart(id));
  },
});

export default connect(() => ({}), mapDispatchToProps)(Desserts);
