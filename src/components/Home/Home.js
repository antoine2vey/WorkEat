/* eslint jsx-a11y/href-no-hash: "off" */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import RenderLoginBox from './RenderLoginBox';
import * as images from '../../images';

import './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggingIn: false,
    };

    this.switchBox = this.switchBox.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  switchBox(event) {
    event.preventDefault();
    this.setState({
      isLoggingIn: !this.state.isLoggingIn,
    });
  }

  render() {
    const { isLoggingIn } = this.state;

    return (
      <div className="home">
        <Helmet>
          <title>Workeat</title>
          <meta name="description" content="Chez Workeat, avec des produits de qualités, de grands cuisiniers confectionnent de bons plats que vous pouvez recevoir directement sur votre lieu de travail" />
        </Helmet>
        <div className="container-fluid">
          <div className="header-home">
            <video autoPlay loop className="header-home-video">
              <source src={images.videoMP4} type="video/mp4" />
              <source src={images.videoWebm} type="video/webm" />
              <source src={images.videoOgv} type="video/ogg" />
            </video>
            <div className="header-home-top">
              <div className="row">
                <div className="offset-by-four four columns header-home-top-logo">
                  <img src={images.logoBlanc} alt="WorkEat" className="header-home-top-logo-item" />
                </div>
                <div className="four columns">
                  <p className="header-home-top-connexion" style={{ display: this.state.isLoggingIn ? 'none' : 'block' }}>Déjà inscrit ? <a href="#" className="header-home-top-connexion-link" onClick={this.switchBox}>Connexion</a></p>
                  <p className="header-home-top-connexion" style={{ display: this.state.isLoggingIn ? 'block' : 'none' }}>Pas encore inscrit ? <a href="#" className="header-home-top-connexion-link" onClick={this.switchBox}>Inscription</a></p>
                </div>
              </div>
              <div className="row">
                <div className="twelve columns">
                  <h2 className="header-home-top-subtitle">La gastronomie livrée</h2>
                </div>
              </div>
            </div>
            <div className="header-home-form">
              <div className="row">
                <div className="twelve columns">
                  <RenderLoginBox isLoggingIn={isLoggingIn} />
                </div>
              </div>
            </div>
          </div>
          <div className="instructions">
            <div className="instructions-container">
              <div className="instructions-step">
                <img className="instructions-step-icon" src={images.checkForm} alt="Formulaire d'inscription" />
                <h3 className="instructions-step-text">Inscrivez-vous<br />sur le site</h3>
              </div>
              <div className="instructions-step">
                <picture>
                  <source media="(max-width:550px)" srcSet={images.angleDown} />
                  <img className="instructions-step-icon" src={images.angle} alt="Suivant" />
                </picture>
              </div>
              <div className="instructions-step">
                <img className="instructions-step-icon" src={images.touch} alt="Choix des produits" />
                <h3 className="instructions-step-text">Commandez<br /> votre menu</h3>
              </div>
              <div className="instructions-step">
                <picture>
                  <source media="(max-width:550px)" srcSet={images.angleDown} />
                  <img className="instructions-step-icon" src={images.angle} alt="Suivant" />
                </picture>
              </div>
              <div className="instructions-step">
                <img className="instructions-step-icon" src={images.truck} alt="Livraison de la commande" />
                <h3 className="instructions-step-text">Livré près de<br /> votre entreprise</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="concept">
            <div className="concept-container">
              <h1 className="concept-title">Le concept</h1>
              <hr className="divider" />
              <p className="concept-content">Nous proposons différentes entrées, plats, desserts et boissons afin de satisfaire vos papilles. Apres avoir commandé ce que qu&#39;il vous plait, nous vous livrons dans un rayon de cinq kilomètres autour de notre entrepot.</p>
              <Link to="/about">
                <button className="btn-gold">
                  A propos
                </button>
              </Link>
            </div>
            <div className="concept-container">
              <img src={images.concept} alt="Concept" className="concept-images" />
            </div>
          </div>
        </div>
        <div className="container-fluid menu-bg">
          <div className="menu">
            <div className="menu-container">
              <div className="menu-container-row">
                <img className="menu-container-row-images" src={images.brochette} alt="brochette de viande" />
                <img className="menu-container-row-images" src={images.sushi} alt="Nos Sushis" />
              </div>
              <div className="menu-container-row">
                <img className="menu-container-row-images" src={images.burger} alt="nos burgers" />
                <img className="menu-container-row-images" src={images.crevette} alt="Nos crevettes" />
              </div>
            </div>
            <div className="menu-container">
              <h1 className="menu-container-title">Une semaine, un menu</h1>
              <hr className="divider" />
              <p className="menu-container-text">Chaque semaine nous changeons notre carte pour vous apporter toujours plus de plats différents</p>
              <Link to="/carte/entrees">
                <button className="btn-gold">Voir le menu</button>
              </Link>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="livraison">
            <div className="livraison-container">
              <h1 className="livraison-title">Livré près de votre travail</h1>
              <hr className="divider" />
              <p>Nous livrons dans quatre points différents, tous au maximum à 5km. Vous pourrez choisir votre point de livraison favori et ainsi venir récupérer votre commande juste après la livraison.</p>
              <Link to="/carte/entrees">
                <button className="btn-gold">Commander</button>
              </Link>
            </div>
            <div className="livraison-container">
              <img src={images.livraison} alt="Livraison" className="livraison-images" />
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="footer">
            <div className="footer-logo">
              <img className="footer-logo-item" src={images.logoBlanc} alt="Logo WorkEat" />
            </div>
            <div className="footer-list">
              <ul className="footer-list-social">
                <li className="footer-list-social-item"><a href="#" className="footer-list-social-item-link"><i className="icon-facebook-square footer-list-social-item-link-icon" /></a></li>
                <li className="footer-list-social-item"><a href="#" className="footer-list-social-item-link"><i className="icon-twitter-square footer-list-social-item-link-icon" /></a></li>
                <li className="footer-list-social-item"><a href="#" className="footer-list-social-item-link"><i className="icon-pinterest-square footer-list-social-item-link-icon" /></a></li>
                <li className="footer-list-social-item"><a href="#" className="footer-list-social-item-link"><i className="icon-instagrem footer-list-social-item-link-icon" /></a></li>
              </ul>
              <ul className="footer-list-mentions">
                <li className="footer-list-mentions-item"><a href="#" className="footer-list-mentions-item-link">Mentions légales</a></li>
                <li className="footer-list-mentions-item">•</li>
                <li className="footer-list-mentions-item"><a href="#" className="footer-list-mentions-item-link">CGV</a></li>
                <li className="footer-list-mentions-item">•</li>
                <li className="footer-list-mentions-item"><a href="#" className="footer-list-mentions-item-link">Plan du site</a></li>
              </ul>
            </div>
          </div>
        </div>
        <NotificationContainer />
      </div>
    );
  }
}

export default Home;
