import React, { Component } from 'react';

class Contact extends Component {
  render() {
    return (
      <div className="container-fluid">
      <div className="partContact">
        <div className="partContact-banner">

        </div>
        <h1 className="partContact-banner-title">Contact</h1>
        <div className="row partContact-space">
          <div className="one columns">
            <br />
          </div>
          <div className="five columns">
            <div className="row">
              <div className="five columns">
                <div className="partContact-info">
                  <h4 className="partContact-info-title">Horaires</h4>
                  <hr />
                  <p className="partContact-info-p">
                    Du Lundi au Vendredi<br /> 8h00 à 11h30
                  </p>
                </div>
              </div>
                  <div className="one column">
                  </div>
              <div className="six columns">
                <div className="partContact-info">
                  <h4 className="partContact-info-title">Nous Contacter</h4>
                  <hr />
                  <p className="partContact-info-p">
                    1 rue d Arras <br /> Lille 59000
                  </p>
                </div>
              </div>
            </div>
            <h3 className="partContact-title">Un avis ?</h3>
            <form action="#" className="partContact-form">
  <input type="text" placeholder="Nom" className="partContact-form-input"/>
  <input type="text" placeholder="Prénom" className="partContact-form-input"/>
  <input type="email" placeholder="Email" className="partContact-form-input"/>
  <textarea placeholder="Votre Message..." className="partContact-form-input textarea" rows="10"></textarea>
  <input type="submit" value="Envoyer" className="btn-gold btn-full" />
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
