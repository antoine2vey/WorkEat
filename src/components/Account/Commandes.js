import React from 'react';
import { arrowBottom }  from "../../images";

const Commandes = () => (
  <div className="container-fluid">
    <div className="compteCommand">
      <div className="compteInfo-bloc">
        <h5>COMMANDES</h5>
        <table className="compteCommand-tab">
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
          <tr  className="compteCommand-tab-row">
        <td  className="compteCommand-tab-cellule">
          N°204
        </td>
        <td className="compteCommand-tab-cellule">
          04/01/2017
        </td>
        <td className="compteCommand-tab-cellule">
          En cours
        </td>
        <td className="compteCommand-tab-cellule">
          Paypal
        </td>
        <td className="compteCommand-tab-cellule">
          30€ pour 5 produits
    </td>
      </tr>
      <tr  className="compteCommand-tab-row">
        <td  className="compteCommand-tab-cellule">
          N°205
        </td>
        <td className="compteCommand-tab-cellule">
          03/01/2017
        </td>
        <td className="compteCommand-tab-cellule">
          Livrée
        </td>
        <td className="compteCommand-tab-cellule">
          Compte
        </td>
        <td className="compteCommand-tab-cellule">
          20€ pour 3 produits
    </td>
      </tr>
      <tr  className="compteCommand-tab-row">
        <td  className="compteCommand-tab-cellule">
          N°205
        </td>
        <td className="compteCommand-tab-cellule">
          02/01/2017
        </td>
        <td className="compteCommand-tab-cellule">
          Livrée
        </td>
        <td className="compteCommand-tab-cellule">
          Compte
        </td>
        <td className="compteCommand-tab-cellule">
          10€ pour 2 produits
    </td>
      </tr>
      <tr  className="compteCommand-tab-row">
        <td  className="compteCommand-tab-cellule">
          N°205
        </td>
        <td className="compteCommand-tab-cellule">
          20/12/2016
        </td>
        <td className="compteCommand-tab-cellule">
          Livrée
        </td>
        <td className="compteCommand-tab-cellule">
          Compte
        </td>
        <td className="compteCommand-tab-cellule">
          20€ pour 3 produits
    </td>
      </tr>
    </table>
    </div>
    </div>
    </div>
);

export default Commandes;
