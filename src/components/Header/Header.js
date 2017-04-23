import React, { Component } from 'react';
import jwtDecode from 'jwt-decode';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions/auth';
import AdminNav from './AdminNav';
import UserNav from './UserNav';

class Header extends Component {
  // static setRoles(token, roles = []) {
  //   const { isAdmin, isLivreur, isPrestataire } = token;
  //   roles.push(
  //     isAdmin ? 'admin' : null,
  //     isPrestataire ? 'prestataire' : null,
  //     isLivreur ? 'livreur' : null,
  //   );
  //   return roles.filter(role => role !== null);
  // }

  constructor() {
    super();
    //const token = jwtDecode(Auth.getToken());

    // this.state = {
    //   isAdminNavbarDisplayed: token.isAdmin || token.isLivreur || token.isPrestataire,
    //   roles: Header.setRoles(token),
    // };
  }

  render() {
    //const { roles, isAdminNavbarDisplayed } = this.state;

    return (
      <div>
        {/* isAdminNavbarDisplayed && <AdminNav roles={roles} /> */}
        <UserNav {...this.props} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state);
  return {
    unknown: 'uknw',
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

// () => ({}) shorthand to skip this argument
export default connect(mapStateToProps, mapDispatchToProps)(Header);

