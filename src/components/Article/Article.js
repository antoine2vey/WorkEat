import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

class Article extends Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>WorkEat - Article de blog</title>
          <meta name="description" content="Article lol ptdr xd viagra porno" />
        </Helmet>
        <div className="article">
          <div className="article__header">
            <h1 className="article__title">Pourquoi réduire ses apports en viande ?</h1>
            <div className="article__opacity" />
          </div>
          <div className="article__container">
            <h2 className="article__subtitle">La viande à quoi sert-elle ?</h2>
            <p className="article__content">La viande est un aliment constitué des tissus musculaires des animaux. Elle est une importante source de protéines animales.
Les protéines sont des macromolécules indispensables à la formation osseuse, au développement des muscles et au renouvellement des ongles, des cheveux, de la peau, etc. Ce sont les acides aminés présents dans les protéines qui les rendent si précieuses et indispensables à l’organisme.
Les acides aminés sont des molécules indispensables au bon fonctionnement de l’organisme car ils assurent les fonctions de transport et de stockage de toutes les substances nutritives.</p>
            <p className="article__content">En plus des protéines, la viande apporte d’autres nutriments indispensables au bon fonctionnement de l’organisme, zinc, fer, vitamines B (la viande est l’unique source naturelle de vitamine B12), ainsi que les acides gras et les oméga 3 pour le poisson.</p>
            <h2 className="article__subtitle">La viande quelle consommation ?</h2>
            <p className="article__content">Les protéines sont donc essentielles pour une bonne croissance et pour aider l’organisme à se défendre.
S’il n’existe pas actuellement de recommandation précise quant à la consommation de viande, on suggère un apport de 0,8 g de protéines par kg par jour par personne.</p>
            <p className="article__content">Les français sont historiquement des amateurs de produits carnés. Cela étant, on observe depuis un peu plus de 10 ans une baisse régulière de la consommation de viande au niveau national.
A l’inverse, la consommation mondiale est en croissance, tirée par les pays émergents.
La consommation moyenne annuelle en France était de 86 kg de viande / habitant en 2014, contre 94 kg en 1998.</p>
            <p className="article__content">Dans l’alimentation, la viande ne doit pas être introduit avant les 7 premiers mois de la vie. La diversification devra se faire de manière évolutive, tout comme la quantité et la fréquence de proposition en fonction de l’âge et donc des besoins, pas plus de 10g / jour pour un bébé de 7 mois pour aller jusqu’à 50 g / jour (soit un demi steak haché ou une tranche de jambon) pour des enfants de 6 à 11 ans.</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Article;
