import React from 'react';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { getTotalPrice, getProducts } from '../../reducers/cart';
import { incrementQuantity, decrementQuantity, deleteProduct } from '../../actions/cart';
import { closeBlack, trashBlanc } from '../../images';
import history from '../../utils/history';

const Cart = ({ cart, total, itemsNumber, shown, switcher, incrementQuantity, decrementQuantity, deleteProduct }) => (
  <div>
    <div className={shown ? 'cart-panel cart-panel--js-open' : 'cart-panel'}>
      <img
        src={closeBlack}
        alt="Fermer le panier"
        className="cart-panel__close"
        onClick={switcher}
      />
      <h3 className="cart-panel__title">Votre panier <span className="cart-panel__number-item">({itemsNumber})</span></h3>
      {
        cart.length ? (
          <div className="cart-panel__list">
            <div className="cart-panel__category">
              <p className="cart-panel__category-name">A la carte</p>
              <hr />
            </div>
            <ReactCSSTransitionGroup
              transitionName="example"
              transitionAppear
              transitionAppearTimeout={500}
              transitionEnterTimeout={500}
              transitionEnter
              transitionLeave={false}
            >
              { cart.map(c => (
                // IF ITS NOT A BUNDLE
                !c.isBundle &&
                <div className="cart-panel__product" key={c._id}>
                  <div className="cart-panel__product-infos">
                    <div className="cart-panel__product-image-container">
                      <img src={c.file} alt={`${c.name} dans le panier`} className="cart-panel__product-image" />
                    </div>
                    <div className="cart-panel__product-text">
                      <h3 className="cart-panel__product-title">{c.name}</h3>
                      <p className="cart-panel__price">{c.price}€</p>
                    </div>
                  </div>
                  <div className="cart-panel__quantity">
                    <div className="cart-panel__quantity-button cart-panel__quantity-up js--up" onClick={() => incrementQuantity(c._id)}>+</div>
                    <input type="number" value={c.quantity} min="1" readOnly className="cart-panel__quantity-input js--quantity-input" />
                    <div className="cart-panel__quantity-button cart-panel__quantity-down js--down" onClick={() => decrementQuantity(c._id)}>-</div>
                  </div>
                  <div className="cart-panel__delete" onClick={() => deleteProduct(c._id)}>
                    <img src={trashBlanc} alt="Supprimer" className="cart-panel__delete-icon" />
                  </div>
                </div>
              )) }
            </ReactCSSTransitionGroup>
            <div className="cart-panel__category">
              <p className="cart-panel__category-name">Formule</p>
              <hr />
            </div>
            { cart.map(c => (
                // IF ITS A BUNDLE
                c.isBundle &&
                <div className="cart-panel__product" key={c._id}>
                  <div className="cart-panel__left">
                    <div className="cart-panel__product-infos">
                      <div className="cart-panel__product-text formula-product">
                        <h3 className="cart-panel__product-title">{c.name}</h3>
                        <p className="cart-panel__price">{c.price}€</p>
                      </div>
                      <div className="cart-panel__formules">
                        { c.entree.name && <p className="cart-panel__formules-content">Entrée : {c.entree.name}</p> }
                        { c.plat.name && <p className="cart-panel__formules-content">Plat : {c.plat.name}</p> }
                        { c.dessert.name && <p className="cart-panel__formules-content">Dessert : {c.dessert.name}</p> }
                        { c.boisson.name && <p className="cart-panel__formules-content">Boisson : {c.boisson.name}</p> }
                      </div>
                    </div>
                    <div className="cart-panel__quantity" style={{ padding: '10px 0' }}>
                      <div className="cart-panel__quantity-button cart-panel__quantity-up js--up" onClick={() => incrementQuantity(c._id)}>+</div>
                      <input type="number" value={c.quantity} min="0" readOnly className="cart-panel__quantity-input js--quantity-input" />
                      <div className="cart-panel__quantity-button cart-panel__quantity-down js--down" onClick={() => decrementQuantity(c._id)}>-</div>
                    </div>
                  </div>
                  <div className="cart-panel__delete" onClick={() => deleteProduct(c._id)}>
                    <img src={trashBlanc} alt="Supprimer" className="cart-panel__delete-icon" />
                  </div>
                </div>
              )) }
            <div className="cart-panel__promo">
              <div className="material-field cart-panel__input has-label">
                <div className="material-field__label">Code promo</div>
                <input type="text" className="material-field__input" />
              </div>
              <button className="btn-gold cart-panel__apply">Appliquer</button>
            </div>
            <div className="cart-panel__category">
              <p>Total {total}€</p>
            </div>
            <div className="cart-panel__submit">
              <button
                className="btn-gold" onClick={() => {
                  history.push('/recap');
                  switcher();
                }}
              >
                Commander
              </button>
            </div>
          </div>
        ) : (
          <p>Votre panier est vide</p>
        )
      }
    </div>
  </div>
);

const mapStateToProps = state => ({
  cart: getProducts(state.cart),
  total: getTotalPrice(state.cart),
});

export default connect(mapStateToProps, { incrementQuantity, decrementQuantity, deleteProduct })(Cart);
