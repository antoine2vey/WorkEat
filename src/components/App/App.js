import React from 'react';
import { Route, Switch } from 'react-router';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import GlobalProducts from '../GlobalProducts/GlobalProducts';
import Admin from '../Admin/Admin';
import Prestataire from '../Prestataire/Prestataire';
import Livreur from '../Livreur/Livreur';
import Cart from '../Cart/Cart';
import Account from '../Account/Account';
import Contact from '../Contact/Contact';
import About from '../About/About';
import Payment from '../Payment/Payment';

import './App.css';

const App = () => (
  <div>
    <Header />
    <Route>
      <Switch>
        <Route path="/panier" component={Cart} />
        <Route path="/compte" component={Account} />
        <Route path="/admin" component={Admin} />
        <Route path="/prestataire" component={Prestataire} />
        <Route path="/livreur" component={Livreur} />
        <Route path="/contact" component={Contact} />
        <Route path="/about" component={About} />
        <Route path="/recap" component={Payment} />
        <Route path="/" component={GlobalProducts} />
      </Switch>
    </Route>
    <Footer />
  </div>
);

export default App;
