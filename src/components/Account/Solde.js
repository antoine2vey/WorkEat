import React, { Component } from 'react';
import * as images from '../../images';
import Slider from 'react-slick';

class Solde extends Component {
  constructor() {
    super();
    this.GotoNextSlide = this.GotoNextSlide.bind(this);
    this.GotoPrevSlide = this.GotoPrevSlide.bind(this);
  }
  GotoNextSlide() {
    this.slider.slickNext();
  }
  GotoPrevSlide() {
    this.slider.slickPrev();
  }
  render() {
    const settings = {
      slidesToShow: 1,
      slidesToScroll: 1,
      centerMode: true,
      variableWidth: true,
      infinite: false,
      arrows: false,
    };
    return (
      <div className="compteInfo-bloc">
        <div className="container-fluid">
          <h2 className="partTwo__title">Solde actuel: <span className="bold">0,00€</span></h2>
          <div className="partTwo__select">
            <div className="partTwo__type select-tab" data-tab="paypal">
              <img src={images.paypal} alt="Paypal" className="partTwo__icon" />
              <p className="partTwo__type-title">Paypal</p>
            </div>
            <div className="partTwo__type select-tab select-tab--current" data-tab="card">
              <img src={images.creditCard} alt="Solde du compte" className="partTwo__icon" />
              <p className="partTwo__type-title">Carte bancaire</p>
            </div>
          </div>
          <div className="partTwo__selected">
            <div id="solde" className="tab">solde</div>
            <div id="paypal" className="tab">paypal</div>
            <div id="card" className="tab tab--current">
              <div className="partTwo__add-card">
                <h3 className="partTwo__selected__title">Ajouter une carte</h3>
                <div className="material-field partTwo__owner">
                  <label htmlFor="name" className="material-field__label">Nom du propriétaire</label>
                  <input type="text" id="name" className="material-field__input" />
                </div>
                <div className="material-field partTwo__code">
                  <label htmlFor="code" className="material-field__label">Numéro de carte</label>
                  <input type="text" id="code" className="material-field__input" />
                </div>
                <div className="partTwo__expiry-cvv">
                  <div className="material-field partTwo__expiry">
                    <label htmlFor="expiry" className="material-field__label">Expire le</label>
                    <input type="text" id="expiry" className="material-field__input" />
                  </div>
                  <div className="material-field partTwo__cvv">
                    <label htmlFor="cvv" className="material-field__label">CVV</label>
                    <input type="text" id="cvv" className="material-field__input" />
                  </div>
                </div>
                <label htmlFor="checkbox" className="checkbox-label">
                  <input type="checkbox" className="material-field__checkbox" />
                     Enregistrer mes informations</label>
                <button type="button" name="Ajouter" className="btn-gold">Ajouter</button>
              </div>
              <div className="partTwo__cards-list">
                <h3 className="partTwo__selected__title">Cartes enregistrées</h3>
                <div className="cards-slider">
                  <div className="cards-slider__navigation cards-slider__navigation__prev" onClick={this.GotoPrevSlide} />
                  <div className="cards-slider__navigation cards-slider__navigation__next" onClick={this.GotoNextSlide} />
                  <Slider className="cards-slider" ref={c => this.slider = c } {...settings}>
                    <div className="card-container">
                      <div className="card visa-card">
                        <div className="card__top">
                          <div className="card__icons-container">
                            <img src={images.edit} alt="Editer la cart" className="card__icons" />
                            <img src={images.trashBlanc} alt="Supprimer la cart" className="card__icons" />
                          </div>
                          <img src={images.visa} alt="Type de carte" className="card__type" />
                        </div>
                        <div className="card__middle">
                          <p className="card__code">•••• •••• •••• 4356</p>
                        </div>
                        <div className="card__bottom">
                          <div className="card__owner">
                            <p className="card__label-name">Nom du propriétaire</p>
                            <p className="card__name">Clouet Pierre</p>
                          </div>
                          <div className="card__expiry">
                            <p className="card__label-date">Expire le</p>
                            <p className="card__date">06/18</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-container">
                      <div className="card master-card">
                        <div className="card__top">
                          <div className="card__icons-container">
                            <img src={images.edit} alt="Editer la cart" className="card__icons" />
                            <img src={images.trashBlanc} alt="Supprimer la cart" className="card__icons" />
                          </div>
                          <img src={images.mastercard} alt="Type de carte" className="card__type" />
                        </div>
                        <div className="card__middle">
                          <p className="card__code">•••• •••• •••• 6911</p>
                        </div>
                        <div className="card__bottom">
                          <div className="card__owner">
                            <p className="card__label-name">Nom du propriétaire</p>
                            <p className="card__name">Clouet Pierre</p>
                          </div>
                          <div className="card__expiry">
                            <p className="card__label-date">Expire le</p>
                            <p className="card__date">06/18</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-container">
                      <div className="card visa-card">
                        <div className="card__top">
                          <div className="card__icons-container">
                            <img src={images.edit} alt="Editer la cart" className="card__icons" />
                            <img src={images.trashBlanc} alt="Supprimer la cart" className="card__icons" />
                          </div>
                          <img src={images.visa} alt="Type de carte" className="card__type" />
                        </div>
                        <div className="card__middle">
                          <p className="card__code">•••• •••• •••• 0879</p>
                        </div>
                        <div className="card__bottom">
                          <div className="card__owner">
                            <p className="card__label-name">Nom du propriétaire</p>
                            <p className="card__name">Clouet Pierre</p>
                          </div>
                          <div className="card__expiry">
                            <p className="card__label-date">Expire le</p>
                            <p className="card__date">06/18</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-container">
                      <div className="card master-card">
                        <div className="card__top">
                          <div className="card__icons-container">
                            <img src={images.edit} alt="Editer la cart" className="card__icons" />
                            <img src={images.trashBlanc} alt="Supprimer la cart" className="card__icons" />
                          </div>
                          <img src={images.mastercard} alt="Type de carte" className="card__type" />
                        </div>
                        <div className="card__middle">
                          <p className="card__code">•••• •••• •••• 2876</p>
                        </div>
                        <div className="card__bottom">
                          <div className="card__owner">
                            <p className="card__label-name">Nom du propriétaire</p>
                            <p className="card__name">Clouet Pierre</p>
                          </div>
                          <div className="card__expiry">
                            <p className="card__label-date">Expire le</p>
                            <p className="card__date">06/18</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Slider>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Solde;
