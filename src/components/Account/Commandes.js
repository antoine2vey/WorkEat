import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import { arrowBottom } from '../../images';

class Commandes extends Component {
  constructor() {
    super();
    this.state = {
      orders: [],
    };
  }

  componentDidMount() {
    axios.get('/api/orders', {
      headers: { Authorization: `Bearer ${localStorage._token}` },
    })
      .then(res => this.setState({ orders: res.data }))
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="compteCommand">
          <div className="compteInfo-bloc">
            <h5>COMMANDES</h5>
            <table className="compteCommand-tab">
              <thead>
                <tr className="compteCommand-tab-row">
                  <th className="compteCommand-tab-label">
                    Numéro de Commande
                    <img src={arrowBottom} alt="arrow" className="arrow" />
                  </th>
                  <th className="compteCommand-tab-label">
                    Date
                    <img src={arrowBottom} alt="arrow" className="arrow" />
                  </th>
                  <th className="compteCommand-tab-label">
                    Etat
                    <img src={arrowBottom} alt="arrow" className="arrow" />
                  </th>
                  <th className="compteCommand-tab-label">
                    Methode de paiement
                    <img src={arrowBottom} alt="arrow" className="arrow" />
                  </th>
                  <th className="compteCommand-tab-label">
                    Total
                    <img src={arrowBottom} alt="arrow" className="arrow" />
                  </th>
                </tr>
              </thead>
              <tbody>
                { this.state.orders ? (
                  this.state.orders.map(order => (
                    <tr className="compteCommand-tab-row" key={order._id}>
                      <td className="compteCommand-tab-cellule">
                        N°{order.position}
                      </td>
                      <td className="compteCommand-tab-cellule">
                        {moment(order.orderedAt).format('DD/MM/YYYY')}
                      </td>
                      <td className="compteCommand-tab-cellule">
                        {order.finished ? 'Terminée' : 'En cours'}
                      </td>
                      <td className="compteCommand-tab-cellule">
                        {order.method}
                      </td>
                      <td className="compteCommand-tab-cellule">
                        {order.amount}€ pour {Object.keys(order.quantitiesById).length} {Object.keys(order.quantitiesById).length === 1 ? 'produit' : 'produits'}
                      </td>
                    </tr>
                  ))
                  ) : (
                    <tr>
                      <td>
                        Pas de commandes
                      </td>
                    </tr>
                  )
                }

              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Commandes;
