import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { getTotalPrice, getProducts, getAllQuantities } from '../../reducers/cart';
import { incrementQuantity, decrementQuantity, deleteProduct, checkoutReq } from '../../actions/cart';
import { fetchPlacesIfNeeded } from '../../actions/livraison';
import { trashBlanc } from '../../images';

class Payment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      places: this.props.places,
      choosenPlace: this.props.choosenPlace._id,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      choosenPlace: e.target.value,
    });
  }

  render() {
    const { cart, incrementQuantity, quantityById, decrementQuantity, deleteProduct, checkoutReq, total } = this.props;
    const { places, choosenPlace } = this.state;

    return (
      <div className="partOne">
        <Helmet>
          <title>Workeat - Récapitulatif</title>
        </Helmet>
        <div className="partOne__container">
          <div className="container-fluid">
            <div className="partOne__recap">
              <h2 className="partOne__title">Récapitulatif de votre commande : <strong>{total.toFixed(2)}€</strong></h2>
              <div className="partOne__list">
                <div className="partOne__category">
                  <p>A la carte</p>
                  <hr />
                </div>
                { cart.map(item => (
                  !item.isBundle &&
                  <div className="partOne__product" key={item._id}>
                    <div className="partOne__product-infos">
                      <img src={item.file} alt="Canard laqué" className="partOne__product-image" />
                      <div className="partOne__product-text">
                        <h3 className="partOne__product-title">{item.name}</h3>
                        <p className="partOne__price">{item.price}€</p>
                      </div>
                    </div>
                    <div className="partOne__quantity">
                      <div className="partOne__quantity-button partOne__quantity-up js--up" onClick={() => incrementQuantity(item._id)} >+</div>
                      <input type="number" value={item.quantity} min="0" readOnly className="partOne__quantity-input js--quantity-input" />
                      <div className="partOne__quantity-button partOne__quantity-down js--down" onClick={() => decrementQuantity(item._id)}>-</div>
                    </div>
                    <div className="partOne__delete" onClick={() => deleteProduct(item)}>
                      <img src={trashBlanc} alt="Supprimer" className="partOne__delete-icon" />
                    </div>
                  </div>
                )) }
                <div className="partOne__category">
                  <p>Formule</p>
                  <hr />
                </div>
                { cart.map(item => (
                  item.isBundle &&
                  <div className="partOne__product" key={item._id}>
                    <div className="partOne__product-infos">
                      <div className="partOne__product-text formula-product">
                        <h3 className="partOne__product-title">{item.name}</h3>
                        <p className="partOne__price">{item.price}€</p>
                      </div>
                      <div className="cart-panel__formules">
                        { item.entree.name && <p className="cart-panel__formules-content">Entrée : {item.entree.name}</p> }
                        { item.plat.name && <p className="cart-panel__formules-content">Plat : {item.plat.name}</p> }
                        { item.dessert.name && <p className="cart-panel__formules-content">Dessert : {item.dessert.name}</p> }
                        { item.boisson.name && <p className="cart-panel__formules-content">Boisson : {item.boisson.name}</p> }
                      </div>
                    </div>
                    <div className="partOne__quantity" style={{ padding: '10px 0' }}>
                      <div className="partOne__quantity-button partOne__quantity-up js--up" onClick={() => incrementQuantity(item._id)} >+</div>
                      <input type="number" value={item.quantity} min="0" readOnly className="partOne__quantity-input js--quantity-input" />
                      <div className="partOne__quantity-button partOne__quantity-down js--down" onClick={() => decrementQuantity(item._id)}>-</div>
                    </div>
                    <div className="partOne__delete" onClick={() => deleteProduct(item._id)}>
                      <img src={trashBlanc} alt="Supprimer" className="partOne__delete-icon" />
                    </div>
                  </div>
                )) }
                <div className="partOne__livraison">
                  <div className="partOne__category">
                    <p>Endroits à livrer</p>
                    <hr />
                    <div className="material-field compteInfo-field has-label fullInput">
                      <label className="material-field__label" htmlFor="livraison">Point de livraison</label>
                      <select id="livraison" name="position" value={this.state.choosenPlace} onChange={this.handleChange}>
                        { places.map((place) => {
                          if (place._id === choosenPlace._id) {
                            return <option defaultValue={choosenPlace._id} key={choosenPlace._id}>{choosenPlace.name}</option>;
                          }
                          return <option value={place._id} key={place._id}>{place.name}</option>;
                        })}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="partOne-recap-btn">
                  <button onClick={() => checkoutReq(cart, quantityById, choosenPlace)} className="btn-gold" disabled={!cart.length}>Suivant</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  choosenPlace: state.auth.user.position,
  cart: getProducts(state.cart),
  total: getTotalPrice(state.cart),
  places: state.places.places,
  quantityById: getAllQuantities(state.cart),
});

export default connect(mapStateToProps, { incrementQuantity, decrementQuantity, deleteProduct, checkoutReq, fetchPlacesIfNeeded })(Payment);
