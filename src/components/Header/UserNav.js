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

        const before = moment().hours('7').minutes('00').seconds('00').format();
        const after = moment().hours('11').minutes('30').seconds('00').format();

        // Si je suis entre 8h et 11h30
        if (moment().isAfter(before) && moment().isBefore(after)) {
          return this.setState({ tstamp: moment((tmrwTimestamp - date) * 1000).format('HH:mm:ss') });
        }

        this.setState({ tstamp: 'Reviens à partir de 8h!' });
      }, 1000),
      tstamp: '',
    };

    this.showCart = this.showCart.bind(this);
    this.showNav = this.showNav.bind(this);
    this.hideNavAndCart = this.hideNavAndCart.bind(this);
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  showCart() {
    document.body.classList.toggle('dont-scroll');
    this.setState({ isCartShown: !this.state.isCartShown });
  }

  showNav() {
    document.body.classList.toggle('dont-scroll');
    this.setState({ isNavShown: !this.state.isNavShown });
  }

  hideNavAndCart() {
    document.body.classList.toggle('dont-scroll');
    this.setState({
      isNavShown: false,
      isCartShown: false,
    });
  }

  render() {
    const { logoutUser, itemsNumber, solde } = this.props;
    const { isCartShown, isNavShown, tstamp } = this.state;
    return (
      <div className="container-fluid">
        <div className={"panel-shadow" + (this.state.isCartShown || this.state.isNavShown ? ' panel-shadow--active' : '')} onClick={this.hideNavAndCart} />
        <Nav shown={isNavShown} switcher={this.showNav} logout={logoutUser} solde={solde} />
        <header className="main-header">
          <div className="main-header-menu">
            <span className="main-header-menu-item" onClick={this.showNav}>Menu</span>
          </div>
          <div className="main-header-timer">
            <img src={images.logoBlanc} alt="Work Eat" className="main-header-logo" />
            <p className="main-header-timer-content"><span id="timer" className="main-header-timer-content-time">{tstamp}</span></p>
          </div>
          <div className="main-header-cart">
            <button className="main-header-cart-link" onClick={this.showCart}>
              <div className="main-header-cart-number">{itemsNumber}</div>
              <img src={images.cart} alt="Panier" className="main-header-cart-item" />
            </button>
          </div>
        </header>
        <Cart itemsNumber={itemsNumber} shown={isCartShown} switcher={this.showCart} />
      </div>
    );
  }
}

export default UserNav;
