import React from 'react';
import { connect } from 'react-redux';
import { getTotalPrice, getProducts } from '../../reducers/cart';
import { incrementQuantity, decrementQuantity, deleteProduct } from '../../actions/cart';
import { closeBlack, trashBlanc } from '../../images';

const Cart = ({ cart, total, itemsNumber, shown, switcher, incrementQuantity, decrementQuantity, deleteProduct }) => (
  <div className={shown ? 'cart-panel cart-panel--js-open' : 'cart-panel'}>
    <img 
      src={closeBlack}
      alt="Fermer le panier"
      className="cart-panel__close"
      onClick={switcher}
    />
    <h3 className="cart-panel__title">Votre panier <span className="cart-panel__number-item">({itemsNumber})</span></h3>
    <div className="cart-panel__list">
      <div className="cart-panel__category">
        <p>A la carte</p>
        <hr />
      </div>
      { cart.map(c => (
        <div className="cart-panel__product" key={c._id}>
          <div className="cart-panel__product-infos">
            <img src={c.file} alt="Canard laqué" className="cart-panel__product-image" />
            <div className="cart-panel__product-text">
              <h3 className="cart-panel__product-title">{c.name}</h3>
              <p className="cart-panel__price">{c.price}€</p>
            </div>
          </div>
          <div className="cart-panel__quantity">
            <div className="cart-panel__quantity-button cart-panel__quantity-up js--up" onClick={() => incrementQuantity(c._id)}>+</div>
            <input type="number" value={c.quantity} min="0" readOnly className="cart-panel__quantity-input js--quantity-input" />
            <div className="cart-panel__quantity-button cart-panel__quantity-down js--down" onClick={() => decrementQuantity(c._id)}>-</div>
          </div>
          <div className="cart-panel__delete" onClick={() => deleteProduct(c._id)}>
            <img src={trashBlanc} alt="Supprimer" className="cart-panel__delete-icon" />
          </div>
        </div>
      )) }
      <div className="cart-panel__category">
        <p>Formule</p>
        <hr />
      </div>
      {/*<div className="cart-panel__product">
        <div className="cart-panel__product-infos">
          <img src="images/thumb/canard-roti-thumb.jpg" alt="Canard laqué" className="cart-panel__product-image" />
          <div className="cart-panel__product-text">
            <h3 className="cart-panel__product-title">La complète</h3>
            <p className="cart-panel__price">10€</p>
          </div>
        </div>
        <div className="cart-panel__quantity">
          <div className="cart-panel__quantity-button cart-panel__quantity-up js--up">+</div>
          <input type="number" value="1" min="0" className="cart-panel__quantity-input js--quantity-input" />
          <div className="cart-panel__quantity-button cart-panel__quantity-down js--down">-</div>
        </div>
        <div className="cart-panel__delete">
          <img src="images/icons/trash-blanc.svg" alt="Supprimer" className="cart-panel__delete-icon" />          </div>
      </div>*/}
      <div className="cart-panel__promo">
        <div className="material-field cart-panel__input">
          <div className="material-field__label">Code promo</div>
          <input type="text" className="material-field__input" />
        </div>
        <button className="btn-gold cart-panel__apply">Appliquer</button>
      </div>
      <div className="cart-panel__category">
        <p>Total {total}€</p>
        <hr />
      </div>
    </div>
  </div>
);

const mapStateToProps = state => ({
  cart: getProducts(state.cart),
  total: getTotalPrice(state.cart),
});

export default connect(mapStateToProps, { incrementQuantity, decrementQuantity, deleteProduct })(Cart);

