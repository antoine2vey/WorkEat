import React, { Component } from 'react';
import axios from 'axios';
import Auth from '../../modules/Auth';
import * as images from '../../images';

class LoginBox extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleLogin(event) {
    event.preventDefault();
    const { email, password } = this.state;

    Auth.authenticateUser({ email, password })
    .then(() => {
      this.props.history.push('/');
    }).catch(err => console.log(err));
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div>
        <div className="header-home-form-container">
          <p className="header-home-form-title">Connexion</p>
          <div className="header-home-form-step" style={{ opacity: 0 }}>
            <p className="header-home-form-step-phase">Etape 1 sur 4</p>
            <div className="header-home-form-step-puce active" />
            <div className="header-home-form-step-puce" />
            <div className="header-home-form-step-puce" />
            <div className="header-home-form-step-puce" />
          </div>
          <form onSubmit={this.handleLogin} className="header-home-form-content">
            <div className="row">
              <div className="six columns header-home-form-content-input">
                <input
                  type="email"
                  name="email"
                  placeholder="Email *"
                  autoComplete="off"
                  required className="header-home-form-content-input-item"
                  onChange={this.handleChange}
                />
                <img src={images.user} className="header-home-form-content-input-icon" alt="Icone champs formulaire" />
              </div>
              <div className="six columns header-home-form-content-input">
                <input
                  type="password"
                  name="password"
                  placeholder="Mot de passe *"
                  autoComplete="off"
                  required className="header-home-form-content-input-item"
                  onChange={this.handleChange}
                />
                <img src={images.user} className="header-home-form-content-input-icon" alt="Icone champs formulaire" />
              </div>
              <div className="twelve columns">
                <button type="submit" className="header-home-form-content-btn">Connexion</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

class ConnectionBox extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      surname: '',
      email: '',
      password: '',
      zipCode: '',
      town: '',
      address: '',
      phoneNumber: '',
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleLogin(e) {
    const {
      name,
      surname,
      email,
      password,
      zipCode,
      town,
      address,
      phoneNumber,
    } = this.state;
    e.preventDefault();

    axios.post('/account/create', {
      username: email,
      password,
      name,
      surname,
      codePostal: zipCode,
      town,
      address,
      phoneNumber,
    })
    .then(() => {

    })
    .catch(err => console.error(err));
  }
  render() {
    return (
      /* <form onSubmit={this.handleLogin}>
          <div className="field">
            <label className="label">Nom</label>
            <p className="control">
              <input className="input" type="text" name="name" placeholder="Text input" onChange={this.handleChange}/>
            </p>
          </div>
          <div className="field">
            <label className="label">Prénom</label>
            <p className="control">
              <input className="input" type="text" name="surname" placeholder="Text input" onChange={this.handleChange}/>
            </p>
          </div>
          <div className="field">
            <label className="label">Email</label>
            <p className="control">
              <input className="input" type="email" name="email" placeholder="Text input" onChange={this.handleChange}/>
            </p>
          </div>
          <div className="field">
            <label className="label">Password</label>
            <p className="control">
              <input className="input" type="password" name="password" placeholder="Text input" onChange={this.handleChange}/>
            </p>
          </div>
          <div className="field">
            <label className="label">Code postal</label>
            <p className="control">
              <input className="input" name="zipCode" type="text" placeholder="Text input" onChange={this.handleChange}/>
            </p>
          </div>
          <div className="field">
            <label className="label">Ville</label>
            <p className="control">
              <input className="input" name="town" type="text" placeholder="Text input" onChange={this.handleChange}/>
            </p>
          </div>
          <div className="field">
            <label className="label">Adresse</label>
            <p className="control">
              <input className="input" name="address" type="text" placeholder="Text input" onChange={this.handleChange}/>
            </p>
          </div>
          <div className="field">
            <label className="label">Numéro de téléphone</label>
            <p className="control">
              <input className="input" name="phoneNumber" type="text" placeholder="Text input" onChange={this.handleChange}/>
            </p>
          </div>
          <input type="submit" value="create"/>
        </form>*/
      <div>
        <div className="header-home-form-container">
          <p className="header-home-form-title">Inscription</p>
          <div className="header-home-form-step">
            <p className="header-home-form-step-phase">Etape 1 sur 4</p>
            <div className="header-home-form-step-puce active" />
            <div className="header-home-form-step-puce" />
            <div className="header-home-form-step-puce" />
            <div className="header-home-form-step-puce" />
          </div>
          <form onSubmit={this.handleLogin} className="header-home-form-content">
            <div className="row">
              <div className="six columns header-home-form-content-input">
                <input
                  type="email"
                  name="email"
                  placeholder="Email *"
                  autoComplete="off"
                  required className="header-home-form-content-input-item"
                  onChange={this.handleChange}
                />
                <img src={images.user} className="header-home-form-content-input-icon" alt="Icone champs formulaire" />
              </div>
              <div className="six columns header-home-form-content-input">
                <input
                  type="password"
                  name="password"
                  placeholder="Mot de passe *"
                  autoComplete="off"
                  required className="header-home-form-content-input-item"
                  onChange={this.handleChange}
                />
                <img src={images.user} className="header-home-form-content-input-icon" alt="Icone champs formulaire" />
              </div>
              <div className="twelve columns">
                <button type="submit" className="header-home-form-content-btn">Suivant</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export { LoginBox, ConnectionBox };
