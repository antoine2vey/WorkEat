import React from 'react';
import { connect } from 'react-redux';
import { getCartProducts, getTotalPrice } from '../../reducers/cart';

const Cart = ({ cart, total }) => (
  <div>
    {cart.map(item => (
      <article className="media" key={item._id} style={{ paddingLeft: 15 }}>
        <figure className="media-left">
          <p className="image is-128x128">
            <img src={`/${item.file}`} alt="product" />
          </p>
        </figure>
        <div className="media-content">
          <div className="content">
            <p>
              <strong>{item.name}</strong> <small>{item.price * item.quantity}€</small>
            </p>
          </div>
        </div>
        <div className="media-right">
          <h1>{item.quantity}</h1>
        </div>
      </article>
    )) }
    <br />
    <br />
    <br />
    {total}€
  </div>
);

const mapStateToProps = state => ({
  cart: getCartProducts(state.cart),
  total: getTotalPrice(state.cart),
});

export default connect(mapStateToProps)(Cart);

