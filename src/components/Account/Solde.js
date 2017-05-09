import React, { Component } from 'react';
import * as images from '../../images';

class Solde extends Component {
  constructor(props) {
    super(props);
    this.state = {
      owner: `${props.user.surname} ${props.user.name}`,
      date: '',
      expiry: '',
      code: '',
    };
  }
  render() {
    return (
      <div className="solde">
        <div className="container-fluid">
          <h2 className="solde__title">Solde actuel: <span className="bold">{this.props.user.solde.toFixed(2)}€</span></h2>
          <div className="payment__select">
            <div className="payment__type select-tab" data-tab="paypal">
              <img src={images.paypal} alt="Paypal" className="payment__icon" />
              <p className="payment__type-title">Paypal</p>
            </div>
            <div className="payment__type select-tab select-tab--current" data-tab="card">
              <img src={images.creditCard} alt="Solde du compte" className="payment__icon" />
              <p className="payment__type-title">Carte bancaire</p>
            </div>
          </div>
          <div className="selected">
            <div id="paypal" className="tab">paypal</div>
            <div id="card" className="tab tab--current">
              <h3 className="selected__title">Saisissez les informations de votre carte</h3>
              <div className="cards-container">
                <div className="cards-list">
                      <div className="card visa-card">
                        <div className="card__top">
                          <img src={images.visa} alt="Type de carte" className="card__type" />
                        </div>
                        <div className="card__middle">
                          <p className="card__code">•••• •••• •••• 4356</p>
                        </div>
                        <div className="card__bottom">
                          <div className="card__owner">
                            <p className="card__label-name">Nom du propriétaire</p>
                            <p className="card__name">{this.state.owner}</p>
                          </div>
                          <div className="card__expiry">
                            <p className="card__label-date">Expire le</p>
                            <p className="card__date">06/18</p>
                          </div>
                        </div>
                      </div>
                </div>
                <div className="payment__add-card">
                  <div className="material-field partTwo__owner">
                    <label htmlFor="owner" className="material-field__label">Nom du propriétaire</label>
                    <input type="text" id="owner" value={this.state.owner} onChange={this.changeInfo} className="material-field__input" />
                  </div>
                  <div className="material-field partTwo__code">
                    <label htmlFor="code" className="material-field__label">Numéro de carte</label>
                    <input type="text" id="code" className="material-field__input" />
                  </div>
                  <div className="partTwo__expiry-cvv">
                    <div className="material-field partTwo__expiry">
                      <label htmlFor="date" className="material-field__label">Expire le</label>
                      <input type="text" id="date" className="material-field__input" />
                    </div>
                    <div className="material-field partTwo__cvv">
                      <label htmlFor="cvv" className="material-field__label">CVV</label>
                      <input type="text" id="cvv" className="material-field__input" />
                    </div>
                  </div>
                  <button type="button" name="Ajouter" className="btn-gold">Ajouter</button>
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
