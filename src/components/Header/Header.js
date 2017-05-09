import React, { Component } from 'react';
import jwtDecode from 'jwt-decode';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/auth';
import { getTotal } from '../../reducers/cart';
import AdminNav from './AdminNav';
import UserNav from './UserNav';

class Header extends Component {
  setRoles(token, roles = []) {
    const { isAdmin, isLivreur, isPrestataire } = token;
    roles.push(
      isAdmin ? 'admin' : null,
      isPrestataire ? 'prestataire' : null,
      isLivreur ? 'livreur' : null,
    );
    return roles.filter(role => role !== null);
  }

  constructor(props) {
    super(props);
    // TODO: See why it crashes app sometimes
    const token = jwtDecode(localStorage.getItem('_token'));

    this.state = {
      isAdminNavbarDisplayed: (token.isAdmin || token.isLivreur || token.isPrestataire) || false,
      roles: this.setRoles(token),
    };
  }

  render() {
    const { roles, isAdminNavbarDisplayed } = this.state;
    const { logoutUser, itemsInCart, solde } = this.props;
    return (
      <div>
        {isAdminNavbarDisplayed && <AdminNav roles={roles} /> }
        <UserNav logoutUser={logoutUser} itemsNumber={itemsInCart} solde={solde} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { token } = state.auth;
  return {
    token,
    itemsInCart: getTotal(state.cart),
    solde: state.auth.user.solde,
  };
}
export default connect(mapStateToProps, { logoutUser })(Header);

