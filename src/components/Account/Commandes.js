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

    this.downloadPDF = this.downloadPDF.bind(this);
  }

  componentDidMount() {
    axios.get('/api/orders', {
      headers: { Authorization: `Bearer ${localStorage._token}` },
    })
    .then(({ data }) => this.setState({ orders: data }))
    .catch(err => console.error(err));
  }

  getProductQuantities(currentOrder) {
    return Object.keys(currentOrder.quantitiesById).reduce((prev, key) => (
      prev + currentOrder.quantitiesById[key]
    ), 0);
  }

  downloadPDF(id) {
    window.open(`pdf/workeat-${id}.pdf`);
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
                  <th className="compteCommand-tab-label">
                    Télécharger
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
                        {order.amount}€ pour {this.getProductQuantities(order)} {this.getProductQuantities(order) === 1 ? 'produit' : 'produits'}
                      </td>
                      <td className="compteCommand-tab-cellule">
                        <button onClick={() => this.downloadPDF(order._id)}>Télécharger</button>
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
