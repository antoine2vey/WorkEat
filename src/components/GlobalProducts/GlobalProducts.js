import React from 'react';
import { Route, Switch, Redirect, NavLink } from 'react-router-dom';
import Carte from '../Carte/Carte';
import Bundles from '../Bundles/Bundles';

const GlobalProducts = () => (
  <div className="products">
    <div className="products__choise">
      <NavLink to="/formules" className="products__choise__type select-tab" activeClassName="select-tab--current">
        <p className="products__choise__title">Formule</p>
      </NavLink>
      <NavLink to="/carte" className="products__choise__type select-tab" activeClassName="select-tab--current">
        <p className="products__choise__title">A la carte</p>
      </NavLink>
    </div>

    <Switch>
      <Route path="/formules" component={Bundles} />
      <Route path="/carte" component={Carte} />
      <Redirect from="/" to="/carte" />
    </Switch>
  </div>
);

export default GlobalProducts;
