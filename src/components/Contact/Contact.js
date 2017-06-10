import React, { Component } from 'react';

class Contact extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="partContact">
          <div className="partContact-banner">
            <h1 className="partContact-banner-title">Contact</h1>
          </div>
          <div className="row partContact-space">
            <div className="one columns">
              <br />
            </div>
            <div className="five columns">
              <div className="row">
                <div className="twelve columns">
                  <div className="partContact-info">
                    <h4 className="partContact-info-title">Adresse</h4>
                    <hr />
                    <p className="partContact-info-p">
                      1 rue d Arras <br /> Lille 59000
                    </p>
                  </div>
                </div>
              </div>
              <h3 className="partContact-title">Un avis ?</h3>
              <form action="#" className="partContact-form">
                <div className="material-field">
                  <label className="material-field__label" htmlFor="prenom">Prénom</label>
                  <input type="text" id="prenom" name="firstname" onChange={this.handleChange} className="material-field__input" />
                </div>
                <div className="material-field">
                  <label className="material-field__label" htmlFor="nom">Nom</label>
                  <input type="text" id="nom" name="lastname" onChange={this.handleChange} className="material-field__input" />
                </div>
                <div className="material-field">
                  <label className="material-field__label" htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" onChange={this.handleChange} className="material-field__input" />
                </div>
                <div className="material-field div-message">
                  <label className="material-field__label" htmlFor="message"></label>
                <textarea placeholder="Votre Message..." className="partContact-form-input textarea" id="message" rows="10"></textarea>
                </div>
                <button className="btn-gold btn-full">Envoyer</button>
              </form>
            </div>
            <div className="five columns">
              <iframe className="partContact-maps" src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d20247.24938208072!2d3.06215325!3d50.628859799999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sfr!2sfr!4v1493192625489" frameBorder="0"  allowFullScreen></iframe>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Contact;
