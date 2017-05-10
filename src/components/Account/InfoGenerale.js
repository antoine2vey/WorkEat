import React, { Component } from 'react';
import GMap from '../Admin/tabs/GoogleMap.js';

class InfoGenerale extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props.user.username,
      name: props.user.name,
      surname: props.user.surname,
      phoneNumber: props.user.phoneNumber,
      address: props.user.address,
      codePostal: props.user.codePostal,
      town: props.user.town,
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(event) {
    this.props.fetchPlacesIfNeeded();
    console.log(this.props.user);
    console.log(this.places);

  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value }, () => console.log(this.state));
  }

  focusInput(event) {
    const { parentNode } = event.target;
    parentNode.classList.add('is-focused');
  }

  blurInput(event) {
    const { parentNode } = event.target;
    parentNode.classList.remove('is-focused');
  }

  render() {
    const { deleteUser, places } = this.props;
    return (
      <div className="container-fluid">
        <div className="compteInfo-bloc">
          <h5>INFORMATIONS GÉNÉRALES</h5>
          <div className="row">
            <form action="#" method="post" className="compteInfo-form">
              <div className="row compteInfo-rowForm">
                <div className="material-field compteInfo-field has-label">
                  <label className="material-field__label" htmlFor="prenom">Prénom</label>
                  <input type="text" id="prenom" value={this.state.surname} name="surname" onChange={this.handleChange} onFocus={this.focusInput} onBlur={this.blurInput} className="material-field__input compteInfo-input" />
                </div>
                <div className="material-field compteInfo-field has-label">
                  <label className="material-field__label" htmlFor="name">Nom</label>
                  <input type="text" id="name" value={this.state.name} name="name" onChange={this.handleChange} onFocus={this.focusInput} onBlur={this.blurInput} className="material-field__input compteInfo-input" />
                </div>

                <div className="compteInfo-maps">
                  <GMap loadedPlaces={places} />
                </div>
                <div className="material-field compteInfo-field has-label">
                  <label className="material-field__label" htmlFor="email">Email</label>
                  <input type="email" id="email" name="username" onFocus={this.focusInput} value={this.state.username} onChange={this.handleChange} onBlur={this.blurInput} className="material-field__input compteInfo-input" />
                </div>
                <div className="material-field compteInfo-field has-label">
                  <label className="material-field__label" htmlFor="tel">Tel</label>
                  <input type="text" id="tel" name="phoneNumber" onFocus={this.focusInput} value={this.state.phoneNumber} onChange={this.handleChange} onBlur={this.blurInput} className="material-field__input compteInfo-input" />
                </div>
                <div className="material-field compteInfo-field has-label fullInput">
                  <label className="material-field__label" htmlFor="livraison">Point de livraison</label>
                  <select id="livraison">
{places.map(place => <option value={place._id} key={place._id}>{place.name}</option>)}
</select>
                </div>
              </div>
              <div className="row">
                <div className="material-field compteInfo-field has-label">
                  <label className="material-field__label" htmlFor="NumeroRue" >N° et nom de rue</label>
                  <input type="text" id="NumeroRue" onFocus={this.focusInput} value={this.state.address} name="address" onChange={this.handleChange} onBlur={this.blurInput} className="material-field__input compteInfo-input" />
                </div>
                <div className="material-field compteInfo-field has-label">
                  <label className="material-field__label" htmlFor="CP">Code Postal </label>
                  <input type="text" id="CP" onFocus={this.focusInput} value={this.state.codePostal} name="codePostal" onChange={this.handleChange} onBlur={this.blurInput} className="material-field__input compteInfo-input" />
                </div>
                <div className="material-field compteInfo-field has-label">
                  <label className="material-field__label" htmlFor="ville" >Ville </label>
                  <input type="text" id="ville" onFocus={this.focusInput} value={this.state.town} name="town" onChange={this.handleChange} onBlur={this.blurInput} className="material-field__input compteInfo-input" />
                </div>
                <div className="material-field  compteInfo-field has-label">
                  <label className="material-field__label" htmlFor="mdpNew">Nouveau mot de passe</label>
                  <input type="text" id="mdpNew" onFocus={this.focusInput} onChange={this.handleChange} onBlur={this.blurInput} name="password" className="material-field__input compteInfo-input" />
                </div>
                <div className="material-field  compteInfo-field has-label">
                  <label className="material-field__label" htmlFor="mdpConfirm">Confirmez le mot de passe</label>
                  <input type="text" id="mdpConfirm" onFocus={this.focusInput} onChange={this.handleChange} onBlur={this.blurInput} className="material-field__input compteInfo-input" />
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
