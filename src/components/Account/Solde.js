import React, { Component } from 'react';
import Payment from 'payment';
import * as images from '../../images';

class Solde extends Component {
  constructor(props) {
    super(props);
    this.state = {
      owner: `${props.user.surname} ${props.user.name}`,
      number: '4242 4242 4242 4242',
      cvc: '433',
      date: '08/19',
      montant: 0,
    };

    this.changeInfo = this.changeInfo.bind(this);
  }

  componentDidMount() {
    const _this = this;

    // eslint-disable-next-line
    Stripe.setPublishableKey('pk_test_PJVcvbd18FBSYwdkNvtQDLX5');
    // eslint-disable-next-line
    paypal.Button.render({
      env: 'sandbox',
      client: {
        sandbox: 'AYzECXkI2cPmq3gpDQQ6SXyYZVe2292wsy4RPLi5WrMeOCZQZu2rEIfYM-rCdbvIfDr-5Nz4LsfuYVYv',
      },
      style: {
        label: 'checkout', // checkout || credit
        size: 'medium',    // tiny | small | medium
        shape: 'pill',     // pill | rect
        color: 'silver',
      },
      commit: true,
      payment() {
        // eslint-disable-next-line
        return paypal.rest.payment.create(this.props.env, this.props.client, {
          transactions: [
            {
              amount: { total: _this.state.montant, currency: 'EUR' },
            },
          ],
        });
      },

      onAuthorize(data, actions) {
        return actions.payment.execute().then(() => {
          _this.props.updateSolde(_this.state.montant);
        });
      },
    }, '#paypal-button-container');
    Payment.formatCardNumber(document.getElementById('number'));
    Payment.formatCardExpiry(document.getElementById('date'));
    Payment.formatCardCVC(document.getElementById('cvc'));
  }

  changeInfo(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  focusInput(event) {
    const { parentNode } = event.target;
    parentNode.classList.add('is-focused');
  }

  blurInput(event) {
    const { parentNode } = event.target;
    parentNode.classList.remove('is-focused');
  }

  submitPayment() {
    const { number, cvc, date } = this.state;
    const [exp_month, exp_year] = date.split('/');
    // eslint-disable-next-line
    Stripe.card.createToken({ number, cvc, exp_month, exp_year }, (status, res) => {
      if (res.error) {
        return console.error('error at Stripe handler', res);
      }

      const stripeToken = res.id;
      this.props.updateSolde(this.state.montant, stripeToken);
    });
  }

  render() {
    return (
      <div className="solde">
        <div className="container-fluid">
          <h2 className="solde__title">Solde actuel: <span className="bold">{this.props.user.solde.toFixed(2)}€</span></h2>
          <div className="payment__select">
            <div className="payment__type select-tab" data-tab="paypal">
              <div id="paypal-button-container"></div>
              {/*<img src={images.paypal} alt="Paypal" className="payment__icon" />
              <p className="payment__type-title">Paypal</p>*/}
            </div>
            <div className="payment__type select-tab" data-tab="card" onClick={() => this.submitPayment()}>
              <img src={images.creditCard} alt="Solde du compte" className="payment__icon" />
              <p className="payment__type-title">Carte bancaire</p>
            </div>
          </div>
          <div className="selected">
            <h3 className="selected__title" style={{ margin: 0, display: 'inline' }}>Montant à ajouter</h3>
            <div className="material-field partTwo__owner has-label">
              <label htmlFor="montant" className="material-field__label">Montant</label>
              <input type="number" pattern="\d*" min="0" id="montant" name="montant" value={this.state.montant} onFocus={this.focusInput} onBlur={this.blurInput} onChange={this.changeInfo} className="material-field__input" />
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
                          <p className="card__code">{this.state.number}</p>
                        </div>
                        <div className="card__bottom">
                          <div className="card__owner">
                            <p className="card__label-name">Nom du propriétaire</p>
                            <p className="card__name">{this.state.owner}</p>
                          </div>
                          <div className="card__expiry">
                            <p className="card__label-date">Expire le</p>
                            <p className="card__date">{this.state.date}</p>
                          </div>
                        </div>
                      </div>
                </div>
                <form className="payment__add-card" noValidate autoComplete="on">
                  <div className="material-field partTwo__owner has-label">
                    <label htmlFor="owner" className="material-field__label">Nom du propriétaire</label>
                    <input type="text" id="owner" name="owner" value={this.state.owner} onFocus={this.focusInput} onBlur={this.blurInput} onChange={this.changeInfo} className="material-field__input" />
                  </div>
                  <div className="material-field partTwo__code has-label">
                    <label htmlFor="number" className="material-field__label">Numéro de carte</label>
                    <input type="text" id="number" name="number" onChange={this.changeInfo} onFocus={this.focusInput} onBlur={this.blurInput} pattern="\d*" className="material-field__input" />
                  </div>
                  <div className="partTwo__expiry-cvv">
                    <div className="material-field partTwo__expiry has-label">
                      <label htmlFor="date" className="material-field__label">Expire le</label>
                      <input type="text" id="date" name="date" pattern="\d*" onChange={this.changeInfo} onFocus={this.focusInput} onBlur={this.blurInput} className="material-field__input" />
                    </div>
                    <div className="material-field partTwo__cvv has-label">
                      <label htmlFor="cvc" className="material-field__label">CVC</label>
                      <input type="text" id="cvc" pattern="\d*" onChange={this.changeInfo} onFocus={this.focusInput} onBlur={this.blurInput} className="material-field__input" />
                    </div>
                  </div>
                  <button type="button" name="Ajouter" className="btn-gold">Ajouter</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Solde;
