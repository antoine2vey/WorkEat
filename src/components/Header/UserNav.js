import React from 'react';
import { NavLink } from 'react-router-dom';

const UserNav = ({ logoutUser, itemsNumber }) => (
  <nav className="nav has-shadow">
    <div className="container">
      <div className="nav-left">
        <NavLink to="/" className="nav-item is-tab is-hidden-mobile is-active">Home</NavLink>
      </div>
      <span className="nav-toggle">
        <span />
        <span />
        <span />
      </span>
      <div className="nav-right nav-menu">
        <NavLink to="/" className="nav-item is-tab is-hidden-tablet is-active">Home</NavLink>
        <NavLink to="/account" className="nav-item is-tab">
          Profile
        </NavLink>
        <NavLink to="/panier" className="nav-item is-tab">
          Panier -&nbsp;<strong>{itemsNumber} items</strong>
        </NavLink>
        <a className="nav-item is-tab" onClick={() => logoutUser()}>Log out</a>
      </div>
    </div>
  </nav>
);

export default UserNav;
