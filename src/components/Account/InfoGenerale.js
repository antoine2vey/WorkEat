import React from 'react';
import GMap from '../Admin/tabs/GoogleMap.js';

const InfoGenerale = ({ user, deleteUser }) => (
  <div className="container-fluid">
    <div className="compteInfo-bloc">
      <h5>INFORMATIONS GÉNÉRALES</h5>
      <div className="row">
        <form action="#" method="post" className="compteInfo-form">
          <div className="row compteInfo-rowForm">
            <div className="material-field compteInfo-field ">
              <label className="material-field__label" htmlFor="prenom">Prénom</label>
              <input type="text" id="prenom" defaultValue={user.surname} className="material-field__input compteInfo-input" />
            </div>
            <div className="material-field compteInfo-field">
              <label className="material-field__label" htmlFor="name">Nom</label>
              <input type="text" id="name" defaultValue={user.name} className="material-field__input compteInfo-input" />
            </div>

            {/*<GMap />*/}
            <div className="GMap" />
            <div className="material-field compteInfo-field">
              <label className="material-field__label" htmlFor="email">Email</label>
              <input type="email" id="email" defaultValue={user.username} className="material-field__input compteInfo-input" />
            </div>
            <div className="material-field compteInfo-field">
              <label className="material-field__label" htmlFor="tel">Tel</label>
              <input type="text" id="tel" defaultValue={user.phoneNumber} className="material-field__input compteInfo-input" />
            </div>
          </div>
          <div className="row">
            <div className="material-field compteInfo-field">
              <label className="material-field__label" htmlFor="NumeroRue" >N° et nom de rue</label>
              <input type="text" id="NumeroRue" defaultValue={user.address} className="material-field__input compteInfo-input" />
            </div>
            <div className="material-field compteInfo-field">
              <label className="material-field__label" htmlFor="CP">Code Postal </label>
              <input type="text" id="CP" defaultValue={user.codePostal} className="material-field__input compteInfo-input" />
            </div>
            <div className="material-field compteInfo-field">
              <label className="material-field__label" htmlFor="ville" >Ville </label>
              <input type="text" id="ville" defaultValue={user.town} className="material-field__input compteInfo-input" />
            </div>
            <div className="material-field  compteInfo-field">
              <label className="material-field__label" htmlFor="mdpNew">Nouveau mot de passe</label>
              <input type="text" id="mdpNew" className="material-field__input compteInfo-input" />
            </div>
            <div className="material-field  compteInfo-field">
              <label className="material-field__label" htmlFor="mdpConfirm">Confirmez le mot de passe</label>
              <input type="text" id="mdpConfirm" className="material-field__input compteInfo-input" />
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
        <button type="submit" className="btn-red compteInfo-btnSuppr" onClick={deleteUser}>SUPPRIMER</button>
      </div>
    </div>
  </div>
);


export default InfoGenerale;
