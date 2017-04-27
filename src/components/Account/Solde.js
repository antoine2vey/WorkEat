import React from 'react';

const Solde = () => (
  <div className="compteInfo-bloc">

  <div className="container-fluid">
    <h2 className="partTwo__title">Solde actuel: <span className="bold">0,00€</span></h2>
    <div className="partTwo__select">
      <div className="partTwo__type select-tab" data-tab="paypal">
        <img src="images/icons/paypal.svg" alt="Solde du compte" className="partTwo__icon" />
        <p className="partTwo__type-title">Paypal</p>
      </div>
      <div className="partTwo__type select-tab select-tab--current" data-tab="card">
        <img src="images/icons/credit-card.svg" alt="Solde du compte" className="partTwo__icon" />
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
            <label for="name" className="material-field__label">Nom du propriétaire</label>
            <input type="text" id="name" className="material-field__input" />
          </div>
          <div className="material-field partTwo__code">
            <label for="code" className="material-field__label">Numéro de carte</label>
            <input type="text" id="code" className="material-field__input" />
          </div>
          <div className="partTwo__expiry-cvv">
            <div className="material-field partTwo__expiry">
              <label for="expiry" className="material-field__label">Expire le</label>
              <input type="text" id="expiry" className="material-field__input" />
            </div>
            <div className="material-field partTwo__cvv">
              <label for="cvv" className="material-field__label">CVV</label>
              <input type="text" id="cvv" className="material-field__input" />
            </div>
          </div>
          <div className="rkmd-checkbox checkbox-ripple">
                <label className="input-checkbox checkbox-red">
                  <input type="checkbox" id="checkbox-1" checked />
                  <span className="checkbox"></span>
                </label>
                <label for="checkbox-1" className="label">Checkbox</label>
              </div>
          <button type="button" name="Ajouter" className="btn-gold">Ajouter</button>
        </div>
        <div className="partTwo__cards-list">
          <h3 className="partTwo__selected__title">Cartes enregistrées</h3>
          <div className="cards-slider">
            <div className="card-container">
              <div className="card visa-card">
                <div className="card__top">
                  <div className="card__icons-container">
                    <img src="images/icons/edit.svg" alt="Editer la cart" className="card__icons" />
                    <img src="images/icons/trash-blanc.svg" alt="Supprimer la cart" className="card__icons" />
                  </div>
                  <img src="images/icons/visa.svg" alt="Type de carte" className="card__type" />
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
                    <img src="images/icons/edit.svg" alt="Editer la cart" className="card__icons" />
                    <img src="images/icons/trash-blanc.svg" alt="Supprimer la cart" className="card__icons" />
                  </div>
                  <img src="images/icons/mastercard.svg" alt="Type de carte" className="card__type" />
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
                    <img src="images/icons/edit.svg" alt="Editer la cart" className="card__icons" />
                    <img src="images/icons/trash-blanc.svg" alt="Supprimer la cart" className="card__icons" />
                  </div>
                  <img src="images/icons/visa.svg" alt="Type de carte" className="card__type" />
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
                    <img src="images/icons/edit.svg" alt="Editer la cart" className="card__icons" />
                    <img src="images/icons/trash-blanc.svg" alt="Supprimer la cart" className="card__icons" />
                  </div>
                  <img src="images/icons/mastercard.svg" alt="Type de carte" className="card__type" />
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
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>

);

export default Solde;
