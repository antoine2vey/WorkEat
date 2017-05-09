import React from 'react';
import { logoBlanc } from '../../images';
import Cookie from '../Cookie/Cookie';

const Footer = () => (
  <div>
      <div className="container-fluid footer--container">
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
  <Cookie />
  </div>
);




export default Footer;
