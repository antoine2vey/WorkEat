import React, { Component } from 'react';
import axios from 'axios';
import * as images from '../../images';
import Slider from 'react-slick';

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
    this.props.loginUser(this.state);
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
          <form onSubmit={this.handleLogin} className="header-home-form-content">
            <div className="row">
              <div className=" header-home-form-content-input">
                <input
                  type="email"
                  name="email"
                  placeholder="Email *"
                  required className="header-home-form-content-input-item"
                  onChange={this.handleChange}
                />
                <img src={images.user} className="header-home-form-content-input-icon" alt="Icone champs formulaire" />
              </div>
              <div className=" header-home-form-content-input">
                <input
                  type="password"
                  name="password"
                  placeholder="Mot de passe *"
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
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      surname: '',
      email: '',
      password: '',
      zipCode: '',
      town: '',
      address: '',
      phoneNumber: '',
      step: 0,
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.nextClick = this.nextClick.bind(this);
    this.GotoNextSlide = this.GotoNextSlide.bind(this);
    this.GotoPrevSlide = this.GotoPrevSlide.bind(this);
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

    console.log(this.state);

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
      console.log('compte crée');
    })
    .catch(err => console.error(err));
  }

  nextClick(e) {
    this.setState({ step: e });
  }

  GotoNextSlide() {
    if (this.state.step === 0) {
      if (this.state.name && this.state.surname) {
        this.slider.slickNext();
      }
    } else if (this.state.step === 1) {
      if (this.state.email && this.state.password) {
        this.slider.slickNext();
      }
    } else if (this.state.step === 2) {
      if (this.state.zipCode && this.state.town) {
        this.slider.slickNext();
      }
    }
  }

  GotoPrevSlide() {
    this.slider.slickPrev();
  }

  render() {
    const settings = {
      arrows: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: false,
      draggable: false,
      afterChange: this.nextClick,
    };
    return (
      <div>
        <div className="header-home-form-container">
          <p className="header-home-form-title">Inscription</p>
          <div className="header-home-form-step">
            <p className="header-home-form-step-phase">Etape {this.state.step + 1} sur 4</p>
            <div className={(this.state.step >= 0 ? 'header-home-form-step-puce--active' : 'header-home-form-step-puce')} />
            <div className={(this.state.step >= 1 ? 'header-home-form-step-puce--active' : 'header-home-form-step-puce')} />
            <div className={(this.state.step >= 2 ? 'header-home-form-step-puce--active' : 'header-home-form-step-puce')} />
            <div className={(this.state.step >= 3 ? 'header-home-form-step-puce--active' : 'header-home-form-step-puce')} />
          </div>
          <form onSubmit={this.handleLogin} className="header-home-form-content">
            <Slider ref={c => this.slider = c} {...settings}>
              <div className="header-home-form-content-row">
                <div className=" header-home-form-content-input">
                  <input id="name" className="header-home-form-content-input-item" type="text" name="name" placeholder="Nom" onChange={this.handleChange} />
                  <img src={images.user} alt="Icone" className="header-home-form-content-input-icon" />
                </div>
                <div className="header-home-form-content-input">
                  <input id="surname" className="header-home-form-content-input-item" type="text" name="surname" placeholder="Prénom" onChange={this.handleChange} />
                  <img src={images.user} alt="Icone" className="header-home-form-content-input-icon" />
                </div>
              </div>
              <div className="header-home-form-content-row">
                <div className="header-home-form-content-input">
                  <input id="email" className="header-home-form-content-input-item" type="email" name="email" placeholder="Email" onChange={this.handleChange} />
                  <img src={images.user} alt="Icone" className="header-home-form-content-input-icon" />
                </div>
                <div className="header-home-form-content-input">
                  <input id="password" className="header-home-form-content-input-item" type="password" name="password" placeholder="Mot de passe" onChange={this.handleChange} />
                  <img src={images.user} alt="Icone" className="header-home-form-content-input-icon" />
                </div>
              </div>
              <div className="header-home-form-content-row">
                <div className="header-home-form-content-input">
                  <input className="header-home-form-content-input-item" name="zipCode" type="text" placeholder="Code postal" onChange={this.handleChange} />
                  <img src={images.user} alt="Icone" className="header-home-form-content-input-icon" />
                </div>
                <div className="header-home-form-content-input">
                  <input id="town" className="header-home-form-content-input-item" name="town" type="text" placeholder="Ville" onChange={this.handleChange} />
                  <img src={images.user} alt="Icone" className="header-home-form-content-input-icon" />
                </div>
              </div>
              <div className="header-home-form-content-row">
                <div className="header-home-form-content-input">
                  <input id="address" className="header-home-form-content-input-item" name="address" type="text" placeholder="Adresse" onChange={this.handleChange} />
                  <img src={images.user} alt="Icone" className="header-home-form-content-input-icon" />
                </div>
                <div className="header-home-form-content-input">
                  <input id="phoneNumber" className="header-home-form-content-input-item" name="phoneNumber" type="text" placeholder="Téléphone" onChange={this.handleChange} />
                  <img src={images.user} alt="Icone" className="header-home-form-content-input-icon" />
                </div>
              </div>
            </Slider>
            <div className="header-home-form-step-nav">
              <img
                src={images.arrow}
                alt="icon"
                onClick={this.GotoPrevSlide}
                className="header-home-form-step-arrow-left"
                style={{ display: this.state.step === 0 ? 'none' : 'block' }}
              />
              <img
                src={images.arrow}
                alt="icon"
                onClick={this.GotoNextSlide}
                className="header-home-form-step-arrow"
                style={{ display: this.state.step === 3 ? 'none' : 'block' }}
              />
            </div>
            <input type="submit" value="create" style={{ display: this.state.town && this.state.phoneNumber ? 'inline-block' : 'none' }} />
          </form>
        </div>
      </div>
    );
  }
}

export { LoginBox, ConnectionBox };
