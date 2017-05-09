import React, { Component } from 'react';
import GMap from '../Admin/tabs/GoogleMap.js';

class InfoGenerale extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      name: '',
      surname: '',
      phoneNumber: '',
      address: '',
      codePostal: '',
      town: '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.fetchPlacesIfNeeded();
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value }, () => console.log(this.state));
  }

  focusInput(event) {
    const { value, id } = event.target;

    console.log(value);
    console.log(id);
  }

  render() {
    const { user, deleteUser, places } = this.props;
    return (
      <div className="container-fluid">
        <div className="compteInfo-bloc">
          <h5>INFORMATIONS GÉNÉRALES</h5>
          <div className="row">
            <form action="#" method="post" className="compteInfo-form">
              <div className="row compteInfo-rowForm">
                <div className="material-field compteInfo-field" id="test">
                  <label className="material-field__label" htmlFor="prenom">Prénom</label>
                  <input type="text" id="prenom" defaultValue={user.surname} onFocus={this.focusInput} name="surname" onChange={this.handleChange} className="material-field__input compteInfo-input" />
                </div>
                <div className="material-field compteInfo-field">
                  <label className="material-field__label" htmlFor="name">Nom</label>
                  <input type="text" id="name" defaultValue={user.name} name="name" onChange={this.handleChange} className="material-field__input compteInfo-input" />
                </div>

                <div className="compteInfo-maps">
                  <GMap loadedPlaces={places} />
                </div>
                <div className="material-field compteInfo-field">
                  <label className="material-field__label" htmlFor="email">Email</label>
                  <input type="email" id="email" name="username" defaultValue={user.username} onChange={this.handleChange} className="material-field__input compteInfo-input" />
                </div>
                <div className="material-field compteInfo-field">
                  <label className="material-field__label" htmlFor="tel">Tel</label>
                  <input type="text" id="tel" name="phoneNumber" defaultValue={user.phoneNumber} onChange={this.handleChange} className="material-field__input compteInfo-input" />
                </div>
              </div>
              <div className="row">
                <div className="material-field compteInfo-field">
                  <label className="material-field__label" htmlFor="NumeroRue" >N° et nom de rue</label>
                  <input type="text" id="NumeroRue" defaultValue={user.address} name="address" onChange={this.handleChange} className="material-field__input compteInfo-input" />
                </div>
                <div className="material-field compteInfo-field">
                  <label className="material-field__label" htmlFor="CP">Code Postal </label>
                  <input type="text" id="CP" defaultValue={user.codePostal} name="codePostal" onChange={this.handleChange} className="material-field__input compteInfo-input" />
                </div>
                <div className="material-field compteInfo-field">
                  <label className="material-field__label" htmlFor="ville" >Ville </label>
                  <input type="text" id="ville" defaultValue={user.town} name="town" onChange={this.handleChange} className="material-field__input compteInfo-input" />
                </div>
                <div className="material-field  compteInfo-field">
                  <label className="material-field__label" htmlFor="mdpNew">Nouveau mot de passe</label>
                  <input type="text" id="mdpNew" onChange={this.handleChange} name="password" className="material-field__input compteInfo-input" />
                </div>
                <div className="material-field  compteInfo-field">
                  <label className="material-field__label" htmlFor="mdpConfirm">Confirmez le mot de passe</label>
                  <input type="text" id="mdpConfirm" onChange={this.handleChange} className="material-field__input compteInfo-input" />
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
  }
}

export default InfoGenerale;
