import React from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/auth';
import { getTotal } from '../../reducers/cart';
import UserNav from './UserNav';

const Header = ({ logoutUser, itemsInCart, solde, token }) => (
  <UserNav logoutUser={logoutUser} itemsNumber={itemsInCart} solde={solde} token={token} />
);

const mapStateToProps = ({ auth, cart }) => ({
  token: auth.token,
  itemsInCart: getTotal(cart),
  solde: auth.user.solde,
});

export default connect(mapStateToProps, { logoutUser })(Header);

