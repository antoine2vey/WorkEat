import React, { Component } from 'react';
import jwtDecode from 'jwt-decode';
import { connect } from 'react-redux';
import values from 'lodash/values';
import { logoutUser } from '../../actions/auth';
import AdminNav from './AdminNav';
import UserNav from './UserNav';

class Header extends Component {
  static setRoles(token, roles = []) {
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
    const token = jwtDecode(props.token);

    this.state = {
      isAdminNavbarDisplayed: token.isAdmin || token.isLivreur || token.isPrestataire,
      roles: Header.setRoles(token),
    };
  }

  render() {
    const { roles, isAdminNavbarDisplayed } = this.state;
    const { logoutUser, itemsInCart } = this.props;
    return (
      <div>
        {isAdminNavbarDisplayed && <AdminNav roles={roles} /> }
        <UserNav logoutUser={logoutUser} itemsNumber={itemsInCart} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { token } = state.auth;
  const { quantityById } = state.cart;
  return {
    token,
    // Map object to array, reduce to calculate total items in the cart
    itemsInCart: values(quantityById).reduce((a, b) => (a + b), 0),
  };
}

const mapDispatchToProps = dispatch => ({
  logoutUser() {
    dispatch(logoutUser());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);

