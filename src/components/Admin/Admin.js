import React from 'react';
import { NavLink, Route, Switch, Redirect } from 'react-router-dom';
import { Product, Article, Livraison, Formule, Tag, Livreur } from './tabs';

const Admin = () => (
  <div>
    <div className="admin__tabs">
      <ul className="admin__tabs-list">
        <li className="admin__tabs-item">
          <NavLink to="/admin/produits" className="admin__tabs-link" activeClassName="is-active">
            <span>Produits</span>
          </NavLink>
        </li>
        <li className="admin__tabs-item">
          <NavLink to="/admin/tags" className="admin__tabs-link" activeClassName="is-active">
            <span>Tags</span>
          </NavLink>
        </li>
        <li className="admin__tabs-item">
          <NavLink to="/admin/livraisons" className="admin__tabs-link" activeClassName="is-active">
            <span>Livraisons</span>
          </NavLink>
        </li>
        <li className="admin__tabs-item">
          <NavLink to="/admin/articles" className="admin__tabs-link" activeClassName="is-active">
            <span>Articles</span>
          </NavLink>
        </li>
        <li className="admin__tabs-item">
          <NavLink to="/admin/formules" className="admin__tabs-link" activeClassName="is-active">
            <span>Formules</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/livreurs" activeClassName="is-active">
            <span>Livreurs</span>
          </NavLink>
        </li>
      </ul>
    </div>
    <div className="admin__container">
      <Switch>
        <Route path="/admin/produits" component={Product} />
        <Route path="/admin/tags" component={Tag} />
        <Route path="/admin/livraisons" component={Livraison} />
        <Route path="/admin/articles" component={Article} />
        <Route path="/admin/formules" component={Formule} />
        <Route path="/admin/livreurs" component={Livreur} />
        <Redirect from="/admin" to="/admin/produits" />
      </Switch>
    </div>
  </div>
);

export default Admin;
