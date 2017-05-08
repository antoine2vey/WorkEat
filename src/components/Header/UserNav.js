import React, { Component } from 'react';
import moment from 'moment';
import Cart from '../Cart/Cart';
import Nav from './Nav';
import * as images from '../../images';

class UserNav extends Component {
  constructor() {
    super();
    this.state = {
      isCartShown: false,
      isNavShown: false,
      timer: setInterval(() => {
        const date = moment().unix();
        // eslint-disable-next-line
        const tmrw = moment().add(1, 'day').hours('10').minutes('30').seconds('00').format();
        const tmrwTimestamp = moment(tmrw).unix();

        this.setState({ tstamp: moment((tmrwTimestamp - date) * 1000).format('HH:mm:ss') });
      }),
      tstamp: moment().format('HH:mm:ss'),
    };

    this.showCart = this.showCart.bind(this);
    this.showNav = this.showNav.bind(this);
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  showCart() {
    this.setState({ isCartShown: !this.state.isCartShown });
  }

  showNav() {
    this.setState({ isNavShown: !this.state.isNavShown });
  }

  render() {
    const { logoutUser, itemsNumber } = this.props;
    const { isCartShown, isNavShown, tstamp } = this.state;
    return (
      <div className="container-fluid">
        <Nav shown={isNavShown} switcher={this.showNav} logout={logoutUser} />
        <header className="main-header">
          <div className="main-header-menu">
            <span className="main-header-menu-item" onClick={this.showNav}>Menu</span>
          </div>
          <div className="main-header-timer">
            <p className="main-header-timer-content">Il vous reste<br /> <span id="timer" className="main-header-timer-content-time">{tstamp}</span><br /> pour commander</p>
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
      </div>
    );
  }
}

export default UserNav;
