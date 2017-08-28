import React, { Component } from 'react';

const NotFound = ({ isOffline }) => (
  <div className="notFound">
    <p className="notFound__title">404</p>
    <p className="notFound__text">Vous avez perdu votre chemin ?</p>
    <a href="http://localhost:3000/" className="btn-gold notFound__link">Se connecter</a>
  </div>
);

export default NotFound;
