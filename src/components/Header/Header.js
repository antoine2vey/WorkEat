import React, { Component } from 'react';
import jwtDecode from 'jwt-decode';
import AdminNav from './AdminNav';
import UserNav from './UserNav';
import Auth from '../../modules/Auth';

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

  constructor() {
    super();
    const token = jwtDecode(Auth.getToken());

    this.state = {
      isConnected: Auth.isUserAuthenticated(),
      isAdminNavbarDisplayed: token.isAdmin || token.isLivreur || token.isPrestataire,
      roles: Header.setRoles(token),
    };
  }

  render() {
    const { roles, isConnected, isAdminNavbarDisplayed } = this.state;

    return (
      <div>
        { isAdminNavbarDisplayed && <AdminNav roles={roles} /> }
        <UserNav connected={isConnected} />
      </div>
    );
  }
}

export default Header;

