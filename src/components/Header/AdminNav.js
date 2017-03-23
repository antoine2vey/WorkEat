import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AdminNav extends Component {
  constructor(props) {
    super(props);
    const { roles } = props;

    this.state = {
      isAdmin: roles.indexOf('admin') > -1,
      isLivreur: roles.indexOf('livreur') > -1,
      isPrestataire: roles.indexOf('prestataire') > -1,
    }
  }

  render() {
    const { isAdmin, isLivreur, isPrestataire } = this.state;

    return (
      <nav className="nav has-shadow">
          <div className="nav-left">
            <span className="nav-item">Admin navbar</span>
            { isAdmin && <Link to="/" className="nav-item is-tab is-hidden-mobile is-active">Admin</Link> }
            { isPrestataire && <Link to="/" className="nav-item is-tab is-hidden-mobile">Prestataire</Link> }
            { isLivreur && <Link to="/" className="nav-item is-tab is-hidden-mobile">Livreur</Link> }
          </div>
          <span className="nav-toggle">
            <span></span>
            <span></span>
            <span></span>
          </span>
          <div className="nav-right nav-menu">
            { isAdmin && <Link to="/" className="nav-item is-tab is-hidden-tablet is-active">Admin</Link> }
            { isPrestataire && <Link to="/" className="nav-item is-tab is-hidden-tablet">Prestataire</Link> }
            { isLivreur && <Link to="/" className="nav-item is-tab is-hidden-tablet">Livreur</Link> }          
          </div>
      </nav>
    );
  }
};

export default AdminNav;