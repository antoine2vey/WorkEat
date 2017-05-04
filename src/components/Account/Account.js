import React, { Component } from 'react';
import { Switch, Route, NavLink, Redirect } from 'react-router-dom';
import InfoGenerale from './InfoGenerale';
import Commandes from './Commandes';
import Solde from './Solde';


class Account extends Component {
  render() {
    return (
      <div>
      <div className="tabs-container">
        <div className="container-fluid">
          <div className="compteInfo-submenu">
            <NavLink to="/compte/infos" className="compteInfo-submenu-item select-tab">Informations Générales</NavLink>
            <NavLink to="/compte/commandes" className="compteInfo-submenu-item select-tab">Commandes</NavLink>
            <NavLink to="/compte/solde" className="compteInfo-submenu-item select-tab">Mon Solde</NavLink>
          </div>
        </div>
      </div>
        <div className="compteInfo">
          <Switch>
              <Route path="/compte/infos" component={InfoGenerale} />
              <Route path="/compte/commandes" component={Commandes} />
              <Route path="/compte/solde" component={Solde} />
              <Redirect  from="/compte/" to="/compte/infos" />
          </Switch>
        </div>
      </div>
    );
  }
}

export default Account;
