import React from 'react';
import { close, logoBlanc } from '../../images';

const Nav = ({ shown, switcher }) => (
  <nav className={shown ? 'nav nav--js-open' : 'nav'}>
    <img src={close} alt="Fermer le menu" className="nav-close" onClick={switcher} />
    <img src={logoBlanc} alt="logo" className="nav-logo" />
    <ul className="nav-list">
      <li className="nav-list-item">
        <a href="#" className="nav-list-item-link">Liste des produits</a>
      </li>
      <li className="nav-list-item">
        <a href="#" className="nav-list-item-link">Qui sommes nous</a>
      </li>
      <li className="nav-list-item">
        <a href="#" className="nav-list-item-link">Actualités</a>
      </li>
      <li className="nav-list-item">
        <a href="#" className="nav-list-item-link">Mon compte</a>
      </li>
      <li className="nav-list-item">
        <a href="#" className="nav-list-item-link">Solde <strong>0,00 €</strong></a>
      </li>
      <li className="nav-list-item">
        <a href="#" className="nav-list-item-link">Contact</a>
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
