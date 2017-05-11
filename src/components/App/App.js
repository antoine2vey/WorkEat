import React from 'react';
import { Route, Switch } from 'react-router';
import { NotificationContainer } from 'react-notifications';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import GlobalProducts from '../GlobalProducts/GlobalProducts';
import Admin from '../Admin/Admin';
import Prestataire from '../Prestataire/Prestataire';
import Livreur from '../Livreur/Livreur';
import Cart from '../Cart/Cart';
import Account from '../Account/Account';
import Blog from '../Blog/Blog';
import Article from '../Article/Article';
import Contact from '../Contact/Contact';
import About from '../About/About';
import Payment from '../Payment/Payment';
import PaymentStepTwo from '../Payment/PaymentStepTwo';
import PaymentStepThree from '../Payment/PaymentStepThree';

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
        <Route path="/paiement/:orderId" component={PaymentStepTwo} />
        <Route path="/paiement-confirmation/:orderId" component={PaymentStepThree} />

        <Route path="/blog" component={Blog} />
        <Route path="/article/:articleTitle" component={Article} />

        <Route path="/" component={GlobalProducts} />
      </Switch>
    </Route>
    <Footer />
    <NotificationContainer />
  </div>
);

export default App;
