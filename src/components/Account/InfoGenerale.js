import React from 'react';

const InfoGenerale = () => (
  <div className="container-fluid">
    <div className="compteInfo-bloc">
      <h5>INFORMATIONS GÉNÉRALES</h5>
      <div className="row">
        <form action="#" method="post" className="compteInfo-form">
          <div className="row compteInfo-rowForm">
          <div className="material-field compteInfo-field ">
          <label className="material-field__label">Prénom</label>
          <input type="text" className="material-field__input compteInfo-input"/>
        </div>
        <div className="material-field compteInfo-field">
        <label className="material-field__label">Nom</label>
        <input type="text" className="material-field__input compteInfo-input"/>
      </div>
      <iframe className="compteInfo-maps" src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d20247.24938208072!2d3.06215325!3d50.628859799999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sfr!2sfr!4v1493192625489" frameBorder="0" className={{border:0}} allowFullScreen></iframe>
      <div className="material-field compteInfo-field">
      <label className="material-field__label">Email</label>
      <input type="email" className="material-field__input compteInfo-input"/>
    </div>
    <div className="material-field compteInfo-field">
    <label className="material-field__label">Tel</label>
    <input type="text" className="material-field__input compteInfo-input"/>
  </div>
  </div>
  <div className="row">
  <div className="material-field compteInfo-field">
  <label className="material-field__label">N° et nom de rue</label>
  <input type="text" className="material-field__input compteInfo-input"/>
  </div>
  <div className="material-field compteInfo-field">
  <label className="material-field__label">Code Postal </label>
  <input type="text" className="material-field__input compteInfo-input"/>
  </div>
  <div className="material-field compteInfo-field">
  <label className="material-field__label">Ville </label>
  <input type="text" className="material-field__input compteInfo-input"/>
  </div>
  <div className="material-field compteInfo-field">
  <label className="material-field__label">Code Postal </label>
  <input type="text" className="material-field__input compteInfo-input"/>
  </div>
  <div className="material-field compteInfo-field">
  <label className="material-field__label">Mot de passe actuel </label>
  <input type="text" className="material-field__input compteInfo-input "/>
  </div>
  <div className="material-field  compteInfo-field">
  <label className="material-field__label">Nouveau mot de passe</label>
  <input type="text" className="material-field__input compteInfo-input"/>
  </div>
  <div className="material-field  compteInfo-field">
  <label className="material-field__label">Confirmez le mot de passe</label>
  <input type="text" className="material-field__input compteInfo-input"/>
  </div>
    <button type="submit" className="btn-red compteInfo-submit">MODIFIER</button>
  </div>
        </form>
    </div>
    <div className="row">
        <h5> SUPPRIMER VOTRE COMPTE</h5>
        <p>
          Vous pouvez supprimer votre compte cependant cette action est irréversible.
        </p>
          <button type="submit" className="btn-red compteInfo-btnSuppr">SUPPRIMER</button>
    </div>
  </div>
  </div>
      );


export default InfoGenerale;
