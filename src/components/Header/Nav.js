import React from 'react';
import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { close, logoBlanc } from '../../images';

const Nav = ({ shown, switcher, logout, solde }) => {
  const user = jwtDecode(localStorage._token);

  return (
    <nav className={shown ? 'nav nav--js-open' : 'nav'}>
      <img src={close} alt="Fermer le menu" className="nav-close" onClick={switcher} />
      <Link to="/home">
        <img src={logoBlanc} alt="logo" className="nav-logo" />
      </Link>
      <ul className="nav-list">
        { user.isAdmin &&
          <li className="nav-list-item">
            <Link to="/admin" className="nav-list-item-link" onClick={() => switcher()}>
              <strong>Admin</strong>
            </Link>
          </li>
        }
        { user.isLivreur &&
          <li className="nav-list-item">
            <Link to="/livreur" className="nav-list-item-link" onClick={() => switcher()}>
              <strong>Livreur</strong>
            </Link>
          </li>
        }
        { user.isPrestataire &&
          <li className="nav-list-item">
            <Link to="/prestataire" className="nav-list-item-link" onClick={() => switcher()}>
              <strong>Prestataire</strong>
            </Link>
          </li>
        }
        <li className="nav-list-item">
          <Link to="/" className="nav-list-item-link" onClick={() => switcher()}>Liste des produits</Link>
        </li>
        <li className="nav-list-item">
          <Link to="/about" className="nav-list-item-link" onClick={() => switcher()}>Qui sommes nous</Link>
        </li>
        <li className="nav-list-item">
          <Link to="/blog" className="nav-list-item-link" onClick={() => switcher()}>Actualités</Link>
        </li>
        <li className="nav-list-item">
          <Link to="/compte" className="nav-list-item-link" onClick={() => switcher()}>Mon compte</Link>
        </li>
        <li className="nav-list-item">
          <Link to="/compte/solde" className="nav-list-item-link" onClick={() => switcher()}>Solde <strong>{solde} €</strong></Link>
        </li>
        <li className="nav-list-item">
          <Link to="/contact" className="nav-list-item-link" onClick={() => switcher()}>Contact</Link>
        </li>
        <li className="nav-list-item">
          <button className="nav-list-item-link" onClick={logout} style={{ border: 0 }}><strong>Déconnexion</strong></button>
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
};

export default Nav;
