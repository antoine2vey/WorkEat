import React, { Component } from 'react';
import { logoBlanc } from '../../images';

class About extends Component {
  componentDidMount(prevProps) {
    window.scrollTo(0, 0)
  }
  
  render() {
    return (
      <div>
        <div className="container-fluid">
          <div className="header">
            <h1 className="header-title">A propos</h1>
          </div>
        </div>
        <div className="container-fluid">
          <div className="explain">
            <div className="explain-content">
              <h1 className="explain-content-title">Nous, WorkEat</h1>
              <hr className="divider" />
              <p className="explain-content-text">Etiam efficitur nunc a diam dignissim pulvinar. Donec mollis enim nunc, vitae consectetur turpis pharetra sed. Maecenas a tellus nec urna ornare molestie in ut justo. Donec congue odio ut velit pellentesque ullamcorper. Curabitur gravida suscipit
                eleifend. Duis ac malesuada nunc, eleifend maximus ipsum. Maecenas dictum varius dolor eu lobortis.</p>
            </div>
            <div className="explain-image explain-image--concept">
              
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="explain">
            <div className="explain-image explain-image--produits">
              
            </div>
            <div className="explain-content">
              <h1 className="explain-content-title">Des produits de qualité</h1>
              <hr className="divider" />
              <p className="explain-content-text">Etiam efficitur nunc a diam dignissim pulvinar. Donec mollis enim nunc, vitae consectetur turpis pharetra sed. Maecenas a tellus nec urna ornare molestie in ut justo. Donec congue odio ut velit pellentesque ullamcorper. Curabitur gravida suscipit
                eleifend. Duis ac malesuada nunc, eleifend maximus ipsum. Maecenas dictum varius dolor eu lobortis.</p>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="explain">
            <div className="explain-content">
              <h1 className="explain-content-title">Gastronomique et économique</h1>
              <hr className="divider" />
              <p className="explain-content-text">Etiam efficitur nunc a diam dignissim pulvinar. Donec mollis enim nunc, vitae consectetur turpis pharetra sed. Maecenas a tellus nec urna ornare molestie in ut justo. Donec congue odio ut velit pellentesque ullamcorper. Curabitur gravida suscipit
                eleifend. Duis ac malesuada nunc, eleifend maximus ipsum. Maecenas dictum varius dolor eu lobortis.</p>
            </div>
            <div className="explain-image explain-image--gastronomie">
              
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="explain">
            <div className="explain-image explain-image--livraison">
              
            </div>
            <div className="explain-content">
              <h1 className="explain-content-title">Livré où vous voulez</h1>
              <hr className="divider" />
              <p className="explain-content-text">Etiam efficitur nunc a diam dignissim pulvinar. Donec mollis enim nunc, vitae consectetur turpis pharetra sed. Maecenas a tellus nec urna ornare molestie in ut justo. Donec congue odio ut velit pellentesque ullamcorper. Curabitur gravida suscipit
                eleifend. Duis ac malesuada nunc, eleifend maximus ipsum. Maecenas dictum varius dolor eu lobortis.</p>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="footer">
            <div className="footer-logo">
              <img className="footer-logo-item" src={logoBlanc} alt="Logo WorkEat" />
            </div>
            <div className="footer-list">
              <ul className="footer-list-social">
                <li className="footer-list-social-item"><a href="#" className="footer-list-social-item-link"><i className="icon-facebook-square footer-list-social-item-link-icon"></i></a></li>
                <li className="footer-list-social-item"><a href="#" className="footer-list-social-item-link"><i className="icon-twitter-square footer-list-social-item-link-icon"></i></a></li>
                <li className="footer-list-social-item"><a href="#" className="footer-list-social-item-link"><i className="icon-pinterest-square footer-list-social-item-link-icon"></i></a></li>
                <li className="footer-list-social-item"><a href="#" className="footer-list-social-item-link"><i className="icon-instagrem footer-list-social-item-link-icon"></i></a></li>
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
      </div>
    );
  }
}

export default About;

