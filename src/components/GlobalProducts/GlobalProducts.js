import React, { Component } from 'react';
import { Route, Switch, Redirect, NavLink } from 'react-router-dom';
import Carte from '../Carte/Carte';

class GlobalProducts extends Component {
  render() {
    return (
      <div>
        <div className="tabs is-fullwidth is-medium">
          <ul>
            <li>
              <NavLink to="/formules" activeClassName="is-active">
                <span>Formules</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/carte" activeClassName="is-active">
                <span>Carte</span>
              </NavLink>
            </li>
          </ul>
        </div>

        <Switch>
          <Route path="/formules" render={() => <h1>formule</h1>} />
          <Route path="/carte" component={Carte} />
          <Redirect from="/" to="/carte" />
        </Switch>
      </div>
    );
  }
}

export default GlobalProducts;
