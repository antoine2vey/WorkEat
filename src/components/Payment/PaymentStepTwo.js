import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import Payment from 'payment';
import { connect } from 'react-redux';
import { getTotalPrice, getProducts } from '../../reducers/cart';
import { checkoutCart } from '../../actions/cart';
import { visa, pig, creditCard } from '../../images';

class PaymentStepTwo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      owner: `${props.user.surname} ${props.user.name}`,
      number: '4242 4242 4242 4242',
      cvc: '433',
      date: '08/19',
    };

    this.changeInfo = this.changeInfo.bind(this);
  }

  componentDidMount() {
    // Format input card
    Payment.formatCardNumber(document.getElementById('number'));
    Payment.formatCardExpiry(document.getElementById('date'));
    Payment.formatCardCVC(document.getElementById('cvc'));
    // Total in paypal.Button is scope to window ..
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
              amount: { total: _this.props.total, currency: 'EUR' },
            },
          ],
        });
      },

      onAuthorize(data, actions) {
        return actions.payment.execute().then(() => {
          _this.props.checkoutCart('PAYPAL', _this.props.match.params.orderId);
        });
      },
    }, '#paypal-button-container');
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
      this.props.checkoutCart('STRIPE', this.props.match.params.orderId, stripeToken);
    });
  }

  payWithSolde() {
    this.props.checkoutCart('SOLDE', this.props.match.params.orderId);
  }

  render() {
    return (
      <div className="partTwo">
        <div className="partTwo__container">
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
                                <div className="card__cvc">
                                  <p className="card__label-cvc">CVC</p>
                                  <p className="card__secret-code">{this.state.cvc}</p>
                                </div>
                                <img src={visa} alt="Type de carte" className="card__type" />
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
                            <label htmlFor="cvv" className="material-field__label">CVV</label>
                            <input type="text" id="cvc" name="cvc" pattern="\d*" onChange={this.changeInfo} onFocus={this.focusInput} onBlur={this.blurInput} className="material-field__input" />
                          </div>
                        </div>
                        <button type="button" name="Ajouter" className="btn-gold">Ajouter</button>
                      </form>
                    </div>
                  </div>
            </div>
            <div className="btn-container">
              <NavLink to="/recap"><button className="btn-gold">Précédent</button></NavLink>
              <button className="btn-gold" onClick={() => this.submitPayment()}>Suivant</button>
            </div>
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
  user: state.auth.user,
});

export default withRouter(connect(mapStateToProps, { checkoutCart })(PaymentStepTwo));
