import React, { Component } from 'react';
import AdminNav from './AdminNav';
import UserNav from './UserNav';
import jwtDecode from 'jwt-decode';
import Auth from '../../modules/Auth';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      isConnected: Auth.isUserAuthenticated(),
      isAdminNavbarDisplayed: false,
      roles: []
    }
  }

  setRoles(token, roles = []) {
    const { isAdmin, isLivreur, isPrestataire } = token;
    roles.push(
      isAdmin ? 'admin' : null,
      isPrestataire ? 'prestataire' : null,
      isLivreur ? 'livreur' : null,
    );
    return roles.filter(role => role !== null);
  }

  componentDidMount() {
    const token = jwtDecode(Auth.getToken());    

    this.setState({
      isAdminNavbarDisplayed: token.isAdmin || token.isLivreur || token.isPrestataire,
      roles: this.setRoles(token)
    });
  }
  
  render() {
    const { roles, isConnected, isAdminNavbarDisplayed } = this.state; 

    return (
      <div>
        { isAdminNavbarDisplayed && <AdminNav roles={roles} /> }
        <UserNav connected={isConnected}/>
      </div>
    );
  }
}

export default Header;

