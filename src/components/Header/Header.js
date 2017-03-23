import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

class Header extends Component {
  render() {
    return (
      <div>
        <Link to="/account">ACCOUNT PAGE</Link>
        <Link to="/products">PRODUCT PAGE</Link>
      </div>
    );
  }
}

export default Header;

