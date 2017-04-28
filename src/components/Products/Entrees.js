import React from 'react';
import { connect } from 'react-redux';
import chunk from 'lodash/chunk';
import { addToCart } from '../../actions/cart';

const Entree = ({ entree: { file, description, price, tags, types, name }, addToCart }) => (
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

const Entrees = ({ ...props }) => {
  const { entrees, addToCart } = props;
  const rows = chunk(entrees, 4);

  return (
    <div>
      { rows.map((row, i) => (
        <div
          className="products__products-list"
          key={i}
        >
          { row.map(entree => (
            <Entree entree={entree} key={entree._id} addToCart={() => addToCart(entree._id)} />
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

export default connect(() => ({}), mapDispatchToProps)(Entrees);
