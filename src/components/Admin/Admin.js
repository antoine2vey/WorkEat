import React from 'react';
import { NavLink, Route, Switch, Redirect } from 'react-router-dom';
import { Product, Article, Livraison, Formule, Tag } from './tabs';

const Admin = () => (
  <div>
    <div className="tabs is-fullwidth is-medium">
      <ul>
        <li>
          <NavLink to="/admin/produits" activeClassName="is-active">
            <span>Produits</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/tags" activeClassName="is-active">
            <span>Tags</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/livraisons" activeClassName="is-active">
            <span>Livraisons</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/articles" activeClassName="is-active">
            <span>Articles</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/formules" activeClassName="is-active">
            <span>Formules</span>
          </NavLink>
        </li>
      </ul>
    </div>

    <Switch>
      <Route path="/admin/produits" component={Product} />
      <Route path="/admin/tags" component={Tag} />
      <Route path="/admin/livraisons" component={Livraison} />
      <Route path="/admin/articles" component={Article} />
      <Route path="/admin/formules" component={Formule} />
      <Redirect from="/admin" to="/admin/produits" />
    </Switch>
  </div>
);

export default Admin;
