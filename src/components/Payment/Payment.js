import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTotalPrice, getProducts } from '../../reducers/cart';
import { incrementQuantity, decrementQuantity, deleteProduct } from '../../actions/cart';
import { trashBlanc } from '../../images';

const Payment = ({ cart, incrementQuantity, decrementQuantity, deleteProduct }) => (
  <div className="partOne">
    <div className="container-fluid">
      <div className="partOne__recap">
        <h2 className="partOne__title">Récapitulatif de votre commande</h2>
        <div className="partOne__list">
          <div className="partOne__category">
            <p>A la carte</p>
            <hr />
          </div>
          { cart.map(item => (
            <div className="partOne__product" key={item._id}>
              <div className="partOne__product-infos">
                <img src={item.file} alt="Canard laqué" className="partOne__product-image" />
                <div className="partOne__product-text">
                  <h3 className="partOne__product-title">{item.name}</h3>
                  <p className="partOne__price">{item.price}€</p>
                </div>
              </div>
              <div className="partOne__quantity">
                <div className="partOne__quantity-button partOne__quantity-up js--up" onClick={() => incrementQuantity(item._id)} >+</div>
                <input type="number" value={item.quantity} min="0" className="partOne__quantity-input js--quantity-input" />
                <div className="partOne__quantity-button partOne__quantity-down js--down" onClick={() => decrementQuantity(item._id)}>-</div>
              </div>
              <div className="partOne__delete" onClick={() => deleteProduct(item._id)}>
                <img src={trashBlanc} alt="Supprimer" className="partOne__delete-icon" />
              </div>
            </div>
          )) }
          <div className="partOne__category">
            <p>Formule</p>
            <hr />
          </div>
        </div>
        <div className="partOne-recap-btn">
          <button className="btn-gold">Revenir au panier</button>
          <button className="btn-gold">Suivant</button>
        </div>
      </div>
    </div>
  </div>
);

const mapStateToProps = state => ({
  cart: getProducts(state.cart),
  total: getTotalPrice(state.cart),
});

export default connect(mapStateToProps, { incrementQuantity, decrementQuantity, deleteProduct })(Payment);

