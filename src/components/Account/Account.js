import React from 'react';
import { Switch, Route, NavLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteUser, updateUser } from '../../actions/auth';
import { fetchPlacesIfNeeded } from '../../actions/livraison';
import InfoGenerale from './InfoGenerale';
import Commandes from './Commandes';
import Solde from './Solde';


const Account = ({ ...props }) => (
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
        <Route path="/compte/infos" render={() => <InfoGenerale {...props} />} />
        <Route path="/compte/commandes" render={() => <Commandes {...props} />} />
        <Route path="/compte/solde" render={() => <Solde {...props} />} />
        <Redirect from="/compte/" to="/compte/infos" />
      </Switch>
    </div>
  </div>
);

const mapStateToProps = state => ({
  user: state.auth.user,
  places: state.places.places,
});

export default connect(mapStateToProps, { deleteUser, updateUser, fetchPlacesIfNeeded })(Account);
