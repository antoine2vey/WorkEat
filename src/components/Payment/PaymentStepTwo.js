import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getTotalPrice, getProducts } from '../../reducers/cart';
import { checkoutCart } from '../../actions/cart';
import { visa, pig, creditCard } from '../../images';

class PaymentStepTwo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: '4242424242424242',
      cvc: '433',
      exp_month: '08',
      exp_year: '19',
    };
  }

  componentDidMount() {
    // Total in paypal.Button is scope to window ..
    let total = this.props.total;
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
              amount: { total, currency: 'EUR' },
            },
          ],
        });
      },

      onAuthorize(data, actions) {
        return actions.payment.execute().then(() => {
          alert('Payment done!');
        });
      },
    }, '#paypal-button-container');
  }

  submitPayment() {
    const { number, cvc, exp_month, exp_year } = this.state;
    // eslint-disable-next-line
    Stripe.card.createToken({ number, cvc, exp_month, exp_year }, (status, res) => {
      if (res.error) {
        return console.error('error at Stripe handler', res);
      }

      const stripeToken = res.id;
      this.props.checkoutCart('STRIPE', this.props.match.params.orderId, stripeToken);
    });
  }

  payWithSolde() {
    this.props.checkoutCart('SOLDE', this.props.match.params.orderId);
  }

  render() {
    return (
      <div className="partTwo">
        <div className="container-fluid">
          <h2 className="partTwo__title">Total de votre commande : <span className="bold">{this.props.total}€</span></h2>
          <div className="partTwo__select">
            <div to="/compte/solde" className="partTwo__type select-tab" onClick={() => this.payWithSolde()}>
              <img src={pig} alt="Solde du compte" className="partTwo__icon" />
              <p className="partTwo__type-title">Solde du compte</p>
              <p className="partTwo__solde">Solde actuel : <span className="bold">{this.props.solde}€</span></p>
            </div>
            {/*<div className="partTwo__type select-tab" data-tab="paypal">
              <img src={paypal} alt="Solde du compte" className="partTwo__icon" />
              <p className="partTwo__type-title">Paypal</p>
            </div>*/}
            <div id="paypal-button-container" className="partTwo__type select-tab" onClick={() => this.payWithPaypal()} />
            <div className="partTwo__type select-tab select-tab--current" data-tab="card">
              <img src={creditCard} alt="Solde du compte" className="partTwo__icon" />
              <p className="partTwo__type-title">Carte bancaire</p>
            </div>
          </div>
          <div className="selected">
            <div id="solde" className="tab">solde</div>
            <div id="paypal" className="tab">paypal</div>
            <div id="card" className="tab tab--current">
                  <h3 className="selected__title">Saisissez les informations de votre carte</h3>
                  <div className="cards-container">
                    <div className="cards-list">
                          <div className="card visa-card">
                            <div className="card__top">
                              <img src={visa} alt="Type de carte" className="card__type" />
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
                    <form className="payment__add-card">
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
                      <button type="button" name="Ajouter" className="btn-gold">Ajouter</button>
                    </form>
                  </div>
                </div>
          </div>
          <div className="btn-container">
            <button className="btn-gold">Revenir au panier</button>
            <button className="btn-gold" onClick={() => this.submitPayment()}>Suivant</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cart: getProducts(state.cart),
  total: getTotalPrice(state.cart),
  solde: state.auth.user.solde,
});

export default withRouter(connect(mapStateToProps, { checkoutCart })(PaymentStepTwo));
