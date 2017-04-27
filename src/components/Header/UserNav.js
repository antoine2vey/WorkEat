import React from 'react';
import { NavLink } from 'react-router-dom';
import * as images from '../../images';

const UserNav = ({ logoutUser, itemsNumber }) => (
  <div className="container-fluid">
    <nav className="nav">
      <img src={images.close} alt="Fermer le menu" className="nav-close" />
      <img src={images.logoBlanc} alt="logo" className="nav-logo" />
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
        <li className="nav-social-item"><a href="#" className="nav-social-item-link"><i className="icon-facebook-square footer-list-social-item-link-icon"></i></a></li>
        <li className="nav-social-item"><a href="#" className="nav-social-item-link"><i className="icon-twitter-square footer-list-social-item-link-icon"></i></a></li>
        <li className="nav-social-item"><a href="#" className="nav-social-item-link"><i className="icon-pinterest-square footer-list-social-item-link-icon"></i></a></li>
        <li className="nav-social-item"><a href="#" className="nav-social-item-link"><i className="icon-instagrem footer-list-social-item-link-icon"></i></a></li>
      </ul>
    </nav>
    <header className="main-header">
      <div className="main-header-menu">
        <span className="main-header-menu-item">Menu</span>
      </div>
      <div className="main-header-timer">
        <p className="main-header-timer-content">Il vous reste<br /> <span id="timer" className="main-header-timer-content-time">03 : 30 : 00</span><br /> pour commander</p>
      </div>
      <div className="main-header-cart">
        <a href="#" className="main-header-cart-link">
          <div className="main-header-cart-number">2</div>
          <img src={images.cart} alt="Panier" className="main-header-cart-item" />
        </a>
      </div>
    </header>
    <div className="panel-shadow"></div>
    <div className="cart-panel">
      <img src={images.closeBlack} alt="Fermer le panier" className="cart-panel__close" />
      <h3 className="cart-panel__title">Votre panier <span className="cart-panel__number-item">(2)</span></h3>
      <div className="cart-panel__list">
        <div className="cart-panel__category">
          <p>A la carte</p>
          <hr />
        </div>
        <div className="cart-panel__product">
          <div className="cart-panel__product-infos">
            <img src="images/thumb/canard-roti-thumb.jpg" alt="Canard laqué" className="cart-panel__product-image" />
            <div className="cart-panel__product-text">
              <h3 className="cart-panel__product-title">Canard rôti</h3>
              <p className="cart-panel__price">8€</p>
            </div>
          </div>
          <div className="cart-panel__quantity">
            <div className="cart-panel__quantity-button cart-panel__quantity-up js--up">+</div>
            <input type="number" value="1" min="0" className="cart-panel__quantity-input js--quantity-input" />
            <div className="cart-panel__quantity-button cart-panel__quantity-down js--down">-</div>
          </div>
          <div className="cart-panel__delete">
            <img src="images/icons/trash-blanc.svg" alt="Supprimer" className="cart-panel__delete-icon" />
          </div>
        </div>
        <div className="cart-panel__product">
          <div className="cart-panel__product-infos">
            <img src="images/thumb/coca-cola-thumb.jpg" alt="Canard laqué" className="cart-panel__product-image" />
            <div className="cart-panel__product-text">
              <h3 className="cart-panel__product-title">Coca Cola</h3>
              <p className="cart-panel__price">1,5€</p>
            </div>
          </div>
          <div className="cart-panel__quantity">
            <div className="cart-panel__quantity-button cart-panel__quantity-up js--up">+</div>
            <input type="number" value="1" min="0" className="cart-panel__quantity-input js--quantity-input" />
            <div className="cart-panel__quantity-button cart-panel__quantity-down js--down">-</div>
          </div>
          <div className="cart-panel__delete">
            <img src="images/icons/trash-blanc.svg" alt="Supprimer" className="cart-panel__delete-icon" />
          </div>
        </div>
        <div className="cart-panel__category">
          <p>Formule</p>
          <hr />

        </div>
        <div className="cart-panel__product">
          <div className="cart-panel__product-infos">
            <img src="images/thumb/canard-roti-thumb.jpg" alt="Canard laqué" className="cart-panel__product-image" />
            <div className="cart-panel__product-text">
              <h3 className="cart-panel__product-title">La complète</h3>
              <p className="cart-panel__price">10€</p>
            </div>
          </div>
          <div className="cart-panel__quantity">
            <div className="cart-panel__quantity-button cart-panel__quantity-up js--up">+</div>
            <input type="number" value="1" min="0" className="cart-panel__quantity-input js--quantity-input" />
            <div className="cart-panel__quantity-button cart-panel__quantity-down js--down">-</div>
          </div>
          <div className="cart-panel__delete">
            <img src="images/icons/trash-blanc.svg" alt="Supprimer" className="cart-panel__delete-icon" />
          </div>
        </div>
        <div className="cart-panel__promo">
          <div className="material-field cart-panel__input">
            <div className="material-field__label">Code promo</div>
            <input type="text" className="material-field__input" />
          </div>
          <button className="btn-gold cart-panel__apply">Appliquer</button>
        </div>
        <div className="cart-panel__category">
          <p>Total</p>
          <hr />
        </div>
      </div>
    </div>
    <div className="product-panel">
      <img src="images/icons/close-black.svg" alt="Fermer la description" className="product-panel__close" />
      <img src="images/burger-home.jpg" alt="Image produit" className="product-panel__image" />
    </div>
  </div>
);

export default UserNav;
