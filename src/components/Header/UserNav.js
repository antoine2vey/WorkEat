import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Timer from './Timer';
import Cart from '../Cart/Cart';
import Nav from './Nav';
import Search from '../Search/Search';
import * as images from '../../images';

class UserNav extends Component {
  constructor() {
    super();
    this.state = {
      isCartShown: false,
      isNavShown: false,
      isSearchShown: false,
    };

    this.showCart = this.showCart.bind(this);
    this.showNav = this.showNav.bind(this);
    this.hideEverything = this.hideEverything.bind(this);
    this.showSearch = this.showSearch.bind(this);
  }

  showCart() {
    document.body.classList.toggle('dont-scroll');
    this.setState({ isCartShown: !this.state.isCartShown });
  }

  showNav() {
    document.body.classList.toggle('dont-scroll');
    this.setState({ isNavShown: !this.state.isNavShown });
  }

  hideEverything() {
    document.body.classList.toggle('dont-scroll');
    this.setState({
      isNavShown: false,
      isCartShown: false,
      isSearchShown: false,
    });
  }

  showSearch() {
    document.body.classList.toggle('dont-scroll');
    this.setState({ isSearchShown: !this.state.isSearchShown });
  }

  render() {
    const { logoutUser, itemsNumber, solde, token } = this.props;
    const { isCartShown, isNavShown, isSearchShown } = this.state;
    return (
      <div className="container-fluid">
        <div className={`panel-shadow ${this.state.isCartShown || this.state.isNavShown || this.state.isSearchShown ? ' panel-shadow--active' : ''}`} onClick={this.hideEverything} />
        <Nav shown={isNavShown} switcher={this.showNav} logout={logoutUser} solde={solde} token={token} />
        <header className="main-header">
          <div className="main-header-menu">
            <span className="main-header-menu-item" onClick={this.showNav}>Menu</span>
          </div>
          <div className="main-header-timer">
            <Link to={token ? '/' : '/home'}>
              <img src={images.logoBlanc} alt="Work Eat" className="main-header-logo" />
            </Link>
            <Timer />
          </div>
          <div className="main-header-cart">
            <button className="main-header-cart-link" onClick={this.showCart}>
              <div className="main-header-cart-number">{itemsNumber}</div>
              <img src={images.cart} alt="Panier" className="main-header-cart-item" />
            </button>
            <button className="main-header-search-link" onClick={this.showSearch}>
              <img src={images.search} alt="Recherche" className="main-header-search-item" />
            </button>
          </div>
        </header>
        <Cart itemsNumber={itemsNumber} shown={isCartShown} switcher={this.showCart} />
        <Search shown={isSearchShown} switcher={this.showSearch} />
      </div>
    );
  }
}

export default UserNav;
