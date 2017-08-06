import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { getOrderById } from '../../actions/cart';

class PaymentStepThree extends Component {
  componentDidMount() {
    const { orderId } = this.props.match.params;
    this.props.getOrderById(orderId);
  }

  render() {
    const { order } = this.props;
    const place = order.placeToShip && order.placeToShip.name;
    return (
      <div className="partFive">
        <div className="container">
          <div className="partFive-title">
            <h1>Merci pour votre commande</h1>
            <p>Un email récapitulatif vous a été envoyé !</p>
          </div>
        </div>
        <div className="container">
          <div className="partFive-commandInfo">
            <div className="partFive-commandInfo-list">
              <div className="partFive-commandInfo-list-item">
                <p>Commande n°{order.position}</p>
              </div>
              <div className="partFive-commandInfo-list-item">
                <p>Date <br />{moment(order.orderedAt).format('DD/MM/YYYY')}</p>
              </div>
              <div className="partFive-commandInfo-list-item">
                <p>Méthode de Paiement <br /> {order.method}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="container partFive-bloc">
          <div className="partFive-labels">
            <div className="partFive-label-name">Nom</div>
            <div className="partFive-label-qty">Quantité</div>
            <div className="partFive-label-price">Prix</div>
          </div>
          { order.articles &&
          <div className="tabcommand-part"><p>A la carte</p>
            <hr />
          </div> }
          { order.articles ? (
            order.articles.map(article => (
              <div className="partFive__product" key={article._id}>
                <div className="partFive__product-infos">
                  <img src={article.file} alt="Commande " className="partFive__product-image" />
                  <div className="partFive__product-text">
                    <h6 className="partFive__product-type">{ article.types.map((type, i) => <span key={i}>{type}{article.types.length - 1 === i ? '' : ','} </span>) }</h6>
                    <h3 className="partFive__product-title">{article.name}</h3>
                  </div>
                </div>
                <div className="partFive__quantity">
                  <p>x{order.quantitiesById[article._id]}</p>
                </div>
                <p className="partFive__price">{(article.price * order.quantitiesById[article._id]).toFixed(2)}€</p>
              </div>
            ))
          ) : (
            <div>Pas d'articles pour cette commande</div>
          ) }
          { order.bundles &&
          <div className="partFive-tabcommand-part">
            <p>Formule</p>
            <hr />
          </div> }
          { order.bundles ? (
            order.bundles.map(article => (
              <div className="partFive__product" key={article._id}>
                <div className="partFive__product-infos">
                  <div className="partFive__product-text">
                    <h3 className="partFive__product-title">{article.bundle.name}</h3>
                    { article.entree && article.entree.name}
                    { article.plat && article.plat.name}
                    { article.dessert && article.dessert.name}
                    { article.boisson && article.boisson.name}
                  </div>
                </div>
                <div className="partFive__quantity">
                  <p>x{order.quantitiesById[article.bundle._id]}</p>
                </div>
                <p className="partFive__price">{(article.bundle.price * order.quantitiesById[article.bundle._id]).toFixed(2)}€</p>
              </div>
            ))
          ) : (
            <div>Pas de formules pour cette commande</div>
          ) }
          <div className="row partFive-final">
            <div className="one column" />
            <div className="five columns">
              <div className="partFive-coord">
                <h5 className="partFive__product-title">Vos Coordonnées</h5>
                <strong>Adresse</strong>: {place}<br />
              </div>
            </div>
            <div className="six columns">
              <div className="partFive-total">
                <h3 className="partFive__product-title">Total :</h3>
                <h4>{order.amount}€</h4>
              </div>
            </div>
          </div>
          <Link to="/" className="btn-link partFive-return"><button className=" btn-gold">Retour à la page d'accueil</button></Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  order: state.cart.order,
});

export default connect(mapStateToProps, { getOrderById })(PaymentStepThree);
