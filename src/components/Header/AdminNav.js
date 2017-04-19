import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class AdminNav extends Component {
  constructor(props) {
    super(props);
    const { roles } = props;

    this.state = {
      isAdmin: roles.indexOf('admin') > -1,
      isLivreur: roles.indexOf('livreur') > -1,
      isPrestataire: roles.indexOf('prestataire') > -1,
    };
  }

  render() {
    const { isAdmin, isLivreur, isPrestataire } = this.state;

    return (
      <nav className="nav has-shadow">
        <div className="nav-left">
          <span className="nav-item">Admin navbar</span>
          { isAdmin && <NavLink activeClassName="is-active" to="/admin" className="nav-item is-tab is-hidden-mobile">Admin</NavLink> }
          { isPrestataire && <NavLink to="/prestataire" activeClassName="is-active" className="nav-item is-tab is-hidden-mobile">Prestataire</NavLink> }
          { isLivreur && <NavLink to="/livreur" activeClassName="is-active" className="nav-item is-tab is-hidden-mobile">Livreur</NavLink> }
        </div>
        <span className="nav-toggle">
          <span />
          <span />
          <span />
        </span>
        <div className="nav-right nav-menu">
          { isAdmin && <NavLink to="/admin" className="nav-item is-tab is-hidden-tablet is-active">Admin</NavLink> }
          { isPrestataire && <NavLink to="/prestataire" className="nav-item is-tab is-hidden-tablet">Prestataire</NavLink> }
          { isLivreur && <NavLink to="/livreur" className="nav-item is-tab is-hidden-tablet">Livreur</NavLink> }          
        </div>
      </nav>
    );
  }
}

export default AdminNav;
