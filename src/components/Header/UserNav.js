import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UserNav extends Component {
  render() {
    const { connected } = this.props;

    return (
      <nav className="nav has-shadow">
        <div className="container">
          <div className="nav-left">
            <Link to={connected ? '/home' : '/'} className="nav-item">
              <img src="http://bulma.io/images/bulma-logo.png" alt="Bulma logo" />
            </Link>
            <Link to="/produits" className="nav-item is-tab is-hidden-mobile is-active">Home</Link>
          </div>
          <span className="nav-toggle">
            <span></span>
            <span></span>
            <span></span>
          </span>
          <div className="nav-right nav-menu">
            <Link to="/produits" className="nav-item is-tab is-hidden-tablet is-active">Home</Link>            
            <Link to="/account" className="nav-item is-tab">
              <figure className="image is-16x16" style={{marginRight: 8}}>
                <img src="http://bulma.io/images/jgthms.png" alt="" />
              </figure>
              Profile
            </Link>
            <a className="nav-item is-tab">Log out</a>
          </div>
        </div>
      </nav>
    );
  }
};

export default UserNav;