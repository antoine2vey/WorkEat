import React, { Component } from 'react';
import Cart from '../Cart/Cart';
import Nav from './Nav';
import * as images from '../../images';

class UserNav extends Component {
  constructor() {
    super();
    this.state = {
      isCartShown: false,
      isNavShown: false,
    };

    this.showCart = this.showCart.bind(this);
    this.showNav = this.showNav.bind(this);
  }

  showCart() {
    this.setState({ isCartShown: !this.state.isCartShown });
  }

  showNav() {
    this.setState({ isNavShown: !this.state.isNavShown });
  }

  render() {
    const { logoutUser, itemsNumber } = this.props;
    const { isCartShown, isNavShown } = this.state;
    return (
      <div className="container-fluid">
        <Nav shown={isNavShown} switcher={this.showNav} logout={logoutUser} />
        <header className="main-header">
          <div className="main-header-menu">
            <span className="main-header-menu-item" onClick={this.showNav}>Menu</span>
          </div>
          <div className="main-header-timer">
            <p className="main-header-timer-content">Il vous reste<br /> <span id="timer" className="main-header-timer-content-time">03 : 30 : 00</span><br /> pour commander</p>
          </div>
          <div className="main-header-cart">
            <button className="main-header-cart-link" onClick={this.showCart}>
              <div className="main-header-cart-number">{itemsNumber}</div>
              <img src={images.cart} alt="Panier" className="main-header-cart-item" />
            </button>
          </div>
        </header>
        <div className="panel-shadow" />
        <Cart itemsNumber={itemsNumber} shown={isCartShown} switcher={this.showCart} />
        <div className="product-panel">
          <img src="images/icons/close-black.svg" alt="Fermer la description" className="product-panel__close" />
          <img src="images/burger-home.jpg" alt="Produit" className="product-panel__image" />
        </div>
      </div>
    );
  }
}

export default UserNav;
