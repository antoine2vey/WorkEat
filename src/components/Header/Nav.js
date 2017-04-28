import React from 'react';
import { Link } from 'react-router-dom';
import { close, logoBlanc } from '../../images';

const Nav = ({ shown, switcher }) => (
  <nav className={shown ? 'nav nav--js-open' : 'nav'}>
    <img src={close} alt="Fermer le menu" className="nav-close" onClick={switcher} />
    <img src={logoBlanc} alt="logo" className="nav-logo" />
    <ul className="nav-list">
      <li className="nav-list-item">
        <Link to="/" className="nav-list-item-link">Liste des produits</Link>
      </li>
      <li className="nav-list-item">
        <Link to="/about" className="nav-list-item-link">Qui sommes nous</Link>
      </li>
      <li className="nav-list-item">
        <Link to="/blog" className="nav-list-item-link">Actualités</Link>
      </li>
      <li className="nav-list-item">
        <Link to="/compte" className="nav-list-item-link">Mon compte</Link>
      </li>
      <li className="nav-list-item">
        <Link to="/compte/solde" className="nav-list-item-link">Solde <strong>0,00 €</strong></Link>
      </li>
      <li className="nav-list-item">
        <Link to="/contact" className="nav-list-item-link">Contact</Link>
      </li>
    </ul>
    <ul className="nav-social">
      <li className="nav-social-item"><a href="#" className="nav-social-item-link"><i className="icon-facebook-square footer-list-social-item-link-icon" /></a></li>
      <li className="nav-social-item"><a href="#" className="nav-social-item-link"><i className="icon-twitter-square footer-list-social-item-link-icon" /></a></li>
      <li className="nav-social-item"><a href="#" className="nav-social-item-link"><i className="icon-pinterest-square footer-list-social-item-link-icon" /></a></li>
      <li className="nav-social-item"><a href="#" className="nav-social-item-link"><i className="icon-instagrem footer-list-social-item-link-icon" /></a></li>
    </ul>
  </nav>
);

export default Nav;
